import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// 자동 로그인으로 하려면 로컬스토리지에 저장 휘발되는 데이터를 원하면 세션스토리지
const { persistAtom } = recoilPersist({
  key: "loginUser",
  storage: sessionStorage,
});

export const userState = atom({
  key: "userState",
  default: null,
  effects: [persistAtom], //유저스테이트가 위에 세션에 저장됨
});
