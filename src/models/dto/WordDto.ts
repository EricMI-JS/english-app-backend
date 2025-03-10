// DTO para crear una nueva palabra
export interface CreateWordDto {
  word: string;
  definition: string;
  exampleSentence: string;
}

// DTO para actualizar una palabra existente
export interface UpdateWordDto {
  word?: string;
  definition?: string;
  exampleSentence?: string;
}

// DTO para la respuesta de una palabra
export interface WordResponseDto {
  id: string;
  word: string;
  definition: string;
  exampleSentence: string;
  createdAt: Date;
  updatedAt: Date;
} 