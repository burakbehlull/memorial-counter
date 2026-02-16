import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPerson extends Document {
  name: string;
  date: Date;
  description?: string;
  details?: string;
  photoUrl?: string;
  createdAt: Date;
}

const PersonSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  details: { type: String },
  photoUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Person: Model<IPerson> = mongoose.models.Person || mongoose.model<IPerson>('Person', PersonSchema);

export default Person;
