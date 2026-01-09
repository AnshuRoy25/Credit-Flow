# creditflow-ml-service/features.py
import numpy as np

def extract_features(call_logs, sms_data, location_data, installed_apps):
    """
    call_logs: dict from callLogs.json
    sms_data: dict from smsData.json
    location_data: dict from locationData.json
    installed_apps: dict from installedApps.json
    """

    # --- Call log features ---
    call_stats = call_logs.get("stats", {})
    total_calls = call_stats.get("totalCalls", 0)
    incoming_calls = call_stats.get("incomingCalls", 0)
    outgoing_calls = call_stats.get("outgoingCalls", 0)
    avg_call_duration = call_stats.get("averageCallDuration", 0)
    call_consistency_high = 1 if call_stats.get("callConsistency") == "HIGH" else 0

    # --- SMS features ---
    sms_stats = sms_data.get("stats", {})
    total_sms = sms_stats.get("totalSMS", 0)
    banking_sms = sms_stats.get("bankingSMS", 0)
    payment_sms = sms_stats.get("paymentSMS", 0)
    bills_sms = sms_stats.get("billsSMS", 0)
    financial_sms = sms_stats.get("financialSMS", 0)
    bill_payment_very_high = 1 if sms_stats.get("billPaymentConsistency") == "VERY_HIGH" else 0

    # --- Location features ---
    loc_stats = location_data.get("stats", {})
    days_tracked = loc_stats.get("daysTracked", 0)
    movement_radius = loc_stats.get("movementRadius", 0.0)
    home_consistency = loc_stats.get("homeResidenceConsistency", 0.0)
    stability_very_high = 1 if loc_stats.get("stabilityLevel") == "VERY_HIGH" else 0
    work_commute_days = loc_stats.get("workCommuteDaysOut30", 0)

    # --- Installed apps features ---
    app_stats = installed_apps.get("stats", {})
    total_apps = app_stats.get("totalApps", 0)
    financial_app_count = app_stats.get("financialAppCount", 0)
    ecommerce_app_count = app_stats.get("ecommerceAppCount", 0)
    professional_app_count = app_stats.get("professionalAppCount", 0)
    app_literacy_high = 1 if app_stats.get("appLiteracyLevel") == "HIGH" else 0
    has_loan_apps = 1 if app_stats.get("hasLoanApps") else 0

    # Build flat feature dict
    features = {
        "total_calls": total_calls,
        "incoming_calls": incoming_calls,
        "outgoing_calls": outgoing_calls,
        "avg_call_duration": avg_call_duration,
        "call_consistency_high": call_consistency_high,

        "total_sms": total_sms,
        "banking_sms": banking_sms,
        "payment_sms": payment_sms,
        "bills_sms": bills_sms,
        "financial_sms": financial_sms,
        "bill_payment_very_high": bill_payment_very_high,

        "days_tracked": days_tracked,
        "movement_radius": movement_radius,
        "home_consistency": home_consistency,
        "stability_very_high": stability_very_high,
        "work_commute_days": work_commute_days,

        "total_apps": total_apps,
        "financial_app_count": financial_app_count,
        "ecommerce_app_count": ecommerce_app_count,
        "professional_app_count": professional_app_count,
        "app_literacy_high": app_literacy_high,
        "has_loan_apps": has_loan_apps,
    }

    return features
