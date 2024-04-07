import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";

const NEXT_PUBLIC_MAIN_DOMAIN = process.env.NEXT_PUBLIC_MAIN_DOMAIN;

function responseConfig(response: AxiosResponse) {
  return response;
}

async function responseErrorConfig(error: AxiosError) {
  const { config } = Object.assign(error, {
    config: {
      retry: 1,
      retryDelay: 1000,
    },
  });
  config.retry = config.retry || 6;
  config.retry -= 1;
  if (config.retry < 0) {
    return Promise.reject(error.response);
  }
  const delayRetryRequest = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1000);
  });
  await delayRetryRequest;
  return await instance(config);
}

const instance = axios.create({
  baseURL: NEXT_PUBLIC_MAIN_DOMAIN,
});

// instance.interceptors.response.use(responseConfig, responseErrorConfig);

export default instance;
