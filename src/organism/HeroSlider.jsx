import React, { useState, useEffect } from "react";
import css from "./HeroSlider.module.css";
import { getBannerData } from "@/api/gameApi";
import { getTeamInfo } from "@/api/teamApi";
import { formatDate } from "@/utils/features";

const HeroSlider = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);

  // 배너 데이터 가져오기
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBannerData();
        setBanners(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // 내 구단이 포함된 경기 우선 정렬
  const myGame = banners.find((g) => g.homeId === id || g.awayId === id);
  const otherGames = banners.filter((g) => g !== myGame);
  const orderedGames = myGame ? [myGame, ...otherGames] : otherGames;

  // 현재 배너
  const currentBanner = orderedGames[currentIndex];

  // currentBanner가 바뀔 때마다 홈/원정 팀 불러오기
  useEffect(() => {
    if (!currentBanner) return;

    const fetchTeams = async () => {
      try {
        const home = await getTeamInfo(currentBanner.homeId);
        const away = await getTeamInfo(currentBanner.awayId);

        setHomeTeam(home);
        setAwayTeam(away);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeams();
  }, [currentBanner]);

  // 로딩 상태일 경우
  if (loading || banners.length === 0) {
    return (
      <section className={css.mainSlider}>
        <p>로딩 중...</p>
      </section>
    );
  }

  return (
    <section className={css.mainSlider}>
      <div
        className={`${css.sliderBody} ${
          currentBanner.isCanceled ? css.canceled : ""
        }`}
      >
        {/* 날짜 표시 */}
        <p className={css.date} style={{ color: "#333" }}>
          {formatDate(currentBanner.date)} 경기
        </p>

        {/* 2. 슬라이드 텍스트 콘텐츠 */}
        <div className={css.sliderContent}>
          {/* 홈 팀 정보 */}
          <div className={css.TeamGroup}>
            <div className={css.logoWrap}>
              <span className={css.Logo}>{homeTeam?.logo}</span>
            </div>
            <span className={css.Name}>{homeTeam?.name}</span>
          </div>

          {/* 점수 */}
          <div className={css.scoreGroup}>
            <div>
              <span className={css.score}>{currentBanner.homeScore}</span>
              <span className={css.score}> : </span>
              <span className={`${css.score} ${css.other}`}>
                {currentBanner.awayScore}
              </span>
            </div>

            <div className={css.isFinished}>경기 종료</div>
          </div>

          {/* 원정 팀 정보 */}
          <div className={css.TeamGroup}>
            <div className={`${css.logoWrap} ${css.away}`}>
              <span className={css.Logo}>{awayTeam?.logo}</span>
            </div>
            <span className={css.Name}>{awayTeam?.name}</span>
          </div>
        </div>

        {/* 상세보기 버튼 */}
        <button className={css.detailBtn}>
          <span className={css.btnText}>상세보기</span>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* 경기 취소 됐을 때 */}
      {currentBanner.isCanceled && (
        <div className={css.canceledText}>경기 취소</div>
      )}

      {/* 3. 인디케이터 */}
      <div className={css.indicatorContainer}>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${css.indicatorButton} ${
              currentIndex === index ? css.active : ""
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
