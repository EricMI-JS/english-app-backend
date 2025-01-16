import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from 'src/words/entities/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
