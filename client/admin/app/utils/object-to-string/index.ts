type ObjectProps = {
  [key: string]: string | boolean | number | Date;
};

const objectsToArray = (object: ObjectProps): Array<string> => {
  let result: Array<string> = [];

  Object.values(object).forEach(value => {
    if (typeof value === "string") {
      result = [...result, value];
    } else if (value instanceof Date) {
      // Handle Date type - Convert it to string (ISO format or custom format)
      result.push(value.toISOString()); // Or value.toString() if you prefer the default Date string
    } else if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      result = [...result, ...objectsToArray(value as ObjectProps)];
    }

    return undefined;
  });

  return result;
};

export const objectToString = (object: ObjectProps): string => {
  return objectsToArray(object).join(" ");
};
