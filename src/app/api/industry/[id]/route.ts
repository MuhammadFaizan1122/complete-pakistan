import { NextResponse } from 'next/server';
import { Industry, Category, Subcategory, Skill } from '../../../../config/models/Industry';
import connectDB from '../../../../config/mongoose';

export async function PUT(request:any) {
  try {
    const { pathname, searchParams } = new URL(request.url);
    const id = pathname.split('/').pop();
    const type = searchParams.get('type');
    const { name, industryId, categoryId, subcategoryId } = await request.json();

    await connectDB();

    if (type === 'skill') {
      const skill = await Skill.findByIdAndUpdate(id, { name, subcategoryId }, { new: true });
      if (!skill) return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
      return NextResponse.json({ message: 'Skill updated successfully', data: skill }, { status: 200 });
    } else if (type === 'subcategory') {
      const subcategory = await Subcategory.findByIdAndUpdate(id, { name, categoryId }, { new: true });
      if (!subcategory) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
      return NextResponse.json({ message: 'Subcategory updated successfully', data: subcategory }, { status: 200 });
    } else if (type === 'category') {
      const category = await Category.findByIdAndUpdate(id, { name, industryId }, { new: true });
      if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      return NextResponse.json({ message: 'Category updated successfully', data: category }, { status: 200 });
    } else if (type === 'industry') {
      const industry = await Industry.findByIdAndUpdate(id, { name }, { new: true });
      if (!industry) return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
      return NextResponse.json({ message: 'Industry updated successfully', data: industry }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

export async function DELETE(request:any) {
  try {
    const { pathname, searchParams } = new URL(request.url);
    const id = pathname.split('/').pop();
    const type = searchParams.get('type');

    await connectDB();

    if (type === 'skill') {
      const skill = await Skill.findByIdAndDelete(id);
      if (!skill) return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
      await Subcategory.updateMany({}, { $pull: { skills: id } });
      return NextResponse.json({ message: 'Skill deleted successfully' }, { status: 200 });
    } else if (type === 'subcategory') {
      const subcategory = await Subcategory.findByIdAndDelete(id);
      if (!subcategory) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
      await Skill.deleteMany({ subcategoryId: id });
      return NextResponse.json({ message: 'Subcategory deleted successfully' }, { status: 200 });
    } else if (type === 'category') {
      const category = await Category.findByIdAndDelete(id);
      if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      const subcategories = await Subcategory.find({ categoryId: id });
      await Subcategory.deleteMany({ categoryId: id });
      await Skill.deleteMany({ subcategoryId: { $in: subcategories.map(s => s._id) } });
      return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
    } else if (type === 'industry') {
      const industry = await Industry.findByIdAndDelete(id);
      if (!industry) return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
      const categories = await Category.find({ industryId: id });
      await Category.deleteMany({ industryId: id });
      const subcategories = await Subcategory.find({ categoryId: { $in: categories.map(c => c._id) } });
      await Subcategory.deleteMany({ categoryId: { $in: categories.map(c => c._id) } });
      await Skill.deleteMany({ subcategoryId: { $in: subcategories.map(s => s._id) } });
      return NextResponse.json({ message: 'Industry deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}