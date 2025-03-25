import { AES, enc, mode, pad } from "crypto-js";
import { Client } from "undici";
import User from "../db/models/user";
import { decryptPassword } from "./password.service";
import { getRefreshToken } from "./punch-in-out.service";

const client = new Client("https://portal.zinghr.com");

export async function loginToZingHr(user: User) {
  const randomKey =
    (Math.random() + " ").substring(2, 10) +
    (Math.random() + " ").substring(2, 10);

  const decryptedUserPassword = decryptPassword(user.password);

  const password = encryptPassword(randomKey, decryptedUserPassword);

  const body = JSON.stringify({
    SubscriptionName: "netcongrp",
    Empcode: user.emp_code,
    Password: password,
    SyncVal: randomKey,
  });

  const { statusCode, headers } = await client.request({
    method: "POST",
    path: "/2015/route/Auth/Login",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (statusCode === 200) {
    const cookieHeaderValues = headers["set-cookie"];
    if (cookieHeaderValues) {
      for (const cookieHeaderValue of cookieHeaderValues) {
        const matches = cookieHeaderValue.match(/AuthToken=([^;]+)/);
        if (matches && matches[1]) {
          const authTokenValue = matches[1];
          user.auth_token = authTokenValue;
          await user.save();
          getRefreshToken(user);
          break;
        }
      }
    }
  } else {
    console.log("Unable to logIn", statusCode);
  }
}

function encryptPassword(AESEncryptionKey: string, PlainPassword: string) {
  const currentDate = new Date();
  const IVKey =
    (currentDate.getUTCDate() < 10
      ? "0" + currentDate.getUTCDate()
      : currentDate.getUTCDate()) +
    "/" +
    (currentDate.getUTCMonth() + 1 < 10
      ? "0" + (currentDate.getUTCMonth() + 1)
      : currentDate.getUTCMonth() + 1) +
    "/" +
    currentDate.getUTCFullYear() +
    "ZingHR";

  const key = enc.Utf8.parse(AESEncryptionKey);
  const iv = enc.Utf8.parse(IVKey);
  const encryptedPassword = AES.encrypt(enc.Utf8.parse(PlainPassword), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
  return encryptedPassword.toString();
}
