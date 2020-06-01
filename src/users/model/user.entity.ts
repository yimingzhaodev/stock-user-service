import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'user'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
