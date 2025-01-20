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

    return quiz;
  }

  // Método para generar una sola pregunta
  private generateSingleQuestion(currentWord: Word, remainingWords: Word[]): Question {

    const options = remainingWords.map((word) => word.definition).slice(0,4).concat(currentWord.definition)

    const question: Question = {
      id: currentWord.id,
      text: currentWord.word,
      options: this.shuffleArray(options),
      correctAnswer: options.findIndex(option => option === currentWord.definition),
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
