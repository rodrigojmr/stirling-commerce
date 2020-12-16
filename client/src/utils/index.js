// (?<!['-]) is to look behind one character '?<' and exclude '!' if previous character was not ' or -
export const capitalizeEveryWord = str => {
  const allLowerCase = str.replace(/[A-Z]/g, char => char.toLowerCase());
  return allLowerCase.replace(/\b(?<!['-])[a-z]/g, char => char.toUpperCase());
};
