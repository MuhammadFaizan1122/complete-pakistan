import { NextResponse } from 'next/server';
import SliderContent from '../../../../config/models/Sliders';
import connectDB from '../../../../config/mongoose';

// @ts-ignore'
export async function DELETE(request, { params }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const type = searchParams.get('type');
  const content = searchParams.get('content');

  if (!page || !type || !content) {
    return NextResponse.json({ error: 'Page, type, and content are required' }, { status: 400 });
  }

  try {
    await connectDB();
    const update = type === 'sliderImg' ? { $pull: { sliderImgs: content } } : { $pull: { news: content } };
    // @ts-ignore
    const sliderContent = await SliderContent.findOneAndUpdate(
      { page },
      update,
      { new: true }
    );

    if (!sliderContent) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Content deleted successfully', data: sliderContent }, { status: 200 });
  } catch (error) {
    console.error('Error deleting slider content:', error);
    return NextResponse.json({ error: 'Failed to delete slider content' }, { status: 500 });
  }
}