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
    for (let i = 0; i < numberOfQuestions; i++) {
      const question = this.generateSingleQuestion(words);
      quiz.push(question);
    }

    return quiz;
  }

  // Método para generar una sola pregunta
  private generateSingleQuestion(words: Word[]): Question {
    const randomIndex = Math.floor(Math.random() * words.length);
    const correctWord = words[randomIndex];
    const options = this.getRandomOptions(words, correctWord.definition);

    const question: Question = {
      id: correctWord.id,
      text: correctWord.word,
      options: options.map(option => option.definition),
      correctAnswer: options.findIndex(option => option.id === correctWord.id),
    };

    return question;
  }

  // Seleccionar opciones aleatorias
  private getRandomOptions(words: Word[], correctAnswer: string): Word[] {
    const otherWords = words.filter(word => word.definition !== correctAnswer);
    const shuffledWords = this.shuffleArray(otherWords);
    const randomOptions = shuffledWords.slice(0, 3);
    randomOptions.push(words.find(word => word.definition === correctAnswer));
    return this.shuffleArray(randomOptions);
  }

  // Mezclar el array
  private shuffleArray(array: Word[]): Word[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
