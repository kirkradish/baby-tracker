import { NOTES_DATA, BOTTLES_DATA } from "./data/pageutils";

export const grabParentFromUrl = () => window.location.href.split('/')[3];

export const randomFourDigitId = () => Math.floor(1000 + Math.random() * 9000);

export const dateSlashFormatter = (date) => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

export const dateSorter = (objArr) => objArr.sort((a, b) => new Date(b.date) - new Date(a.date));

// Shorten today's (or user selected) Date object to match dates to show in list
export const cutDateObjToDateOnly = (date) => date.toString().split(' ').splice(1, 3).join(' ');

export const displayFormattedTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export const selectPageTypeData = (page) => {
  let pageData = {};
  switch(page) {
    case 'notes':
      pageData = NOTES_DATA;
      break;
    default:
      pageData = BOTTLES_DATA;
      break;
  }
  return pageData;
}