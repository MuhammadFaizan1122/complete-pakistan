// utils/fileUpload.ts
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { nanoid } from 'nanoid';

export async function saveFile(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${nanoid()}.${fileExtension}`;
    const path = join(process.cwd(), 'public', 'uploads', fileName);
    await writeFile(path, buffer);
    return `/uploads/${fileName}`;
}