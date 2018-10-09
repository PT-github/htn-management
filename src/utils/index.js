/**
 * @summary 根据时间及格式获取时间的字符串
 * @param {int} iDate 时间
 * @param {string} sFormat 格式，默认：yyyy-MM-dd HH:mm:ss
 * @return {string} 格式化后的日期字符串
 * @example
 *    formatDate(new Date(),'yyyy-MM-dd HH:mm:ss SSS');// 2017-6-6 11:11:11
 */
export const formatDate = (iDate, sFormat = 'yyyy-MM-dd HH:mm:ss') => {
  if (!iDate) { return ''; }
  let dDate = new Date(iDate);
  let year = dDate.getFullYear();// 年
  let month = dDate.getMonth() + 1;// 月
  if (month < 10) { month = '0' + month; }
  let date = dDate.getDate();// 日
  if (date < 10) { date = '0' + date; }
  let hour = dDate.getHours();// 时
  if (hour < 10) { hour = '0' + hour; }
  let minute = dDate.getMinutes();// 分
  if (minute < 10) { minute = '0' + minute; }
  let second = dDate.getSeconds();// 秒
  if (second < 10) { second = '0' + second; }
  let millisecond = dDate.getMilliseconds();// 毫秒
  if (sFormat.indexOf('yyyy') >= 0) { sFormat = sFormat.replace('yyyy', year + ''); }
  if (sFormat.indexOf('MM') >= 0) { sFormat = sFormat.replace('MM', month + ''); }
  if (sFormat.indexOf('dd') >= 0) { sFormat = sFormat.replace('dd', date + ''); }
  if (sFormat.indexOf('HH') >= 0) { sFormat = sFormat.replace('HH', hour + ''); }
  if (sFormat.indexOf('mm') >= 0) { sFormat = sFormat.replace('mm', minute + ''); }
  if (sFormat.indexOf('ss') >= 0) { sFormat = sFormat.replace('ss', second + ''); }
  if (sFormat.indexOf('SSS') >= 0) { sFormat = sFormat.replace('SSS', millisecond + ''); }
  return sFormat;
};