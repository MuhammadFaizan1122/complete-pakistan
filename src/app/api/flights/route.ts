import { NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import Flight from '../../../config/models/Flights';
import TicketingAgent from '../../../config/models/TicketingAgent';

// ✅ Create a flight
export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        // Validation: At least one route required
        if (!body.routes || !Array.isArray(body.routes) || body.routes.length === 0) {
            return NextResponse.json({ success: false, message: 'At least one route is required' }, { status: 400 });
        }

        const flight = new Flight(body);
        await flight.save();
        return NextResponse.json({ success: true, data: flight });
    } catch (error) {
        console.error('POST Flight Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

// ✅ Get flights (by id or all)
export async function GET(req: Request) {
    try {
        await connectDB();
        const id = new URL(req.url).searchParams.get("id");
        const now = new Date();
        // @ts-ignore
        const flights = await Flight.find();
        for (const f of flights) {
            const lastRoute = f.routes[f.routes.length - 1];
            if (lastRoute?.arrivalTime) {
                const flightDateTime = new Date(
                    `${f.date.toISOString().split("T")[0]}T${lastRoute.arrivalTime}`
                );
                if (flightDateTime < now) {
                    // @ts-ignore
                    await Flight.findByIdAndDelete(f._id);
                }
            }
        }

        if (id) {
            // @ts-ignore
            const flightsWithAgent = await Flight.find({ companyId: id }).populate({
                path: "companyId",
                model: "TicketingAgent",
            });

            if (!flightsWithAgent || flightsWithAgent.length === 0) {
                // If no flights → fetch agent
                // @ts-ignore
                const agent = await TicketingAgent.findById(id).select("-__v");

                if (!agent) {
                    return NextResponse.json(
                        { success: false, message: "Agent not found" },
                        { status: 404 }
                    );
                }

                return NextResponse.json({
                    success: true,
                    data: {
                        agent,
                        flights: [],
                    },
                });
            }

            return NextResponse.json({ success: true, data: { agent: flightsWithAgent[0].companyId, flights: flightsWithAgent } });
        }

        // For all flights, populate companyId with TicketingAgent data
        // @ts-ignore
        const updatedFlights = await Flight.find()
            .populate({
                path: "companyId",
                model: "TicketingAgent",
            })
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: updatedFlights });
    } catch (error) {
        console.error("GET Flights Error:", error);
        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 }
        );
    }
}

// ✅ Update flight
export async function PATCH(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updateData } = body;

        if (updateData.routes && (!Array.isArray(updateData.routes) || updateData.routes.length === 0)) {
            return NextResponse.json({ success: false, message: 'At least one route is required' }, { status: 400 });
        }

        // @ts-ignore
        const flight = await Flight.findByIdAndUpdate(id, updateData, { new: true });
        if (!flight) {
            return NextResponse.json({ success: false, message: 'Flight not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: flight });
    } catch (error) {
        console.error('PATCH Flight Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

// ✅ Delete flight
export async function DELETE(req) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get('id');
        // @ts-ignore
        const flight = await Flight.findByIdAndDelete(id);

        if (!flight) {
            return NextResponse.json({ success: false, message: 'Flight not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        console.error('DELETE Flight Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
