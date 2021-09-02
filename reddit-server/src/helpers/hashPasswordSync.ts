import { hashSync, genSaltSync } from "bcrypt";

const hashPasswordSync = (passwordToHash: string): string =>
  hashSync(passwordToHash, genSaltSync(12));

export default hashPasswordSync;
