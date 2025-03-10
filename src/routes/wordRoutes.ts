import { Router } from 'express';
import { WordController } from '../controllers/WordController';
import { validateCreateWord, validateUpdateWord } from '../middlewares/validateRequest';

const router = Router();
const wordController = new WordController();

// Rutas para palabras
router.get('/', wordController.getAllWords);
router.get('/search', wordController.searchWords);
router.get('/:id', wordController.getWordById);
router.post('/', validateCreateWord, wordController.createWord);
router.put('/:id', validateUpdateWord, wordController.updateWord);
router.delete('/:id', wordController.deleteWord);

export default router; 