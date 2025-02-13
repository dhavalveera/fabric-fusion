export const getInitials = (name: string = ""): string =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map(v => v && v[0].toUpperCase())
    .join("");
