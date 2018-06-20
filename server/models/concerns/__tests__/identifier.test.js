import identifier from '../identifier';

describe('concerns `identifier`', () => {
  it('returning encode', () => {
    const subject = '料';
    const expected = '99696e';
    expect(identifier(subject)).toBe(expected);
  });
});
