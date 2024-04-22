import axiosClient from '@/services/index';

export function login(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axiosClient.post('/auth/seller/login', formData);
      console.log('data :>> ', data);
      resolve(data);
    } catch (error) {
      console.error('Error in login function:', error);
      reject(error);
    }
  });
}
