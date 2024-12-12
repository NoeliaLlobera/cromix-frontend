const HOST_PROD = 'https://cromix-backend.onrender.com';
const HOST_DEV = 'http://localhost:3000';

const HOST = HOST_DEV;

export const USERS_ENDPOINTS = {
  GET: `${HOST}/users`,
  GET_BY_ID: (id: string) => `${HOST}/users/${id}`,
  CREATE: `${HOST}/users`,
  LOGIN: `${HOST}/users/login`,
  DELETE: (id: string) => `${HOST}/users/${id}`,
}
