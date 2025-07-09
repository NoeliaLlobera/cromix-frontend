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

export const COLLECTIONS_ENDPOINTS = {
  GET: `${HOST}/collections`,
  GET_BY_ID: (id: string) => `${HOST}/collections/${id}`,
  CREATE: `${HOST}/collections`,
  DELETE: (id: string) => `${HOST}/collections/${id}`,
}

export const CROMO_TYPES_ENDPOINTS = {
  GET_BY_COLLECTION_ID: (collectionId: string) => `${HOST}/cromo-type/${collectionId}`,
  CREATE: `${HOST}/cromo-type`,
  DELETE: (id: string) => `${HOST}/cromo-type/${id}`,
  UPDATE: (id: string) => `${HOST}/cromo-type/${id}`,
}


