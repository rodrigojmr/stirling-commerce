import { useEffect, useState } from 'react';

interface Props {
  password: string;
}

const usePasswordValidation = (password: string) => {
  const [containsNumbers, setContainsNumbers] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [containsSymbols, setContainsSymbols] = useState(false);

  const symbolRegex = new RegExp(/[^A-Z a-z0-9]/);

  useEffect(() => {
    checkPassword(password);
  }, []);

  const checkPassword = (password: string) => {
    setContainsNumbers(password.match(/\d+/g) !== null);
    setHasUpperCase(password.match(/[A-Z]/) !== null);
    setContainsSymbols(symbolRegex.test(password));
  };

  return {
    containsNumbers,
    hasUpperCase,
    containsSymbols,
    checkPassword
  };
};

export default usePasswordValidation;

// const checkPassword = (password: string) => {
//   const symbolRegex = new RegExp(/[^A-Z a-z0-9]/);

//   const containsNumbers = password.match(/\d+/g) !== null;
//   const hasUpperCase = password.match(/[A-Z]/) !== null;
//   const containsSymbols = symbolRegex.test(password);

//   return { containsNumbers, hasUpperCase, containsSymbols };
// };

// export default checkPassword;
