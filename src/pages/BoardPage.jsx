import React, { useState } from "react";
import css from "./BoardPage.module.css";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import PostItem from "@/components/PostItem";
import CategoryButton from "@/components/CategoryButton";
import SortItem from "@/components/SortItem";
import Pagination from "@/components/Pagination";

const BoardPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [searchParams] = useSearchParams(); // url 파라미터 관리
  const [isDown, setIsDown] = useState(false); // 정렬 드롭다운 상태 관리

  // 게시글 데이터 가져오기
  const initPostsData = useLoaderData();
  const currentCategory = searchParams.get("category");
  const sortCase = searchParams.get("_sort");

  const data = initPostsData.posts.data;
  const { per_page } = initPostsData;

  const handleCategoryFilter = (category) => {
    const params = new URLSearchParams(searchParams); // 현재 파라미터 정보 유지
    params.set("_page", 1); // 페이지를 1로 초기화
    params.set("_per_page", per_page); // 페이지당 상품 수를 설정
    category ? params.set("category", category) : params.delete("category"); // 카테고리 필터링
    navigate(`/board/?${params}`); // URL 변경
  };

  const handleSort = (sortOption) => {
    const params = new URLSearchParams(searchParams);
    params.set("_page", 1);
    params.set("_sort", sortOption);
    setIsDown(false);
    navigate(`/board/?${params}`);
  };

  const sortTextMap = {
    "-createdAt": "최신순",
    "-likes": "인기순",
    "-comments": "댓글 많은순",
  };

  const getSortText = () => {
    return sortTextMap[sortCase] || "최신순";
  };

  const sortOptions = [
    { option: "-createdAt", label: "최신순" },
    { option: "-likes", label: "인기순" },
    { option: "-comments", label: "댓글 많은순" },
  ];

  const categories = [
    { id: "", label: "전체" },
    { id: "new", label: "새싹 게시판" },
    { id: "old", label: "베테랑 게시판" },
    { id: "free", label: "자유 게시판" },
    { id: "today", label: "오늘의 경기 게시판" },
  ];

  return (
    <main>
      <div className={css.mainContainer}>
        <div className={css.header}>
          <h3>게시판</h3>
          <p>야구에 대한 모든 이야기를 나누세요</p>

          {/* 필터(카테고리) 및 정렬 영역 */}
          <div className={css.filter}>
            {/* 카테고리 버튼 */}
            <div className={css.category}>
              {categories.map((cate) => (
                <CategoryButton
                  key={cate.id}
                  cate={cate.id}
                  label={cate.label}
                  handleCategoryFilter={handleCategoryFilter}
                  currentCategory={
                    currentCategory === null && cate.id === ""
                      ? null
                      : currentCategory
                  }
                />
              ))}
            </div>

            {/* 정렬 드롭다운 */}
            <div className={`${css.sort} ${isDown ? css.active : ""}`}>
              <button
                onClick={() => setIsDown(!isDown)}
                className={css.sortHeader}
              >
                {getSortText()}
                <i>{isDown ? "▲" : "▼"}</i>
              </button>
              {isDown && (
                <ul>
                  {sortOptions.map((sortOpt) => (
                    <SortItem
                      key={sortOpt.option}
                      option={sortOpt.option}
                      handleSort={handleSort}
                      currentSort={sortCase}
                      label={sortOpt.label}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* 게시글 리스트 */}
          <div className={css.postList}>
            {data.length === 0 ? (
              <p>게시글이 없습니다.</p>
            ) : (
              <>
                <div className={css.list}>
                  {data.map((post) => (
                    <PostItem key={post.id} data={post}></PostItem>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <Pagination initPostsData={initPostsData}></Pagination>
      </div>
    </main>
  );
};

export default BoardPage;
