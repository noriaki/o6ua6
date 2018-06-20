import initialOfYomi from '../initialOfYomi';

describe('concerns `initialOfYomi`', () => {
  it('returning initial romaji', () => {
    const subject = 'ゲンゴウ';
    const expected = 'g';
    expect(initialOfYomi(subject)).toBe(expected);
  });

  it('case: real-world Gengo yomi', () => {
    const subjects = ['メイジ', 'タイショウ', 'ショウワ', 'ヘイセイ'];
    const expected = ['m', 't', 's', 'h'];
    subjects.forEach((subject, i) => (
      expect(initialOfYomi(subject)).toBe(expected[i])
    ));
  });
});
