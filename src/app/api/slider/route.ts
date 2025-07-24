import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import SliderContent from '../../../config/models/Sliders';
import connectDB from '../../../config/mongoose';

export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    if (!page) {
        return NextResponse.json({ error: 'Page parameter is required' }, { status: 400 });
    }

    try {
        await connectDB();
        // @ts-ignore
        const sliderContent = await SliderContent.findOne({ page });
        if (!sliderContent) {
            return NextResponse.json({ data: { page, sliderImgs: [], news: [] } }, { status: 200 });
        }
        return NextResponse.json({ data: sliderContent }, { status: 200 });
    } catch (error) {
        console.error('Error fetching slider content:', error);
        return NextResponse.json({ error: 'Failed to fetch slider content' }, { status: 500 });
    }
}



export async function POST(request: any) {
    try {
        const { page, sliderImg, newsItem } = await request.json();

        if (!page) {
            return NextResponse.json({ error: 'Page is required' }, { status: 400 });
        }

        await connectDB();

        const update = {};
        // @ts-ignore'
        if (sliderImg) update.$push = { sliderImgs: sliderImg };
        // @ts-ignore'
        if (newsItem) update.$push = { ...update.$push, news: newsItem };

        // @ts-ignore
        const sliderContent = await SliderContent.findOneAndUpdate(
            { page },
            update,
            { new: true, upsert: true }
        );

        return NextResponse.json({ message: 'Slider content updated successfully', data: sliderContent }, { status: 200 });
    } catch (error) {
        console.error('Error updating slider content:', error);
        return NextResponse.json({ error: 'Failed to update slider content' }, { status: 500 });
    }
}