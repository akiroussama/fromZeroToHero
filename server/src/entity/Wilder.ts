import { Field, InputType, ObjectType } from 'type-graphql';
import { MaxLength, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name?: string;
}

@InputType()
export class WilderInput {
  @Field()
  @MaxLength(100)
  @MinLength(1)
  name: string;
}

export default Wilder;
