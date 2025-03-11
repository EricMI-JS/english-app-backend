import { WordService } from './WordService';
import { QuizOption, QuizQuestion, QuizResponseDto } from '../models/dto/QuizDto';
import { WordResponseDto } from '../models/dto/WordDto';

export class QuizService {
  private wordService: WordService;

  constructor() {
    this.wordService = new WordService();
  }

  /**
   * Genera un quiz con todas las palabras disponibles
   */
  async generateQuiz(): Promise<QuizResponseDto> {
    // Obtener todas las palabras
    const allWords = await this.wordService.getAllWords();
    
    if (allWords.length < 4) {
      throw new Error('Se necesitan al menos 4 palabras para generar un quiz');
    }

    // Crear preguntas para cada palabra
    const questions: QuizQuestion[] = allWords.map(word => {
      return this.createQuizQuestion(word, allWords);
    });

    return { questions };
  }

  /**
   * Genera un quiz personalizado con palabras específicas por ID
   */
  async generateCustomQuiz(wordIds: string[]): Promise<QuizResponseDto> {
    if (!wordIds || wordIds.length === 0) {
      throw new Error('Se requiere al menos un ID de palabra para generar un quiz personalizado');
    }

    // Obtener todas las palabras para usar como opciones incorrectas
    const allWords = await this.wordService.getAllWords();
    
    if (allWords.length < 4) {
      throw new Error('Se necesitan al menos 4 palabras en la base de datos para generar un quiz');
    }

    // Obtener las palabras específicas por ID
    const customWords: WordResponseDto[] = [];
    
    for (const id of wordIds) {
      const word = await this.wordService.getWordById(id);
      if (word) {
        customWords.push(word);
      }
    }

    if (customWords.length === 0) {
      throw new Error('No se encontraron palabras con los IDs proporcionados');
    }

    // Crear preguntas para cada palabra personalizada
    const questions: QuizQuestion[] = customWords.map(word => {
      return this.createQuizQuestion(word, allWords);
    });

    return { questions };
  }

  /**
   * Crea una pregunta de quiz para una palabra específica
   */
  private createQuizQuestion(currentWord: WordResponseDto, allWords: WordResponseDto[]): QuizQuestion {
    // Filtrar la palabra actual de la lista de todas las palabras
    const otherWords = allWords.filter(word => word.id !== currentWord.id);
    
    // Seleccionar 3 palabras aleatorias diferentes para las opciones incorrectas
    const incorrectOptions = this.getRandomElements(otherWords, 3);
    
    // Crear la opción correcta
    const correctOption: QuizOption = {
      id: currentWord.id,
      text: currentWord.definition
    };
    
    // Crear las opciones incorrectas
    const incorrectQuizOptions: QuizOption[] = incorrectOptions.map(word => ({
      id: word.id,
      text: word.definition
    }));
    
    // Combinar todas las opciones
    const allOptions = [...incorrectQuizOptions, correctOption];
    
    // Mezclar las opciones para que la correcta no siempre esté en la misma posición
    const shuffledOptions = this.shuffleArray([...allOptions]);
    
    return {
      id: currentWord.id,
      word: currentWord.word,
      options: shuffledOptions,
      correctOptionId: correctOption.id
    };
  }

  /**
   * Obtiene n elementos aleatorios de un array
   */
  private getRandomElements<T>(array: T[], n: number): T[] {
    // Crear una copia del array para no modificar el original
    const shuffled = this.shuffleArray([...array]);
    // Devolver los primeros n elementos
    return shuffled.slice(0, n);
  }

  /**
   * Mezcla aleatoriamente los elementos de un array
   */
  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
} 