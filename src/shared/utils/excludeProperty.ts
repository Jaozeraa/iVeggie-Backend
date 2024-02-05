const excludeProperty = <T extends object>(entity: T, keys: Array<string>) => {
  return Object.fromEntries(
    Object.entries(entity).filter(([key]) => !keys.includes(key)),
  );
};

export { excludeProperty };
