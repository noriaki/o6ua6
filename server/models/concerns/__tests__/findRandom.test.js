import { connect, disconnect } from '../../../db';
import Gengo from '../../gengo';
import identifier from '../identifier';

describe('concerns `findRandom`', () => {
  beforeAll(() => connect());

  beforeEach(async () => {
    /* eslint-disable quote-props */
    const subjects = {
      '明治': ['メイジ', 'メイチ'],
      '大正': ['タイショウ', 'ダイショウ'],
      '昭和': ['ショウワ'],
      '平成': ['ヘイセイ'],
    };
    /* eslint-enable quote-props */
    await Gengo.import(subjects);
  });

  afterEach(() => Gengo.remove({}));

  afterAll(() => disconnect());

  it('returning array of doc, default (limit) 1 doc', async () => {
    const subject = await Gengo.random();
    expect(subject).toHaveLength(1);
  });

  it('returning array size depends on passed `limit` option', async () => {
    let subject = await Gengo.random({ limit: 1 });
    expect(subject).toHaveLength(1);
    subject = await Gengo.random({ limit: 2 });
    expect(subject).toHaveLength(2);
    subject = await Gengo.random({ limit: 3 });
    expect(subject).toHaveLength(3);
  });

  it('when passed `excepts` option(Array[Identifier]), excludes in returning array', async () => {
    const excepts = [
      identifier('明治'), identifier('大正'), identifier('昭和'),
    ];
    const subject = await Gengo.random({ excepts });
    expect(subject).toHaveLength(1);
    expect(subject[0].surface).toBe('平成');
  });
});
