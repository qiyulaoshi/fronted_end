/*
 * @Author: lijiahao@youlai.cn lijiahao@youlai.cn
 * @Date: 2022-08-08 14:04:11
 * @LastEditors: lijiahao@youlai.cn lijiahao@youlai.cn
 * @LastEditTime: 2022-08-17 01:10:58
 * @FilePath: /fronted_end/src/services/ant-design-pro/api.ts
 * @Description:
 */
// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
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

/** 注册接口 POST /qiushui/user/register */
export async function register(body: API.LoginParams) {
  return request<API.LoginResult>('/qiushui/user/register', {
    method: 'POST',
    data: body,
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
