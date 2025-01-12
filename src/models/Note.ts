// src/models/Note.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface INote extends Document {
  title?: string
  text: string
  updatedCount: number
  createdAt: Date
  updatedAt: Date
}

const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: false },
    text: { type: String, required: true },
    updatedCount: { type: Number, default: 0 }
  },
  {
    timestamps: true // this automatically creates `createdAt` and `updatedAt` fields
  }
)

export default mongoose.model<INote>('Note', NoteSchema)