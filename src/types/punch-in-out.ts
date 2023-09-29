export interface PunchInOutResponse {
  code: 0 | 1;
  data: null | string;
  message: string;
  lastCachedAt: null;
  cachedTill: null;
}

export interface RefreshTokenResponse {
  code: 0 | 1;
  data: {
    token?: string;
    errorMessage?: string;
  };
  message: "Success" | "Fail";
  lastCachedAt: null;
  cachedTill: null;
}
