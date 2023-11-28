import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import Wilder, { SkillId, WilderInput } from '../entity/Wilder';
import datasource from '../db';

@Resolver(Wilder)
export class WilderResolver {
  @Query(() => [Wilder])
  async wilders(): Promise<Wilder[]> {
    const wilders = await datasource.getRepository(Wilder);

    return wilders.find();
  }

  @Query(() => Wilder)
  async wilder(@Arg('id', () => Int) id: number): Promise<Wilder> {
    const wilders = await datasource.getRepository(Wilder);
    const wilder = await wilders.findOne(id);
    if (!wilder) throw new Error('wilder not found');
    return wilder;
  }

  @Mutation(() => Wilder)
  async createWilder(@Arg('data') data: WilderInput): Promise<Wilder> {
    return await datasource.getRepository(Wilder).save(data);
  }

  @Mutation(() => Boolean)
  async deleteWilder(@Arg('id', () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(Wilder).delete(id);
    if (affected === 0) throw new Error('wilder not found');
    return true;
  }
}
