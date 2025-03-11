// Interfaz para una opción de respuesta
export interface QuizOption {
  id: string;
  text: string;
}

// Interfaz para una pregunta del quiz
export interface QuizQuestion {
  id: string;
  word: string;
  options: QuizOption[];
  correctOptionId: string;
}

// Interfaz para la respuesta del quiz completo
export interface QuizResponseDto {
  questions: QuizQuestion[];
} 