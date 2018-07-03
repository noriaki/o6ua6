import { connect, disconnect } from '../../db';
import Yomi from '../yomi';

describe('Yomi model', () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await Yomi.remove({});
  });

  afterAll(async () => {
    await disconnect();
  });

  describe('create document', () => {
    it('setting default votingCount to `0`', async () => {
      const subject = new Yomi({ name: 'ヨミ', initial: 'y' });
      await subject.save();
      expect(subject.votingCount).toBe(0);
    });

    it('setting initial with `name` in new document', async () => {
      const subject = new Yomi({ name: 'ヨミ' });
      await subject.save();
      expect(subject.initial).toBe('y');
    });

    it('setting initial with `name` in assign after init', async () => {
      const subject = new Yomi();
      subject.name = 'ヨミ';
      await subject.save();
      expect(subject.initial).toBe('y');
    });
  });
});
