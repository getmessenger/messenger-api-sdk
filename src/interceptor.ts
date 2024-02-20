// // interceptor.ts
// import axios, { AxiosError, AxiosResponse } from "axios";

// export const createInterceptor = (getAuth: () => any) => {
//   return axios.interceptors.response.use(
//     async (response: AxiosResponse) => response,
//     async (error: AxiosError) => {
//       if (error.response && error.response.status === 401) {
//         try {
//           const auth = getAuth();
//           const newToken = await auth.generateBearerToken();

//           if (newToken) {
//             error.config.headers["Authorization"] = `Bearer ${newToken}`;
//             return axios(error.config);
//           } else {
//             throw new Error("Unable to reauthenticate. Please log in again.");
//           }
//         } catch (authError) {
//           console.error("Reauthentication failed:", authError);
//           throw new Error("Unable to reauthenticate. Please log in again.");
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };
