import Link from "next/link";
import React, { Children, useEffect, useState } from "react";
import Image from "next/image";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { stylePopup } from "../store/popupSlice.reducer";

const Layout = ({ children }) => {
  const { popupStatus } = useSelector((state) => state.popupInfo);
  const [popupState, setPopupState] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!popupStatus) {
      setTimeout(() => {
        setPopupState(null);
      }, 600);
    } else {
      setPopupState(<Popup />);
      setTimeout(() => {
        dispatch(stylePopup());
      }, 100);
    }
  }, [popupStatus]);

  console.log();

  return (
    <React.Fragment>
      <div className={popupStatus ? "grey grey--active" : "grey"}></div>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <ul className="header-top__list">
              <li className="header-top__item">
                <Link href="/api_page">
                  <a href="">API</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <nav className="menu">
            <Link href="/">
              <a className="logo" href="">
                <Image src="/logo.svg" alt="Logo" width={80} height={60} />
                PET BOX
              </a>
            </Link>
            <ul className="menu__list">
              <li className="menu__item">
                <Link href="/">
                  <a href="">В разработке...</a>
                </Link>
              </li>
              <li className="menu__item">
                <Link href="/">
                  <a href="">В разработке...</a>
                </Link>
              </li>
              <li className="menu__item">
                <Link href="/">
                  <a href="">В разработке...</a>
                </Link>
              </li>
              <li className="menu__item menu__item--user">
                <Link href="/authorization/registration">
                  <a href="">
                    <Image
                      src="/User.svg"
                      alt="User Cabinet"
                      height={40}
                      width={40}
                    />
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {popupState}
      <main className="main__theme">{children}</main>
      <footer></footer>
    </React.Fragment>
  );
};

export default Layout;
