import axios from 'axios';

export const DateFormateMMMMDDYYY = (value: any) => {
  const date = new Date(value);
  const month = date.toLocaleString('en-GB', {month: 'long'});
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};

export const errorMsgWrap = (error: any) => {
  let errorMessage = 'Unknown error occurred';
  if (axios.isAxiosError(error) && error.response) {
    errorMessage =
      'data' in error
        ? (error.data as {message: string}).message
        : error.message;
    // (errorMessage =
    //   error.response.data.message || 'Error occurred while fetching data');
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  return errorMessage;
};

export const formatMobileNumber = (mobileNumber: any) => {
  const area = String(mobileNumber.area).padStart(3, '0');
  const exchange = String(mobileNumber.exchange).padStart(3, '0');
  const subscriber = String(mobileNumber.subscriber).padStart(4, '0');
  return area + exchange + subscriber;
};

export const deformatMobileNumber = (formattedNumber: string) => {
  const mobileStr = String(formattedNumber).padStart(10, '0');

  const area = mobileStr.slice(0, 3);
  const exchange = mobileStr.slice(3, 6);
  const subscriber = mobileStr.slice(6, 10);

  return {
    area,
    exchange,
    subscriber,
  };
};
