import { Request, Response } from 'express';
import { QuizService } from '../services/QuizService';

export class QuizController {
  private quizService: QuizService;

  constructor() {
    this.quizService = new QuizService();
  }

  /**
   * Genera un quiz con todas las palabras disponibles
   */
  generateQuiz = async (req: Request, res: Response): Promise<void> => {
    try {
      const quiz = await this.quizService.generateQuiz();
      res.status(200).json(quiz);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Se necesitan al menos 4 palabras')) {
        res.status(400).json({ message: error.message });
        return;
      }
      console.error('Error al generar quiz:', error);
      res.status(500).json({ message: 'Error al generar quiz' });
    }
  };
} 