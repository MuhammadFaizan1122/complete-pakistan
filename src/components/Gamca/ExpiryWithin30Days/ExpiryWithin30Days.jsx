'use client'
import MedicalExpiryList from "../MedicalExpiryList/MedicalExpiryList";

export default function ExpiryWithin30Days() {
  return <MedicalExpiryList expiryDays={30} title="Medical Expiry Within 30 Days" />;
}