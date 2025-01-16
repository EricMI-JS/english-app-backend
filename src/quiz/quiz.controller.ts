import { Controller, Get, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Question } from 'src/quiz/types/question';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getQuiz(@Query('count') count: string): Promise<Question[]> {
    const numberOfQuestions = parseInt(count, 10) || 5; // Por defecto, genera 5 preguntas
    return await this.quizService.generateQuiz(numberOfQuestions);
  }
}
