'use client'
import MedicalExpiryList from "../MedicalExpiryList/MedicalExpiryList";

export default function ExpiryWithin15Days() {
  return <MedicalExpiryList expiryDays={15} title="Medical Expiry Within 15 Days" />;
}