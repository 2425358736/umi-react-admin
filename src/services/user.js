import { getRequest } from '../utils/api';

async function getSysMenu() {
  const data = await getRequest('/sys/getSysMenu');
  return data.data;
}

export default getSysMenu;
