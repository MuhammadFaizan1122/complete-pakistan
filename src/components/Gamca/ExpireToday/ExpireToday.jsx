'use client'
import MedicalExpiryList from "../MedicalExpiryList/MedicalExpiryList";

export default function TodayExpiry() {
  return <MedicalExpiryList expiryDays={0} title="Medical Expiry Today" />;
}