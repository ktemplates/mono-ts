export const byDefault = <T>(defaults: T, partial: Partial<T>) => {
  return Object.assign(defaults, partial);
};

export const getOrElse = <T extends string>(defaults: T, elses: T) => {
  if (defaults === "") return elses;
  else return defaults;
};
