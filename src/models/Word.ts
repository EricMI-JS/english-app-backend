import mongoose, { Document, Schema } from 'mongoose';

// Interfaz para el documento de Word
export interface IWord extends Document {
  word: string;
  definition: string;
  exampleSentence: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema para Word
const WordSchema: Schema = new Schema(
  {
    word: {
      type: String,
      required: [true, 'La palabra es obligatoria'],
      trim: true,
      unique: true,
      lowercase: true,
    },
    definition: {
      type: String,
      required: [true, 'La definición es obligatoria'],
      trim: true,
    },
    exampleSentence: {
      type: String,
      required: [true, 'El ejemplo es obligatorio'],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Índice para búsquedas más eficientes
WordSchema.index({ word: 1 });

export default mongoose.model<IWord>('Word', WordSchema); 