import dayjs from "dayjs";

export const getGreetings = (): string => {
  const hour = Number(dayjs().format("HH"));

  if (hour >= 0 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 16) return "Good Afternoon";
  if (hour >= 16 && hour < 21) return "Good Evening";
  return "Hello";
};
