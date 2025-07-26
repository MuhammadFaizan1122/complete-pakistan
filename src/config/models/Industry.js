import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
}, { timestamps: true });

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry', required: true },
}, { timestamps: true });

const IndustrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

export const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
export const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
export const Industry = mongoose.models.Industry || mongoose.model('Industry', IndustrySchema);