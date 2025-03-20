import { Client } from "undici";
import User from "../db/models/user";
import {
  PunchInOutResponse,
  RefreshTokenResponse,
} from "../types/punch-in-out.types";
import { loginToZingHr } from "./login.service";

const client = new Client("https://mservices.zinghr.com");

export async function punchInOutAll() {
  const user = await User.findAll({
    attributes: ["id", "emp_code", "password", "jwt_token", "auth_token"],
  });
  user.forEach((user) => {
    punchInOut(user);
  });
}

async function punchInOut(user: User) {
  const body = JSON.stringify({
    latitude: 11.0424717,
    longitude: 77.0342519,
    location: "",
    formattedAddress: "",
    deviceID: "",
    applicationVersion: "",
    isRequestFromMobile: false,
  });

  const { statusCode, body: responseBody } = await client.request({
    method: "POST",
    path: "/tna/api/v2/PunchIn/PunchInPunchOut",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.jwt_token}`,
    },
    body,
  });

  if (statusCode === 200) {
    const response = (await responseBody.json()) as PunchInOutResponse;
    console.log(user.emp_code, response.message);
  } else if (statusCode === 401) {
    getRefreshToken(user);
  } else {
    console.error(user.emp_code, "Error in punch In/Out", statusCode);
  }
}

export async function getRefreshToken(user: User) {
  const body = JSON.stringify({
    subscriptionName: "netcongrp",
    authToken: user.auth_token,
  });

  const { statusCode, body: responseBody } = await client.request({
    method: "POST",
    path: "/zingauth/api/Auth/RefreshToken",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (statusCode === 200) {
    const response = (await responseBody.json()) as RefreshTokenResponse;
    if (response.code === 1) {
      const token = response.data.token;
      console.log(user.emp_code, "Got token", token);
      if (token) {
        user.jwt_token = token;
        await user.save();
        punchInOut(user);
      }
    } else {
      loginToZingHr(user);
    }
  } else if (statusCode === 400) {
    loginToZingHr(user);
  } else {
    console.log(user.emp_code, "Error in getting refresh token", statusCode);
  }
}
