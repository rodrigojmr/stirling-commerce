import { useState, useEffect } from 'react';
import api from './api';
const useFindUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const findUser = async () => {
      const res = await api.auth.findUser();
    };
    findUser();
  }, []);
  return {
    user,
    isLoading
  };
};

export default useFindUser;
