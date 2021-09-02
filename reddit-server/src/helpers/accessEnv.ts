const cache: { [key: string]: any } = {};

const accessEnv = <T>(key: string, defaultValue?: T) => {
  if (!(key in process.env)) {
    if (!defaultValue) throw new Error(`Key ${key} not found in env`);
    return defaultValue;
  }
  if (!(key in cache)) cache[key] = process.env[key];
  return <T>cache[key];
};

export default accessEnv;
