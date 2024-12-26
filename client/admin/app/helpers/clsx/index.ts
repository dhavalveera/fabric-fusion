export const clsx = (classNamesList: Array<string>): string => {
  var i = 0,
    tmp: string = "",
    str = "",
    len = classNamesList.length;

  for (; i < len; i++) {
    if ((tmp = classNamesList[i])) {
      if (typeof tmp === "string") {
        str += (str && " ") + tmp;
      }
    }
  }
  return str;
};
