import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import connectDB from './config/db.js';

const seedDemoUser = async () => {
  try {
    await connectDB();
    console.log('MongoDB Connected');

    const hashedPassword = await bcrypt.hash('demo123', 10);
    
    // 🔥 BYPASS ALL SCHEMA/MIDDLEWARE - Direct DB insert
    await mongoose.connection.db.collection('users').insertOne({
      username: 'demo',
      passwordHash: hashedPassword,
      profile: {
        fullName: 'Anshu Roy',
        email: 'anshu@creditflow.com',
        phoneNumber: '+919876543210',
        dateOfBirth: new Date('2006-03-16'),
        gender: 'MALE',
        address: 'Narnaund, Haryana, India'
      },
      bankDetails: {
        bankName: 'HDFC Bank',
        accountNumber: '123456789012',
        cifNumber: 'CIF123456789',
        cardNumber: '**** **** **** 1234',
        cardExpiry: '12/28'
      },
      identity: {
        aadhaarNumber: '123456789012',
        panNumber: 'ABCDE1234F',
        identityVerified: true
      },
      loanApplications: [
        {
          applicationId: 'LFN001',
          loanAmount: 500000,
          status: 'APPROVED',
          creditScore: 88,
          approvedAmount: 500000,
          interestRate: 12.2,
          tenure: 50,
          emi: 12855,
          loanType: 'Personal',
          appliedAt: new Date('2025-12-01'),
          processedAt: new Date('2025-12-02')
        },
        {
          applicationId: 'LFN002',
          loanAmount: 1000000,
          status: 'DECLINED',
          creditScore: 42,
          approvedAmount: 0,
          interestRate: 14,
          tenure: 120,
          emi: 15530,
          loanType: 'Personal',
          appliedAt: new Date('2025-12-04'),
          processedAt: new Date('2025-12-05')
        }
      ],
      role: 'USER',
      phoneDataConsent: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('Demo user created successfully');
    console.log('Username: demo');
    console.log('Password: demo123');
    console.log('Direct DB insert completed');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDemoUser();
