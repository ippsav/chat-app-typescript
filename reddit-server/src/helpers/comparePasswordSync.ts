import { compareSync } from "bcrypt";

const comparePasswordSync = (password: string, passwordHash: string): boolean =>
  compareSync(password, passwordHash);

export default comparePasswordSync;
