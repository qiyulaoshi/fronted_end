import type { AxiosRequestConfig } from '@umijs/max';
import { message, notification } from 'antd';

import type { RequestConfig, ResponseInterceptor } from '@@/plugin-request/request';

const requestWebApiInterceptor = (url: string, options: AxiosRequestConfig) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    console.log(token, url, JSON.parse(token), '===');
    const transferHeader = {
      ...options?.headers,
      Authorization: `Bearer ${JSON.parse(token)}`,
    };
    options.headers = transferHeader;
  }

  return {
    url,
    options: { ...options },
  };
};

const responseMiddleware: ResponseInterceptor = (response) => {
  const data = (response?.data || {}) as {
    code: number;
    msg: string;
  };
  // 前台排除OSS的接口报错提示
  const { code, msg = '' } = data;

  if (code !== 200) {
    // 返回数据异常提示
    message
      .error({
        content: msg || JSON.stringify(data),
        // description: `[${JSON.stringify(data)}]`,
      })
      .then();
  }

  if (code === 401) {
    // 登录失效的处理
    window.sessionStorage.removeItem('userInfo');
  }

  return response;
};

const errorHandler = async (error: any) => {
  const { response } = error;
  if ([404, 500, 401].includes(response?.status)) {
    notification.error({
      message: `${response?.status}:${response?.statusText}`,
      description: response?.config.url,
    });
  }
  return Promise.reject(response);
};

export default {
  requestInterceptors: [requestWebApiInterceptor],
  responseInterceptors: [responseMiddleware],
  errorConfig: {
    errorHandler,
  },
  baseURL: 'qiushui/',
  timeout: 1000 * 60,
} as RequestConfig;
