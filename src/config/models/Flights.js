import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  fromCity: { type: String, required: true },
  toCity: { type: String, required: true },
  departureTime: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
});

const flightSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true },
    flightNo: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: String, required: true },
    agent: { type: String, required: true },
    baggage: { type: String, required: true },
    companyId: { type: String, required: true },

    routes: {
      type: [routeSchema],
      required: true,
      validate: [(val) => val.length > 0, 'At least one route required'],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Flight || mongoose.model('Flight', flightSchema);
