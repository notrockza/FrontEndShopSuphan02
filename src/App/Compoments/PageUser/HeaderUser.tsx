import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { Register } from "../../Model/Account";
import { useAppSelector } from "../../Stone/configureStore";
import { UserMenu } from "./UserMenu";
import {SearchOutlined} from '@ant-design/icons';

function HeaderUser() {

  return (
    <Fragment>
      <div
        id="sticky-header"
        className="main-header menu-area transparent-header"
      >
        <div className="container-fluid container-full">
          <div className="row">
            <div className="col-12">
              <div className="mobile-nav-toggler">
                <i className="fas fa-bars"></i>
              </div>
              <div className="menu-wrap">
                <div
                  className="header-bg"
                  style={{
                    backgroundImage: `url("https://drive.google.com/uc?id=18Cn8mroAMtGi3aQcVTn7Xz8QMZ8b1i9-")`,
                  }}
                ></div>
                <nav className="menu-nav show">
                  <div className="logo">
                    <Link to="/">
                      <img
                        src="https://drive.google.com/uc?id=1DHaW3RxnuK9ftbDwb1dMQMXhF15RAxEm"
                        alt="Logo"
                      />
                    </Link>
                  </div>

                  <UserMenu />
                </nav>
              </div>
              <div className="header-bottom-wrap d-none d-lg-flex">
                <div className="header-tag-list">
                  <ul>
                    {/* <li>
                      <a href="/login">เข้าสู่ระบบ</a>
                    </li> */}
                    <li>
                      <Link to="#">บัญชี</Link>
                    </li>
                    <li>
                      <Link to="#">รายการสั่งซื้อ</Link>
                    </li>
                  </ul>
                </div>
                <div className="header-bottom-search">
                  <form action="#">
                    <input type="text" />
                    <button>
                      {/* <i className="fas fa-search"></i> */}
                      <SearchOutlined />
                    </button>
                  </form>
                </div>
              </div>
              <div className="mobile-menu">
                <div className="menu-backdrop"></div>
                <div className="close-btn">
                  <i className="fas fa-times"></i>
                </div>

                <nav className="menu-box">
                  <div className="nav-logo">
                    <Link to="index.html">
                      <img
                        // src="./src/assets/img/logo/w_logo.png"
                        alt=""
                        title=""
                      />
                    </Link>
                  </div>
                  <div className="menu-outer"></div>
                  <div className="social-links">
                    <ul className="clearfix">
                      <li>
                        <Link to="#">
                          <span className="fab fa-twitter"></span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="fab fa-facebook-square"></span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="fab fa-pinterest-p"></span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="fab fa-instagram"></span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="fab fa-youtube"></span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HeaderUser;