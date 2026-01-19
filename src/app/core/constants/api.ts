const HOST_PROD = 'https://cromix-backend.onrender.com';
const HOST_DEV = 'http://localhost:3000';

const HOST = HOST_PROD;

export const USERS_ENDPOINTS = {
  GET: `${HOST}/users`,
  GET_BY_ID: (id: string) => `${HOST}/users/${id}`,
  CREATE: `${HOST}/register`,
  LOGIN: `${HOST}/login`,
  LOGOUT: `${HOST}/logout`,
  DELETE: (id: string) => `${HOST}/users/${id}`,
}

export const AUTH_ENDPOINTS = {
  LOGIN: `${HOST}/login`,
  REGISTER: `${HOST}/register`,
  LOGOUT: `${HOST}/logout`,
}

export const COLLECTIONS_ENDPOINTS = {
  GET: `${HOST}/collections`,
  GET_ALL: `${HOST}/collections/all`,
  GET_BY_ID: (id: string) => `${HOST}/collections/${id}`,
  CREATE: `${HOST}/collections`,
  DELETE: (id: string) => `${HOST}/collections/${id}`,
  UPDATE: (id: string) => `${HOST}/collections/${id}`,
}

export const CROMO_TYPES_ENDPOINTS = {
  GET_BY_COLLECTION_ID: (collectionId: string) => `${HOST}/cromotype/${collectionId}`,
  CREATE: `${HOST}/cromotype`,
  DELETE: (id: string) => `${HOST}/cromotype/${id}`,
  UPDATE: (id: string) => `${HOST}/cromotype/${id}`,
}

export const CROMO_ENDPOINTS = {
  GET_BY_USER_ID: (userId: string, collectionId: string) => `${HOST}/cromo/user/${userId}/${collectionId}`,
  CREATE: `${HOST}/cromo`,
  CREATE_MULTIPLE: `${HOST}/cromo/multiple`,
}


export const COLLECTING_USERS_ENDPOINTS = {
  ADD_USER_TO_COLLECTION: `${HOST}/collecting-users`,
  REMOVE_USER_FROM_COLLECTION: (id: string) => `${HOST}/collecting-users/${id}`,
  GET_USERS_BY_COLLECTION: (collectionId: string) => `${HOST}/collecting-users/collection/${collectionId}`,
  GET_COLLECTIONS_BY_USER: (userId: string) => `${HOST}/collecting-users/user/${userId}`,
}

