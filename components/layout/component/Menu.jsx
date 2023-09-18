"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MobileFooter from "./MobileFooter";
import Image from "next/image";
import { menuList } from "@/data/menu";
import Cookies from "universal-cookie";
import { usePathname } from "next/navigation";

export default function Menu({ allClasses, headerPosition }) {
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const pathname = usePathname();
  const cookies = new Cookies();
  const userId = cookies.get("userId");

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split('/')[1]  == pathname.split('/')[1] ) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split('/')[1]  == pathname.split('/')[1] ) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        headerPosition ? headerPosition : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

         <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
          <Link href="/login" className="text-dark-1">
            Log in
          </Link>
          <Link href="/signup" className="text-dark-1 ml-30">
            Sign Up
          </Link>
        </div>

        <div className="menu js-navList">
          <ul className={`${allClasses ? allClasses : ""}`}>
            <li className="menu-item-has-children">
              <Link
                data-barba
                href="/"
                className={menuItem == "Home" ? "activeMenu" : ""}
              >
                الصفحة الرئيسية 
              </Link>
            </li>

            <li className="menu-item-has-children -has-mega-menu">
              <Link
                data-barba
                href="/courses-list-1"
                className={menuItem == "Courses" ? "activeMenu" : ""}
              >
                الكورسات
              </Link>
            </li>

            {/* <li className="menu-item-has-children">
              <Link
                data-barba
                href="#"
                className={menuItem == "Events" ? "activeMenu" : ""}
              >
                Events <i className="icon-chevron-right text-13 ml-10"></i>
              </Link>
              <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link href="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Events
                  </Link>
                </li>

                {menuList[2].links.map((elm, i) => (
                  <li
                    key={i}
                    className={
                      pathname.split('/')[1]  == elm.href.split('/')[1]  ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    <Link data-barba href={elm.href}>
                      {elm.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}

            <li className="menu-item-has-children">
              <Link
                data-barba
                href="/blog-list-1"
                className={menuItem == "Blogs" ? "activeMenu" : ""}
              >
                الكتب
              </Link>
              
            </li>

            <li className="menu-item-has-children">
              <Link
                data-barba
                href="/about-1"
                className={menuItem == "Pages" && pathname == "/about-1" ? "activeMenu" : ""}
              >
                من نحن 
              </Link>
            </li>
            <li>
              <Link data-barba href="/contact-1"  className={
                pathname == "/contact-1" ? "activeMenu" : ""
              }>
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        {/* mobile footer start */}
        <MobileFooter />
        {/* mobile footer end */}
      </div>

      <div
        className="header-menu-close"
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div className="header-menu-bg"></div>
    </div>
  );
}
