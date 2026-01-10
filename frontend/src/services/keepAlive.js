// frontend/src/services/keepAlive.js

import { getApiUrl, shouldUseMock } from '../config/api';

class KeepAliveService {
  constructor() {
    this.intervalId = null;
    this.isRunning = false;
    this.pingInterval = 2 * 60 * 1000; // 2 minutes in milliseconds
    this.lastPingTime = null;
    this.failureCount = 0;
    this.maxFailures = 3;
  }

  /**
   * Start the keep-alive service
   */
  start() {
    // Don't start if using mock mode
    if (shouldUseMock()) {
      console.log('🟡 Keep-alive disabled: Using mock mode');
      return;
    }

    if (this.isRunning) {
      console.log('⚠️ Keep-alive already running');
      return;
    }

    console.log('✅ Keep-alive service started');
    this.isRunning = true;
    
    // Ping immediately on start
    this.ping();
    
    // Then ping every 2 minutes
    this.intervalId = setInterval(() => {
      this.ping();
    }, this.pingInterval);
  }

  /**
   * Stop the keep-alive service
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('🛑 Keep-alive service stopped');
  }

  /**
   * Ping the backend server
   */
  async ping() {
    try {
      const startTime = Date.now();
      const response = await fetch(getApiUrl('/api/keep-alive'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        this.lastPingTime = new Date();
        this.failureCount = 0; // Reset failure count on success
        
        const data = await response.json();
        console.log(`✅ Keep-alive ping successful (${responseTime}ms)`, {
          status: data.status,
          uptime: Math.floor(data.uptime / 60) + ' minutes',
          timestamp: data.timestamp
        });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      this.failureCount++;
      console.error(`❌ Keep-alive ping failed (${this.failureCount}/${this.maxFailures}):`, error.message);
      
      // Stop pinging after max failures to avoid console spam
      if (this.failureCount >= this.maxFailures) {
        console.error('🛑 Max failures reached. Stopping keep-alive service.');
        this.stop();
      }
    }
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      lastPingTime: this.lastPingTime,
      failureCount: this.failureCount,
      nextPingIn: this.isRunning 
        ? this.pingInterval - (Date.now() - (this.lastPingTime?.getTime() || Date.now()))
        : null
    };
  }
}

// Create singleton instance
const keepAliveService = new KeepAliveService();

export default keepAliveService;