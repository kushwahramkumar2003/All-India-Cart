import axiosClient from '@/services/index';

// export function login(formData: any) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const { data } = await axiosClient.post('/auth/seller/login', formData);
//       console.log('data :>> ', data);
//       resolve(data);
//     } catch (error) {
//       console.error('Error in login function:', error);
//       reject(error);
//     }
//   });
// }

export const login = async (formData: any) => {
  try {
    const { data } = await axiosClient.post('/auth/seller/login', formData);
    return data;
    //@ts-ignore
  } catch (error: Error) {
    console.error('Error in login function:', error);
    throw new Error(error?.response?.data?.message);
  }
};
