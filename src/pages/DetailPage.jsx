import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import css from "./DetailPage.module.css";
import { formatCreatedAt } from "@/utils/features";

const DetailPage = () => {
  // 게시글 상세 데이터 가져오기
  const post = useLoaderData();

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <main>
      <div className={css.mainContainer}>
        {/* 상세보기 버튼 */}
        <Link to={"/board"}>
          <button className={css.backBtn}>
            <i className="bi bi-chevron-left"></i>
            <span className={css.btnText}>목록으로</span>
          </button>
        </Link>

<div className={css.postContainer}>
        {/* 게시글 헤더 */}
        <div className={css.header}>
          <h3>{post.title}</h3>

          <div className={css.metaInfo}>
            <div>
              <p>{post.author}</p>
              <p>•</p>
              <p>{formatCreatedAt(post.createdAt)}</p>
            </div>

            <div>
              <i className="bi bi-eye"></i>
              <p>{post.views}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className={css.content}>{post.content}</div>
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
