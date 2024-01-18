import { Cookies } from "react-cookie";

import { jwtDecode } from "jwt-decode";
const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  cookies.remove(name);
};

export const setAccessToken = (token: string) => {
  removeAccessToken();
  localStorage.setItem("accessToken", token);
};

export const setRefreshToken = (token: string) => {
  removeRefreshToken();
  setCookie("refreshToken", token, { path: "/" });
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const getRefreshToken = () => {
  const refreshToken = getCookie("refreshToken");
  return refreshToken;
};

export const getUserId = () => {
  const userId = Number(localStorage.getItem("userId"));
  return userId;
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export const removeRefreshToken = () => {
  removeCookie("refreshToken");
};

interface DecodedToken {
  exp: number;
}

export const getTokenExpiration = (tokenName: string) => {
  const token = tokenName === "refreshToken" ? getRefreshToken() : tokenName === "accessToken" ? getAccessToken() : null;
  let expirationTime = new Date();

  if (token) {
    try {
      
      const decoded = jwtDecode(token) as DecodedToken;
      console.log(decoded);

      if (decoded && decoded.exp) {
        expirationTime = new Date(decoded.exp * 1000);
        console.log(`${tokenName} 만료시간:`, expirationTime);
        const offset = 9 * 60;
        expirationTime.setMinutes(expirationTime.getMinutes() + offset);
        console.log(`${tokenName} 만료시간:`, expirationTime.toISOString());
      } else {
        console.log("잘못된 토큰.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("잘못된 토큰:", err.message);
      } else {
        console.log("알수없는 에러");
      }
    }
  }else {
    console.log(`${tokenName} 없음.`);
  }
  tokenName === "refreshToken"
    ? setCookie("refreshTokenExpire", expirationTime.toISOString(), { path: "/" })
    : tokenName === "accessToken"
    ? localStorage.setItem("accessTokenExpire", expirationTime.toISOString())
    : null;
};



