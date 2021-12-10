export const enumToString = <T>(value: T): string =>
  Object.keys(value)
    .map((_value) => value[_value])
    .join(' | ');
