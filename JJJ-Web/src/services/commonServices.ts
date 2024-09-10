type HasId = { id: string | number };

export const getNextId = <T extends HasId>(array: T[]): string => {
  if (array && array.length > 0) {
    return String(Number(array[array.length - 1].id) + 1);
  }
  return '1';
};
