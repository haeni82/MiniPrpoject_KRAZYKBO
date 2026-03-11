import React from "react";
import css from "./PostItem.module.css";
import { Link } from "react-router-dom";
import { timeAgo } from "@/utils/features";

const PostItem = ({ data }) => {
const categories = [
  { id: "", label: "전체" },
  { id: "new", label: "새싹 게시판" },
  { id: "old", label: "베테랑 게시판" },
  { id: "free", label: "자유 게시판" },
  { id: "today", label: "오늘의 경기" },
];

const categoryMap = categories.reduce((acc, c) => {
  acc[c.id] = c.label;
  return acc;
}, {});

const categoryLabel = categoryMap[data.category] ?? data.category ?? "기타";

  return (
    <Link
      to={`/board/${data.id}`}
      className={css.postLink} // 링크 전체에 스타일 적용
    >
      <div className={css.post}>
        <span className={css.category}>{categoryLabel}</span>
        <span className={css.title}>{data.title}</span>
        <div className={css.postInfo}>
          <span>{data.author}</span>
          <span>{timeAgo(data.createdAt)}</span>
        </div>
        <hr />
        <div className={css.active}>
          <div className={css.group}>
            <i className="bi bi-hand-thumbs-up" style={{color: "#ff2929"}}></i>
            <p>{data.likes}</p>
          </div>
          <div className={css.group}>
            <i className="bi bi-chat-dots" style={{color: "#4220a0"}}></i>
            <p>{data.comments}</p>
          </div>
          <div className={css.group}>
            <i className="bi bi-eye"></i>
            <p>{data.views}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
