import { NextResponse } from 'next/server';
import { Industry, Category, Subcategory, Skill } from '../../../config/models/Industry';
import connectDB from '../../../config/mongoose';

export async function GET(request: any) {
    try {
        const { searchParams } = new URL(request.url);
        const industryId = searchParams.get('industryId');
        const categoryId = searchParams.get('categoryId');
        // @ts-ignore
        await connectDB();

        if (categoryId) {
            const subcategories = await Subcategory.find({ categoryId }).populate('skills');
            return NextResponse.json({ data: subcategories }, { status: 200 });
        } else if (industryId) {
            const categories = await Category.find({ industryId });
            return NextResponse.json({ data: categories }, { status: 200 });
        } else {
            const industries = await Industry.find();
            return NextResponse.json({ data: industries }, { status: 200 });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(request: any) {
    try {
        const { name, industryId, categoryId, subcategoryId } = await request.json();

        await connectDB();

        if (subcategoryId) {
            const skill = await Skill.create({ name, subcategoryId });
            await Subcategory.findByIdAndUpdate(subcategoryId, { $push: { skills: skill._id } });
            return NextResponse.json({ message: 'Skill created successfully', data: skill }, { status: 200 });
        } else if (categoryId) {
            const subcategory = await Subcategory.create({ name, categoryId });
            return NextResponse.json({ message: 'Subcategory created successfully', data: subcategory }, { status: 200 });
        } else if (industryId) {
            const category = await Category.create({ name, industryId });
            return NextResponse.json({ message: 'Category created successfully', data: category }, { status: 200 });
        } else {
            const industry = await Industry.create({ name });
            return NextResponse.json({ message: 'Industry created successfully', data: industry }, { status: 200 });
        }
    } catch (error) {
        console.error('Error creating data:', error);
        return NextResponse.json({ error: 'Failed to create data' }, { status: 500 });
    }
}

export async function PUT(request: any) {
    try {
        const { pathname } = new URL(request.url);
        const id = pathname.split('/').pop();
        const { name, industryId, categoryId, subcategoryId } = await request.json();

        await connectDB();

        if (pathname.includes('/skill/')) {
            const skill = await Skill.findByIdAndUpdate(id, { name, subcategoryId }, { new: true });
            return NextResponse.json({ message: 'Skill updated successfully', data: skill }, { status: 200 });
        } else if (pathname.includes('/subcategory/')) {
            const subcategory = await Subcategory.findByIdAndUpdate(id, { name, categoryId }, { new: true });
            return NextResponse.json({ message: 'Subcategory updated successfully', data: subcategory }, { status: 200 });
        } else if (pathname.includes('/category/')) {
            const category = await Category.findByIdAndUpdate(id, { name, industryId }, { new: true });
            return NextResponse.json({ message: 'Category updated successfully', data: category }, { status: 200 });
        } else {
            const industry = await Industry.findByIdAndUpdate(id, { name }, { new: true });
            return NextResponse.json({ message: 'Industry updated successfully', data: industry }, { status: 200 });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}

export async function DELETE(request: any) {
    try {
        const { pathname } = new URL(request.url);
        const id = pathname.split('/').pop();

        await connectDB();

        if (pathname.includes('/skill/')) {
            await Skill.findByIdAndDelete(id);
            await Subcategory.updateMany({}, { $pull: { skills: id } });
            return NextResponse.json({ message: 'Skill deleted successfully' }, { status: 200 });
        } else if (pathname.includes('/subcategory/')) {
            await Subcategory.findByIdAndDelete(id);
            await Skill.deleteMany({ subcategoryId: id });
            return NextResponse.json({ message: 'Subcategory deleted successfully' }, { status: 200 });
        } else if (pathname.includes('/category/')) {
            await Category.findByIdAndDelete(id);
            const subcategories = await Subcategory.find({ categoryId: id });
            await Subcategory.deleteMany({ categoryId: id });
            await Skill.deleteMany({ subcategoryId: { $in: subcategories.map(s => s._id) } });
            return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
        } else {
            await Industry.findByIdAndDelete(id);
            const categories = await Category.find({ industryId: id });
            await Category.deleteMany({ industryId: id });
            const subcategories = await Subcategory.find({ categoryId: { $in: categories.map(c => c._id) } });
            await Subcategory.deleteMany({ categoryId: { $in: categories.map(c => c._id) } });
            await Skill.deleteMany({ subcategoryId: { $in: subcategories.map(s => s._id) } });
            return NextResponse.json({ message: 'Industry deleted successfully' }, { status: 200 });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}