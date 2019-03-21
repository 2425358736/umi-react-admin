import router from 'umi/router';
import moment from 'moment';
import request from './request';

export const http = 'http://127.0.0.1:8090';

export const ws = 'ws://127.0.0.1:8090/websocket';

export function getRequest(url) {
  return new Promise((resolve, reject) => {
    let headers = {};
    if (localStorage.getItem('Authorization')) {
      headers = { Authorization: localStorage.getItem('Authorization') };
    }
    request(http + url, {
      method: 'GET',
      headers,
    })
      .then(response => {
        const resultData = response;
        resolve(resultData);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function postRequest(url, params) {
  return new Promise((resolve, reject) => {
    let headers = {};
    if (localStorage.getItem('Authorization') && url !== '/system/verificationUser') {
      headers = { Authorization: localStorage.getItem('Authorization') };
    }
    request(http + url, {
      method: 'POST',
      headers,
      body: {
        ...params,
      },
    })
      .then(response => {
        const resultData = response;
        if (typeof resultData !== 'undefined') {
          if (resultData.status === 120) {
            router.push('/user/login');
          } else {
            resolve(resultData);
          }
        } else {
          resolve(resultData);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function putRequest(url, params) {
  return new Promise((resolve, reject) => {
    request(http + url, {
      method: 'PUT',
      body: {
        ...params,
      },
    })
      .then(response => {
        const resultData = response;
        resolve(resultData);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function deleteRequest(url, params) {
  return new Promise((resolve, reject) => {
    request(http + url, {
      method: 'delete',
      body: {
        ...params,
      },
    })
      .then(response => {
        const resultData = response;
        resolve(resultData);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function postFormDateRequest(url, params) {
  let headers = {};
  if (localStorage.getItem('Authorization')) {
    headers = { Authorization: localStorage.getItem('Authorization') };
  }
  let paramstr = '';
  for (const key in params) {
    if (key) {
      paramstr = `${paramstr + key}=${params[key]}&`;
    }
  }
  if (paramstr !== '') {
    paramstr = paramstr.substr(0, paramstr.length - 1);
  }
  return new Promise((resolve, reject) => {
    request(http + url, {
      method: 'POST',
      headers,
      body: paramstr,
    })
      .then(response => {
        const resultData = response;
        if (typeof resultData !== 'undefined') {
          resolve(resultData);
        } else {
          resolve(resultData);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
/**
 * 导出export
 */
let current1 = 0;
export async function exportExcel(url, params) {
  // Object.assign(params, { type: 1 });
  current1 += 1;
  Object.assign(params, {
    pagination: {
      current: current1,
      pageSize: 5000,
    },
  });
  const data = await postRequest(url, params);
  if (data.status === 200) {
    window.location.href = `${http}/file/excel?Authorization=${localStorage.getItem(
      'Authorization'
    )}`;
    if (data.data.lastPage.toString() !== current1.toString()) {
      exportExcel(url, params);
    } else {
      current1 = 0;
    }
  }
}
/* eslint-disable */
/**
 * 参数处理方法
 * @param json
 */
export function jsonString(json) {
  for (const key in json) {
    if (Array.isArray(json[key])) {
      if (key.indexOf('Date') >= 0 || key.indexOf('Time') >= 0) {
        let arr = [];
        json[key].forEach(str => {
          arr.push(moment(str).format('YYYY-MM-DD'));
        });
        json[key] = arr;
      } else {
        let kg = false;
        json[key].forEach((json2, i) => {
          if (typeof json2 === 'object') {
            jsonString(json2);
          } else if (typeof json2 !== 'undefined') {
            json2 = json2.toString();
            kg = true;
          }
        });
        if (kg) {
          json[key] = json[key].toString();
        }
      }
      if (json[key].length <= 0) {
        json[key] = null;
      }
    } else {
      if (
        json[key] !== null &&
        typeof json[key] !== 'undefined' &&
        typeof json[key] !== '' &&
        (key.indexOf('Date') >= 0 || key.indexOf('Time') >= 0)
      ) {
        json[key] = moment(json[key]).format('YYYY-MM-DD');
      }
    }
  }
}
function exportExcelGet(url, params) {
  window.open(`${http}/upload/excel?list=${params}`);
}

export function verVal(val) {
  return val !== '' && typeof val !== 'undefined' && val !== null;
}
