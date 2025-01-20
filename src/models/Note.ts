import mongoose, { Schema, Document } from 'mongoose'

export interface INote extends Document {
  userId: string
  title?: string
  text: string
  updatedCount: number
  createdAt: Date
  updatedAt: Date
}

const NoteSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: false },
    text: { type: String, required: true },
    updatedCount: { type: Number, default: 0 }
  },
  {
    timestamps: true // this automatically creates `createdAt` and `updatedAt` fields
  }
)

export default mongoose.model<INote>('Note', NoteSchema)