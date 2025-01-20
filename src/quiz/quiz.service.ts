import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Word } from 'src/words/entities/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/quiz/types/question';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
  ) { }

  async generateQuiz(numberOfQuestions: number): Promise<Question[]> {
    const words = await this.wordRepository.find();

    if (words.length < 5) {
      throw new BadRequestException('Se necesitan al menos 5 palabras para generar un quiz');
    }

    if (numberOfQuestions > words.length) {
      throw new BadRequestException(`No se pueden generar ${numberOfQuestions} preguntas. Sólo hay ${words.length} palabras disponibles.`);
    }

    // Arreglo para almacenar todas las preguntas
    const quiz: Question[] = [];

    // Generar tantas preguntas como se haya solicitado
    words.forEach(currentWord => {
      const remainingWords = words.filter((el) => el.id !== currentWord.id);
      const question = this.generateSingleQuestion(currentWord, remainingWords);
      quiz.push(question);
    });

    return this.shuffleArray(quiz);
  }

  private generateSingleQuestion(currentWord: Word, remainingWords: Word[]): Question {
    // Asegurarse de que hay suficientes palabras para generar opciones
    if (remainingWords.length < 3) {
        throw new Error('Not enough words to generate options');
    }

    // Seleccionar 3 palabras aleatorias de remainingWords sin repetirse
    const randomOptions = this.shuffleArray(remainingWords)
        .slice(0, 3)
        .map(word => word.definition);  // Extraemos las definiciones

    // Añadir la definición correcta a las opciones
    randomOptions.push(currentWord.definition);

    // Barajar todas las opciones (incluyendo la correcta)
    const shuffledOptions = this.shuffleArray(randomOptions);

    // Crear la pregunta
    const question: Question = {
        id: currentWord.id,
        text: currentWord.word,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(currentWord.definition),  // Usar indexOf para encontrar la respuesta correcta
        exampleSentence: currentWord.exampleSentence
    };

    return question;
}


  // Mezclar el array
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
