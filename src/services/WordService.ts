import Word, { IWord } from '../models/Word';
import { CreateWordDto, UpdateWordDto, WordResponseDto } from '../models/dto/WordDto';
import { Types } from 'mongoose';

export class WordService {
  /**
   * Obtiene todas las palabras
   */
  async getAllWords(): Promise<WordResponseDto[]> {
    const words = await Word.find().sort({ word: 1 });
    return words.map(word => this.mapWordToDto(word));
  }

  /**
   * Obtiene una palabra por su ID
   */
  async getWordById(id: string): Promise<WordResponseDto | null> {
    const word = await Word.findById(id);
    return word ? this.mapWordToDto(word) : null;
  }

  /**
   * Crea una nueva palabra
   */
  async createWord(wordData: CreateWordDto): Promise<WordResponseDto> {
    const newWord = new Word(wordData);
    const savedWord = await newWord.save();
    return this.mapWordToDto(savedWord);
  }

  /**
   * Actualiza una palabra existente
   */
  async updateWord(id: string, wordData: UpdateWordDto): Promise<WordResponseDto | null> {
    const updatedWord = await Word.findByIdAndUpdate(
      id,
      wordData,
      { new: true, runValidators: true }
    );
    return updatedWord ? this.mapWordToDto(updatedWord) : null;
  }

  /**
   * Elimina una palabra
   */
  async deleteWord(id: string): Promise<boolean> {
    const result = await Word.findByIdAndDelete(id);
    return !!result;
  }

  /**
   * Busca palabras por término
   */
  async searchWords(term: string): Promise<WordResponseDto[]> {
    const regex = new RegExp(term, 'i');
    const words = await Word.find({
      $or: [
        { word: regex },
        { definition: regex },
        { exampleSentence: regex }
      ]
    }).sort({ word: 1 });
    
    return words.map(word => this.mapWordToDto(word));
  }

  /**
   * Mapea un documento IWord a un DTO de respuesta
   */
  private mapWordToDto(word: IWord): WordResponseDto {
    return {
      id: (word._id as Types.ObjectId).toString(),
      word: word.word,
      definition: word.definition,
      exampleSentence: word.exampleSentence,
      createdAt: word.createdAt,
      updatedAt: word.updatedAt
    };
  }
} 