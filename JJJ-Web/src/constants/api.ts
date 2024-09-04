//# 헤더 생성 함수 정의
export const authorizationHeader = (accessToken: string) => {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};

export const multipartHeader = () => {
  return { headers: { 'Content-Type': 'multipart/form-data' } };
};

//# Base URL 설정
const HOST = 'http://localhost:4040/api/v1';

//# URL 엔드포인트 정의
export const SIGN_UP_URL = `${HOST}auth/sign-up`;
export const SIGN_IN_URL = `${HOST}auth/sign-in`;

//# Json-Server API_URL (MOCK DATA)
export const LOCALHOST_PORT = 'http://localhost:5005';
