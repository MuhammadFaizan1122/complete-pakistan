import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
  {
    fromCity: { type: String, required: true },  // first departure
    toCity: { type: String, required: true },    // final destination
    stops: [{ type: String }],                   // intermediate cities (like Dubai)

    route: { type: String }, // auto-generated "Karachi → Dubai → Jeddah"

    airline: { type: String, required: true },
    flightNo: { type: String, required: true },
    departureTime: { type: String, required: true },
    departureAirport: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: String, required: true },
    agent: { type: String, required: true },
    baggage: { type: String, required: true },
  },
  { timestamps: true }
);

// Auto-generate route string
flightSchema.pre('save', function (next) {
  const parts = [this.fromCity, ...(this.stops || []), this.toCity];
  this.route = parts.join(" → ");
  next();
});

export default mongoose.models.Flight || mongoose.model('Flight', flightSchema);
