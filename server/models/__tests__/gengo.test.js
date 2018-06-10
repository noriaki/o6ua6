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
});
