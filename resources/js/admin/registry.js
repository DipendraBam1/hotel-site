import { createCrudApi } from './api';
import rooms from './resources/rooms';
import packages from './resources/packages';

 // Add each new content type here as its config is built
const configs = [rooms,packages];

export const resources = configs.map((c) => ({ ...c, api: createCrudApi(c) }));
export const getResource = (key) => resources.find((r) => r.key === key);