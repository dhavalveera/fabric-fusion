import dayjs from "dayjs";

export const getCurrentTime = (): string => {
  return dayjs().format("HH");
};

export const getCurrentDateTime = (): string => {
  return dayjs().format("DD-MMM-YYYY hh:mm A");
};
