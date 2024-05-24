export const DateFormateMMMMDDYYY = (value: Date) => {

  const date = new Date(value);
  const month = date.toLocaleString('en-GB', {month: 'long'});
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};
