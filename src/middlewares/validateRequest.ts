import { Request, Response, NextFunction } from 'express';
import { CreateWordDto, UpdateWordDto } from '../models/dto/WordDto';

/**
 * Valida los datos para crear una palabra
 */
export const validateCreateWord = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { word, definition, exampleSentence } = req.body as CreateWordDto;

  if (!word || typeof word !== 'string' || word.trim() === '') {
    res.status(400).json({ message: 'La palabra es requerida y debe ser un texto válido' });
    return;
  }

  if (!definition || typeof definition !== 'string' || definition.trim() === '') {
    res.status(400).json({ message: 'La definición es requerida y debe ser un texto válido' });
    return;
  }

  if (!exampleSentence || typeof exampleSentence !== 'string' || exampleSentence.trim() === '') {
    res.status(400).json({ message: 'El ejemplo es requerido y debe ser un texto válido' });
    return;
  }

  next();
};

/**
 * Valida los datos para actualizar una palabra
 */
export const validateUpdateWord = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { word, definition, exampleSentence } = req.body as UpdateWordDto;
  
  // Verificar que al menos un campo esté presente
  if (!word && !definition && !exampleSentence) {
    res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar' });
    return;
  }

  // Validar los campos si están presentes
  if (word !== undefined && (typeof word !== 'string' || word.trim() === '')) {
    res.status(400).json({ message: 'La palabra debe ser un texto válido' });
    return;
  }

  if (definition !== undefined && (typeof definition !== 'string' || definition.trim() === '')) {
    res.status(400).json({ message: 'La definición debe ser un texto válido' });
    return;
  }

  if (exampleSentence !== undefined && (typeof exampleSentence !== 'string' || exampleSentence.trim() === '')) {
    res.status(400).json({ message: 'El ejemplo debe ser un texto válido' });
    return;
  }

  next();
}; 