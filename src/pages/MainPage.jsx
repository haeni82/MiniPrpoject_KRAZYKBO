import React, { useEffect, useState } from "react";
import css from "./MainPage.module.css";
import { getUserTeam } from "@/api/userApi";
import { Link, useLocation } from "react-router-dom";
import { getTeamInfo } from "@/api/teamApi";
import HeroSlider from "@/organism/HeroSlider";
import { getTopPost } from "@/api/postApi";
import PostItem from "@/components/PostItem";

const MainPage = () => {
  // 상태: 나의 구단을 선택하였는지
  const [myTeam, setMyTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [topPost, setTopPost] = useState([]);
  const location = useLocation();

  // user가 선택한 구단정보 가져오기
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
      setMyTeam(null);

        // 1) user가 선택한 구단 정보 저장 : team name이거나 ""
        const teamId = await getUserTeam(1);

        // 2) 만약 구단을 선택하지 않았다면 그대로 "" 저장
        if (!teamId) {
          setMyTeam("");
        } else {
          // 3) 만약 구단을 선택했다면 해당 팀 정보 가져오기
          const teamData = await getTeamInfo(teamId);
          setMyTeam(teamData);
        }

        // 1) 인기 게시글 가져오기
        const posts = await getTopPost();
        setTopPost(posts);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadData();
  }, [location.search]); //새로고침해야 반영되는 문제 해결

  if (loading || myTeam === null) {
    return (
      <main className={css.mainContainer}>
        <p className={css.loading}>로딩 중...</p>
      </main>
    );
  }

  return (
    <main className={css.mainContainer}>
      {/* 소개 영역 */}
      <section className={css.introSection}>
        <img src="/public/img/do_ball.png" className={css.introImg}></img>
        <h1 className={css.introTitle}>KRAZY KBO</h1>
        <p className={css.introSubtitle}>KBO 프로야구의 모든 것을 한 곳에서</p>

        {/* 선택한 구단이 있는지 여부에 따라 렌더링 */}
        {myTeam === "" ? (
          // 선택한 구단 없음
          <div className={css.emptyContainer}>
            <Link to={"/team-selection"}>
              <button className={css.emptyBtn}>
                <i className="bi bi-people"></i>
                <p>나의 구단 선택하기</p>
              </button>
            </Link>
          </div>
        ) : (
          // 선택한 구단 있음
          <div className={css.teamContainer}>
            <span className={css.teamIcon}>{myTeam.logo}</span>
            <div className={css.teamGroup}>
              <p>나의 구단</p>
              <h2>{myTeam.name}</h2>
            </div>
          </div>
        )}

        {/* 웹사이트 기능에 대한 정보 */}
        <div className={css.featureContainer}>
          <div className={css.feature}>⚡ 실시간 경기 정보 </div>
          <div className={css.feature}>💬 팬 커뮤니티 </div>
          <div className={css.feature}>📊 상세 통계 </div>
        </div>
      </section>

      {/* 배너 영역 */}
      <HeroSlider id={myTeam.id} />

      {/* 인기글 영역 */}
      <section className={css.hotSection}>
        <div className={css.hotHeader}>
          <div className={css.hotTitle}>
            <div className={css.hotIcon}>
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <span>🔥 실시간 인기글</span>
          </div>

          <div className={css.allGroup}>
            <Link to={"/board"}>
              <button className={css.allBtn}>
                <p>전체보기</p>
                <i className="bi bi-arrow-right"></i>
              </button>
            </Link>
          </div>
        </div>

        {/* 게시글 컴포넌트 */}
        {topPost.length === 0 ? (
          <p className={css.noPost}>게시글이 없습니다.</p>
        ) : (
          <div className={css.postGrid}>
            {topPost.map((post) => (
              <PostItem key={post.id} data={post} />
            ))}
          </div>
        )}
      </section>

      {/* MVP 영역 */}
      {/* 통계 영역 */}
    </main>
  );
};

export default MainPage;
