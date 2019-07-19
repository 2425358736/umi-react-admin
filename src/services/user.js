import { getRequest } from '../utils/api';

async function getSysMenu() {
  const data = await getRequest('/blade-system/menu/routes');

  return data.data;
}

export default getSysMenu;
