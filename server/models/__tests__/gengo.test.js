import mongoose from 'mongoose';
import Gengo from '../gengo';

describe('Gengo model', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/o6ua6_next_test');
  });

  afterEach(() => Gengo.remove({}));

  afterAll(() => mongoose.disconnect());

  describe('create document', () => {
    it('setting identifier with `surface` in new document', async () => {
      const subject = new Gengo({ surface: '料' });
      await subject.save();
      expect(subject.identifier).toBe('99696e');
    });

    it('setting identifier with `surface` in assign after init', async () => {
      const subject = new Gengo();
      subject.surface = '料';
      await subject.save();
      expect(subject.identifier).toBe('99696e');
    });
  });

  describe('data import', () => {
    it('format(json)-> { [surface]: [yomi01, yomi02, ...] }', async () => {
      /* eslint-disable quote-props */
      const subjects = {
        '明治': ['メイジ', 'メイチ'],
        '大正': ['タイショウ', 'ダイショウ'],
        '昭和': ['ショウワ'],
        '平成': ['ヘイセイ'],
      };
      /* eslint-enable quote-props */
      await Gengo.import(subjects);
      expect(await Gengo.count()).toBe(Object.keys(subjects).length);
      const expectedYomi = flatten(Object.values(subjects));
      const subjectYomi = flatten((await Gengo.find()).map(g => g.yomi));
      expect(subjectYomi).toHaveLength(expectedYomi.length);
    });
  });
});

const flatten = arrayOfArray => (
  arrayOfArray.reduce((ret, array) => ret.concat(array), [])
);
