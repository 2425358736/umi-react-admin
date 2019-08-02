import router from 'umi/router';
import moment from 'moment';
import request from './request';

export const http = process.env.apiUrl;

export function getRequest(url, params, headers) {
  if (!headers) {
    headers = {};
  }
  let paramstr = '?';
  for (const key in params) {
    if (key) {
      paramstr = `${paramstr + key}=${params[key]}&`;
    }
  }
  paramstr = paramstr.substring(0, paramstr.length - 1);
  url += paramstr;
  return new Promise((resolve, reject) => {
    if (localStorage.getItem('Authorization')) {
      headers = { Authorization: localStorage.getItem('Authorization') };
    }
    request(http + url, {
      method: 'GET',
      headers,
    })
      .then(response => {
        const resultData = response;
        if (resultData.code === 401) {
          router.push('/login');
        } else {
          resolve(resultData);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function postRequest(url, params, headers) {
  if (!headers) {
    headers = {};
  }
  if (localStorage.getItem('Authorization')) {
    headers.Authorization = localStorage.getItem('Authorization');
  }
  return new Promise((resolve, reject) => {
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
          // code 401 为token失效 跳转至登录页
          if (resultData.code === 401) {
            router.push('/login');
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

export function putRequest(url, params, headers) {
  if (!headers) {
    headers = {};
  }
  if (localStorage.getItem('Authorization')) {
    headers.Authorization = localStorage.getItem('Authorization');
  }
  return new Promise((resolve, reject) => {
    request(http + url, {
      method: 'PUT',
      body: {
        ...params,
      },
    })
      .then(response => {
        const resultData = response;
        if (resultData.code === 401) {
          router.push('/login');
        } else {
          resolve(resultData);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function deleteRequest(url, headers) {
  if (!headers) {
    headers = {};
  }
  return new Promise((resolve, reject) => {
    if (localStorage.getItem('Authorization')) {
      headers = { Authorization: localStorage.getItem('Authorization') };
    }
    request(http + url, {
      method: 'delete',
      headers,
    })
      .then(response => {
        const resultData = response;
        if (resultData.code === 401) {
          router.push('/login');
        } else {
          resolve(resultData);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function postFormDateRequest(url, params, headers) {
  if (!headers) {
    headers = {};
  }
  if (localStorage.getItem('Authorization')) {
    headers['Blade-Auth'] = localStorage.getItem('Authorization');
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
          if (resultData.code === 401) {
            router.push('/login');
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

// 参数格式处理方法
export function requestParameterProcessing(json) {
  for (const key in json) {
    if (Array.isArray(json[key])) {
      const arr = [];
      let type = 0; // 数据类型 0 字符 1 日期 2 上传 3 对象
      json[key].forEach(obj => {
        if (moment.isMoment(obj)) {
          // 日期处理
          type = 1;
          arr.push(obj.format('YYYY-MM-DD'));
        } else if (moment.isDate(obj)) {
          type = 1;
          arr.push(moment(obj).format('YYYY-MM-DD'));
        } else if (obj.url && obj.uid && obj.name && obj.status) {
          // 上传处理
          type = 2;
          arr.push(obj.url);
        } else if (typeof obj === 'object') {
          type = 3;
          requestParameterProcessing(obj);
          arr.push(obj);
        } else {
          type = 0;
          arr.push(obj);
        }
      });
      if (type === 2) {
        json[key] = arr.join('#');
      } else if (type === 1) {
        json[key] = arr;
      } else if (type === 0) {
        json[key] = arr.toString();
      } else {
        json[key] = arr;
      }
    } else if (typeof json[key] === 'object') {
      if (moment.isMoment(json[key])) {
        // 日期处理
        json[key] = json[key].format('YYYY-MM-DD');
      } else if (moment.isDate(json[key])) {
        json[key] = moment(json[key]).format('YYYY-MM-DD');
      } else {
        requestParameterProcessing(json[key]);
      }
    }
  }
}
