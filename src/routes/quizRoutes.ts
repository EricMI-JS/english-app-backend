import { Router } from 'express';
import { QuizController } from '../controllers/QuizController';

const router = Router();
const quizController = new QuizController();

// Ruta para generar un quiz con todas las palabras
router.get('/', quizController.generateQuiz);

// Ruta para generar un quiz personalizado con palabras específicas
router.post('/custom', quizController.generateCustomQuiz);

export default router; 