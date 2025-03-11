import { Router } from 'express';
import { QuizController } from '../controllers/QuizController';

const router = Router();
const quizController = new QuizController();

// Ruta para generar un quiz
router.get('/', quizController.generateQuiz);

export default router; 