import React from "react";
import css from "./TeamCard.module.css";

// 구단 선택할 때 사용하는 카드 컴포넌트
const TeamCard = ({ data, selected, onSelect }) => {
  return (
    // 클릭했을 때 효과를 줄 것
    <div
      onClick={onSelect}
      className={`${css.teamCard} ${selected ? css.selected : ""}`}
      style={{
        background: `linear-gradient(to right, ${data.color_from}, ${data.color_to})`,
      }}
    >
      {/* 체크 표시 (selected일 때만 보여주기) */}
      {selected && (
        <div className={css.checkOverlay}>
          <i className="bi bi-check"></i>
        </div>
      )}
      <h1>{data.logo}</h1>
      <h4>{data.name}</h4>
      <p>{data.stadium}</p>
    </div>
  );
};

export default TeamCard;
