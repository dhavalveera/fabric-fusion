import dayjs from "dayjs";

type GetTimeProps = { time: string };

export const getFormattedDate = ({ time }: GetTimeProps): string => {
  return dayjs(time).format("DD-MMM-YYYY hh:mm A");
};

export const getCurrentTime = (): string => {
  return dayjs(new Date()).format("HH");
};
