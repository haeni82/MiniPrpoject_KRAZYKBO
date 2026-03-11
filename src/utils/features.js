// 여러 기능들을 담은 함수

// 2025-08-05 로 오는 데이터를 2025.08.05 (화)로 매핑해줌
export function formatDate(dateString) {
  // 입력: "2025-08-05"
  const date = new Date(dateString);

  if (isNaN(date)) return ""; // 날짜 형식이 잘못되었을 때 방어코드

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // 요일 매핑
  const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = WEEK[date.getDay()];

  return `${year}.${month}.${day}(${weekday})`;
}

// utils/timeAgo.js
export function timeAgo(isoString) {
  const now = new Date();
  const past = new Date(isoString);
  const diff = (now - past) / 1000; // 초(sec) 차이

  if (diff < 60) return "방금 전";               // 1분 미만
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`; // 1시간 미만
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`; // 24시간 미만

  const days = Math.floor(diff / 86400);
  if (days < 7) return `${days}일 전`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}주 전`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}개월 전`;

  const years = Math.floor(days / 365);
  return `${years}년 전`;
}

// utils/formatCreatedAt.js
export function formatCreatedAt(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

