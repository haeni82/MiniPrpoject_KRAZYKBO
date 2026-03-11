import React from "react";
import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.footContainer}>
        {/* 상단 영역 : 브랜드 정보 & 고객센터 */}
        <div className={css.top}>
          {/* 1. 브랜드 소개 */}
          <div className={css.brand}>
            <h2 className={css.footLogo}>KRAZY KBO</h2>
            <p className={css.desc}>
             KBO 프로야구 팬들을 위한 커뮤니티 플랫폼
            </p>
          </div>

          {/* 2. 고객센터 정보 */}
          <div className={css.contact}>
            <h4>Customer Center</h4>
            <p className={css.phone}>00-0000-0000</p>
            <p className={css.info}>
              평일 10 : 00 - 17 : 00 (주말 / 공휴일 휴무)
              <br />
              help@krazykbo.com
            </p>
          </div>
        </div>

        {/* 하단 영역 : 저작권 & 소셜 아이콘 */}
        <div className={css.bottom}>
          <p className={css.copyright}>
            &copy; {new Date().getFullYear()} 2025 CRAZY KBO. All rights reserved.
          </p>
          <div className={css.socials}>
            <a href="">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="">
              <i className="bi bi-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
