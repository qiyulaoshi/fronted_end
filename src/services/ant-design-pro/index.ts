// @ts-ignore
/* eslint-disable */
// API 更新时间：
// API 唯一标识：
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function queryCurrentUser(options?: { [key: string]: any }) {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '') as API.CurrentUser;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userInfo as API.CurrentUser);
    }, 1);
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1);
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams) {
  return request<API.LoginResult>('/qiushui/user/login', {
    method: 'POST',
    data: body,
  });
}

export async function hello(orderType?: string) {
  return request<API.LoginResult>('/qiushui/hello', {
    method: 'GET',
    params: { orderType },
  });
}

/** 注册接口 POST /qiushui/user/register */
export async function register(body: API.LoginParams) {
  return request<API.LoginResult>('/qiushui/user/register', {
    method: 'POST',
    data: body,
  });
}
