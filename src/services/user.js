import { getRequest } from '../utils/api';

async function getSysMenu() {
  const data = await getRequest('/api/getMenu');
  return data.data;
}

export default getSysMenu;
