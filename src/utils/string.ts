export const capitalized = <T extends string>(str: T) => {
  if (!str) return '';
  const capitalizedString = str.charAt(0).toUpperCase() + str.slice(1) as Capitalize<T>;
  return capitalizedString;
};