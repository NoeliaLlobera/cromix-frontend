const HOST = 'http://localhost:3000';

export const USERS_ENDPOINTS = {
  GET: `${HOST}/users`,
  GET_BY_ID: (id: string) => `${HOST}/users/${id}`,
  CREATE: `${HOST}/users`,
  DELETE: (id: string) => `${HOST}/users/${id}`,
}
