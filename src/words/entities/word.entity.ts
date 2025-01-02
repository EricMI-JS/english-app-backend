import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('words') // Define el nombre de la tabla en la base de datos
export class Word {
    @PrimaryGeneratedColumn() // Clave primaria autoincremental
    id: number;

    @Column({ length: 100 }) // Columna de tipo VARCHAR con un límite de longitud
    word: string;

    @Column('text') // Columna de tipo TEXT para la definición
    definition: string;

    @Column('text', { nullable: true }) // Columna de tipo TEXT opcional para ejemplos
    exampleSentence?: string;

    @CreateDateColumn() // Columna para registrar la fecha de creación automáticamente
    createdAt: Date;
}
