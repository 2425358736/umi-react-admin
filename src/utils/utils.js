/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

/**
 * echarts 横轴文字过长截取
 */
export function formatter(params) {
  let newParamsName = ''; // 最终拼接成的字符串
  const paramsNameNumber = params.length; // 实际标签的个数
  const provideNumber = 5; // 每行能显示的字的个数
  const rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
  /**
   * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
   */
  // 条件等同于rowNumber>1
  if (paramsNameNumber > provideNumber) {
    /** 循环每一行,p表示行 */
    for (let p = 0; p < rowNumber; p += 1) {
      let tempStr = ''; // 表示每一次截取的字符串
      const start = p * provideNumber; // 开始截取的位置
      const end = start + provideNumber; // 结束截取的位置
      // 此处特殊处理最后一行的索引值
      if (p === rowNumber - 1) {
        // 最后一次不换行
        tempStr = params.substring(start, paramsNameNumber);
      } else {
        // 每一次拼接字符串并换行
        tempStr = `${params.substring(start, end)}\n`;
      }
      newParamsName += tempStr; // 最终拼成的字符串
    }
  } else {
    // 将旧标签的值赋给新标签
    newParamsName = params;
  }
  // 将最终的字符串返回
  return newParamsName;
}
