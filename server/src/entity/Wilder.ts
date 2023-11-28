import { Field, InputType, ObjectType } from 'type-graphql';
import { MaxLength, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
class SkillOfWilder {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  votes: number;
}

@Entity()
@ObjectType()
class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name?: string;

  @Field(() => [SkillOfWilder])
  skills?: SkillOfWilder[];
}

@InputType()
export class SkillId {
  @Field()
  id: number;
}

@InputType()
export class WilderInput {
  @Field()
  @MaxLength(100)
  @MinLength(1)
  name: string;

  @Field(() => [SkillId], { nullable: true })
  skills?: SkillId[];
}

export default Wilder;
