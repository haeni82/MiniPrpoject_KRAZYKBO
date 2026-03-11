import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  // 반응형으로 만들기 위해
  const [isOn, setIsOn] = useState(false);
  // 로고를 누르면 메인 페이지로 이동하기 위해
  const location = useLocation();

  const addClassOn = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOn(false);
  }, [location.pathname]);

  return (
    <header className={css.hd}>
      <div className={css.con}>
        <div className={css.logo}>
          <Link to={"/"} className={css.logoLink}>
            <img
              src={`/public/img/Logo.png`}
              alt="Logo"
              className={css.logoImage}
            />
            <h2 className={css.logoTitle}>KRAZY KBO</h2>
          </Link>
        </div>
        <div className={isOn ? `${css.gnb} ${css.on}` : css.gnb}>
          <nav>
            <CustomNavLink to={"/board"} label={"Board"} />
            <CustomNavLink to={"/myTeam"} label={"My Team"} />
            <CustomNavLink to={"/schedule"} label={"Schedule"} />
            <CustomNavLink to={"/marketPlace"} label={"MarketPlace"} />
          </nav>
        </div>
        <i
          className={`${css.ham} bi bi-list`}
          title="전체메뉴 보기버튼"
          onClick={addClassOn}
        ></i>
      </div>
    </header>
  );
};

const CustomNavLink = ({ to, label }) => (
  <NavLink
    className={({ isActive }) => (isActive ? `${css.active}` : "")}
    to={to}
  >
    {label}
  </NavLink>
);

export default Header;
