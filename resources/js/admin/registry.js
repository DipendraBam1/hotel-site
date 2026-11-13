import { createCrudApi } from './api';
import rooms from './resources/rooms';
import packages from './resources/packages';
import experiences from './resources/experiences';
import gallery from './resources/gallery';
import faqs from './resources/faqs';

 // Add each new content type here as its config is built
const configs = [rooms,packages,experiences,gallery,faqs];

export const resources = configs.map((c) => ({ ...c, api: createCrudApi(c) }));
export const getResource = (key) => resources.find((r) => r.key === key);