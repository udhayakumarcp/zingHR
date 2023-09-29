import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const secretKey = "12345678901234567890123456789012";
const algorithm = "aes-256-cbc";

export function encryptPassword(password: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, Buffer.from(secretKey), iv);

  let encrypted = cipher.update(password, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

export function decryptPassword(encryptedPassword: string): string {
  const [ivHex, encryptedHex] = encryptedPassword.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv(algorithm, Buffer.from(secretKey), iv);

  let decrypted = decipher.update(encryptedHex, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
}
