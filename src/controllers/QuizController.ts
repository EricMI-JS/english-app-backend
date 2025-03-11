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

  /**
   * Genera un quiz personalizado con palabras específicas por ID
   */
  generateCustomQuiz = async (req: Request, res: Response): Promise<void> => {
    try {
      const { wordIds } = req.body;
      
      if (!Array.isArray(wordIds)) {
        res.status(400).json({ message: 'El parámetro wordIds debe ser un array de IDs' });
        return;
      }
      
      const quiz = await this.quizService.generateCustomQuiz(wordIds);
      res.status(200).json(quiz);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Se requiere al menos un ID') || 
            error.message.includes('No se encontraron palabras') ||
            error.message.includes('Se necesitan al menos 4 palabras')) {
          res.status(400).json({ message: error.message });
          return;
        }
      }
      console.error('Error al generar quiz personalizado:', error);
      res.status(500).json({ message: 'Error al generar quiz personalizado' });
    }
  };
} 