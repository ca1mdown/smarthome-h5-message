import axios from 'axios';
import { serviceTypes } from '../constants/serviceTypes';

const instance = axios.create({
  baseURL: '', // Set your base URL here if needed
  timeout: 10000,
});

const requestWrapper = ({ serviceType, url, method = 'get', params = {} }) => {
  // In a real app, serviceType might change the baseURL or add specific headers
  console.log(`[Request] Service: ${serviceType}, URL: ${url}, Method: ${method}, Params:`, params);
  
  return instance({
    url,
    method,
    // If it's a POST, we usually send data in the body. 
    // The user's example uses 'params' for the body object.
    [method.toLowerCase() === 'get' ? 'params' : 'data']: params,
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.error(`[Request Error] ${url}:`, error);
    throw error;
  });
};

export default requestWrapper;
