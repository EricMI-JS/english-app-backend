import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  create(@Body() createWordDto: CreateWordDto) {
    console.log('entro al create');
    
    return this.wordsService.create(createWordDto);
  }

  @Get()
  findAll() {
    console.log('entro');
    
    return this.wordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.wordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordsService.update(+id, updateWordDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.wordsService.remove(+id);
  }
}
