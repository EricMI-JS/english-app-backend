import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateWordDto {
  @IsNotEmpty() // La propiedad es obligatoria
  @IsString() // Debe ser una cadena de texto
  @MaxLength(100) // Longitud máxima de la cadena
  word: string;

  @IsNotEmpty()
  @IsString()
  definition: string;

  @IsOptional()
  @IsString()
  exampleSentence: string;
}
