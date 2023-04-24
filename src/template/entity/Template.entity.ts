import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Template {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}
