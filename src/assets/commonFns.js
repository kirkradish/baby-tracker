import { NOTES_DATA, BOTTLES_DATA } from "./data/pageutils";

export const grabParentFromUrl = () => window.location.href.split('/')[3];

export const randomFourDigitId = () => Math.floor(1000 + Math.random() * 9000);

export const dateSlashFormatter = (date) => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

export const dateSorter = (objArr) => objArr.sort((a, b) => new Date(b.date) - new Date(a.date));

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