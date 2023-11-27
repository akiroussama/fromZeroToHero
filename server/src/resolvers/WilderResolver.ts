import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import Wilder, { SkillId, WilderInput } from '../entity/Wilder';
import datasource from '../db';
import Grade from '../entity/Grade';

@Resolver(Wilder)
export class WilderResolver {
  @Query(() => [Wilder])
  async wilders(): Promise<Wilder[]> {
    const wilders = await datasource
      .getRepository(Wilder)
      .find({ relations: { grades: { skill: true } } });

    return wilders.map((w) => ({
      ...w,
      skills: w.grades.map((g) => ({
        id: g.skill.id,
        name: g.skill.name,
        votes: g.votes,
      })),
    }));
  }

  @Query(() => Wilder)
  async wilder(@Arg('id', () => Int) id: number): Promise<Wilder> {
    const wilder = await datasource
      .getRepository(Wilder)
      .findOne({ where: { id }, relations: { grades: { skill: true } } });

    if (wilder === null) throw new Error('wilder not found');

    return {
      ...wilder,
      skills: wilder.grades.map((g) => ({
        id: g.skill.id,
        name: g.skill.name,
        votes: g.votes,
      })),
    };
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
