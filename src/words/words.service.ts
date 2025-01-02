import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word) private readonly wordRepository : Repository<Word>
  ) {}

  create(createWordDto: CreateWordDto) {
    return this.wordRepository.create(createWordDto);
  }

  findAll() {
    return this.wordRepository.find();
  }

  async findOne(id: number) {
    const word = await this.wordRepository.findOneBy({id});
    if(!word) {
      throw new NotFoundException('La palabra no existe');
    }
    return word
  }

  async update(id: number, updateWordDto: UpdateWordDto) {
    const word = await this.findOne(id)
    Object.assign(word, updateWordDto)

    return await this.wordRepository.save(word)
  }

  async remove(id: number) {
    const word = await this.findOne(id)
     await this.wordRepository.remove(word)
    return "Palabra Eliminada"
  }
}
