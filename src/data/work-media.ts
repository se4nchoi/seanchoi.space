import type { AppLocale } from "@/i18n/config";

export interface WorkMedia {
  src: string;
  width: number;
  height: number;
  alt: Record<AppLocale, string>;
  caption: Record<AppLocale, string>;
}

// Sean approved these three supplied assets for public use on 2026-09-21.
// Screenshots document the interface, not sole ownership or every feature.
export const workMedia: Record<string, WorkMedia> = {
  "evidence-item-ruta40": {
    src: "/work/ruta40-app.jpg",
    width: 1962,
    height: 711,
    alt: {
      en: "Five RUTA40 mobile app screens: welcome, sign-in, vehicle registration, charging map, and settings.",
      ko: "RUTA40 앱의 시작, 로그인, 차량 등록, 충전소 지도, 설정 화면 다섯 개.",
    },
    caption: {
      en: "RUTA40 app screens",
      ko: "RUTA40 앱 화면",
    },
  },
  "evidence-item-hoek-immersion": {
    src: "/work/molipdo.png",
    width: 800,
    height: 444,
    alt: {
      en: "몰입도 sign-in screen with an illustrated character on a boat.",
      ko: "배 위의 캐릭터 일러스트가 있는 몰입도 로그인 화면.",
    },
    caption: {
      en: "Sign-in screen",
      ko: "로그인 화면",
    },
  },
  // From the in-class implementation exercises, not the PLC/robot-cell exercise.
  "project-training-exercises": {
    src: "/work/plc-wiring.jpg",
    width: 1080,
    height: 1165,
    alt: {
      en: "PLC wiring exercise on a wooden board, with relays, terminals, and start/stop buttons.",
      ko: "나무판에 PLC, 릴레이, 단자대, 시작·정지 버튼을 배선한 실습 작업.",
    },
    caption: {
      en: "PLC wiring exercise",
      ko: "PLC 배선 실습",
    },
  },
};
