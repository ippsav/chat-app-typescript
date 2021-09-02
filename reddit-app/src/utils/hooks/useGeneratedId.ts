import { useMemo } from "react";

let seed = 0;

const useGeneratedId = () => {
  const id = useMemo(() => `id-${seed++}`, []);
  return (suffix: string) => `${suffix}-${id}`;
};

export default useGeneratedId;
