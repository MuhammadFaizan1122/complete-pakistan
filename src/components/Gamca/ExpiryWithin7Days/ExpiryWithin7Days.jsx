'use client'
import MedicalExpiryList from "../MedicalExpiryList/MedicalExpiryList";

export default function ExpiryWithin7Days() {
  return <MedicalExpiryList expiryDays={7} title="Medical Expiry Within 7 Days" />;
}