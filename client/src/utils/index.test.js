import { capitalizeEveryWord } from '.';

test('Capitalize one word', () => {
  expect(capitalizeEveryWord('word')).toBe('Word');
});

test('Underscore rest of a word', () => {
  expect(capitalizeEveryWord('woRd')).toBe('Word');
});

test('Capitalize multiple words', () => {
  expect(capitalizeEveryWord('a sentence with multiple words')).toBe(
    'A Sentence With Multiple Words'
  );
});

test('Dont capitalize s after apostrophe', () => {
  expect(capitalizeEveryWord("men's")).toBe("Men's");
});
