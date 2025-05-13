import argon2 from "argon2";

const hash = async(password: string ): Promise<string> => {
  const options = {
    type: argon2.argon2id,
    memorycost: 2 ** 18,
    timecost: 4,
    hashLength: 64,
    saltLength: 16,
    parallelism: 2,
  }

  const hashedPass = await argon2.hash(password, options);
  return hashedPass;
}

const verifyHash = async(hashedPass: string, pass: string): Promise<boolean> =>{
  const isValid = await argon2.verify(hashedPass, pass);
  return isValid
}

export { verifyHash, hash };