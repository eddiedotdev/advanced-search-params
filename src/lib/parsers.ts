export interface ParserOptions<T> {
  defaultValue?: T;
  validate?: (value: T) => boolean;
}

export interface Parser<T> {
  parse: (value: string) => T | undefined;
  serialize: (value: T) => string;
  validate?: (value: T) => boolean;
}

// Date Parsers
export function parseAsTimestamp(options: ParserOptions<number> = {}) {
  return {
    parse: (value: string) => {
      const num = Number(value);
      if (isNaN(num)) return options.defaultValue;
      return num;
    },
    serialize: (value: number) => value.toString(),
    validate: options.validate,
  };
}

export function parseAsIsoDateTime(options: ParserOptions<Date> = {}) {
  return {
    parse: (value: string) => {
      const date = new Date(value);
      return isNaN(date.getTime()) ? options.defaultValue : date;
    },
    serialize: (value: Date) => value.toISOString(),
    validate: options.validate,
  };
}

// Enum Parser
export function parseAsStringEnum<T extends string>(
  enumValues: readonly T[],
  options: ParserOptions<T> = {}
) {
  return {
    parse: (value: string) => {
      return enumValues.includes(value as T)
        ? (value as T)
        : options.defaultValue;
    },
    serialize: (value: T) => value,
    validate: options.validate ?? ((value: T) => enumValues.includes(value)),
  };
}

// Number Parser with Range
export function parseAsNumber(
  options: ParserOptions<number> & {
    min?: number;
    max?: number;
  } = {}
) {
  return {
    parse: (value: string) => {
      const num = Number(value);
      if (isNaN(num)) return options.defaultValue;
      if (options.min !== undefined && num < options.min) return options.min;
      if (options.max !== undefined && num > options.max) return options.max;
      return num;
    },
    serialize: (value: number) => value.toString(),
    validate: options.validate,
  };
}

// Boolean Parser
export function parseAsBoolean(options: ParserOptions<boolean> = {}) {
  return {
    parse: (value: string) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return options.defaultValue;
    },
    serialize: (value: boolean) => value.toString(),
    validate: options.validate,
  };
}
