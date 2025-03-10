import { Request, Response } from 'express';
import { WordService } from '../services/WordService';
import { CreateWordDto, UpdateWordDto } from '../models/dto/WordDto';

export class WordController {
  private wordService: WordService;

  constructor() {
    this.wordService = new WordService();
  }

  /**
   * Obtiene todas las palabras
   */
  getAllWords = async (req: Request, res: Response): Promise<void> => {
    try {
      const words = await this.wordService.getAllWords();
      res.status(200).json(words);
    } catch (error) {
      console.error('Error al obtener palabras:', error);
      res.status(500).json({ message: 'Error al obtener palabras' });
    }
  };

  /**
   * Obtiene una palabra por su ID
   */
  getWordById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const word = await this.wordService.getWordById(id);

      if (!word) {
        res.status(404).json({ message: 'Palabra no encontrada' });
        return;
      }

      res.status(200).json(word);
    } catch (error) {
      console.error('Error al obtener palabra:', error);
      res.status(500).json({ message: 'Error al obtener palabra' });
    }
  };

  /**
   * Crea una nueva palabra
   */
  createWord = async (req: Request, res: Response): Promise<void> => {
    try {
      const wordData: CreateWordDto = req.body;
      const newWord = await this.wordService.createWord(wordData);
      res.status(201).json(newWord);
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        res.status(400).json({ message: 'La palabra ya existe' });
        return;
      }
      console.error('Error al crear palabra:', error);
      res.status(500).json({ message: 'Error al crear palabra' });
    }
  };

  /**
   * Actualiza una palabra existente
   */
  updateWord = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const wordData: UpdateWordDto = req.body;
      const updatedWord = await this.wordService.updateWord(id, wordData);

      if (!updatedWord) {
        res.status(404).json({ message: 'Palabra no encontrada' });
        return;
      }

      res.status(200).json(updatedWord);
    } catch (error) {
      console.error('Error al actualizar palabra:', error);
      res.status(500).json({ message: 'Error al actualizar palabra' });
    }
  };

  /**
   * Elimina una palabra
   */
  deleteWord = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.wordService.deleteWord(id);

      if (!deleted) {
        res.status(404).json({ message: 'Palabra no encontrada' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar palabra:', error);
      res.status(500).json({ message: 'Error al eliminar palabra' });
    }
  };

  /**
   * Busca palabras por término
   */
  searchWords = async (req: Request, res: Response): Promise<void> => {
    try {
      const { term } = req.query;
      
      if (!term || typeof term !== 'string') {
        res.status(400).json({ message: 'Se requiere un término de búsqueda válido' });
        return;
      }

      const words = await this.wordService.searchWords(term);
      res.status(200).json(words);
    } catch (error) {
      console.error('Error al buscar palabras:', error);
      res.status(500).json({ message: 'Error al buscar palabras' });
    }
  };
} 