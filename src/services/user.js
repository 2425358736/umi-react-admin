import request from '@/utils/request';
import { postRequest } from '../utils/api';
import { SYS_USER_INFO, SYS_MENU } from './SysInterface';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  const data = await postRequest(SYS_USER_INFO);
  return data.data;
}

export async function getSysMenu() {
  const data = await postRequest(SYS_MENU);
  return data.data;
}

export async function queryNotices() {
  return request('/api/notices');
}
