import { useEffect, useState } from 'react';
import instance from '../utils/index';

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const {data} = await instance.get('/auth/verifytoken');
        setUser(data.data);
        
      } catch {
        setUser(null); // Nếu có lỗi, không cần xử lý thêm, chỉ cần giữ user là null
      }
    };

    fetchUserProfile();
  }, []);

  return user;
};

export default useUser;
