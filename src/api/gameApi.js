import axios from "axios";

// 배너 데이터 가져오기
// MainPage에서 사용하며 오늘의 경기 결과를 보여줌
export const getBannerData = async () => {
  try {
    const res = await axios.get(`/api/games/`);
    return res.data;
  } catch (err) {
    console.log("bannerApi.js : getBannerData -err", err);
    return [];
  }
};
