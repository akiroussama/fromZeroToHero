import { InputType, Field } from 'type-graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class WilderInput {
  @Field()
  @MaxLength(100)
  @MinLength(1)
  name: string;
}
