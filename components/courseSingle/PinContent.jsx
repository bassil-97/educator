"use client";

import React, { useState, useEffect } from "react";
import { useContextElement } from "@/context/Context";
import ModalVideoComponent from "../common/ModalVideo";
import Image from "next/image";
export default function PinContent({ pageItem, userCourses }) {
  const { isAddedToCartCourses, addCourseToCart } = useContextElement();
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window?.innerWidth);
  // useEffect hook to update the screen width when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        id="js-pin-content"
        style={
          screenWidth < 991
            ? { height: "fit-content", left: "0%" }
            : { height: "100%", left: "0px", paddingTop: "80px", position: "absolute" }
        }
        className="courses-single-info js-pin-content"
      >
        <div
          style={{ position: "sticky", top: "100px", left: "0px" }}
          className="bg-white shadow-2 rounded-8 border-light py-10 px-10"
        >
          <div className="relative">
            <Image
              width={368}
              height={238}
              className="w-1/1"
              src={pageItem.imageSrc}
              alt="image"
            />
            <div className="absolute-full-center d-flex justify-center items-center">
              <div
                onClick={() => setIsOpen(true)}
                className="d-flex justify-center items-center size-60 rounded-full bg-white js-gallery cursor"
                data-gallery="gallery1"
              >
                <div className="icon-play text-18"></div>
              </div>
            </div>
          </div>

          <div className="courses-single-info__content scroll-bar-1 pt-30 pb-20 px-20">
            <div className="d-flex justify-between items-center mb-30">
              {pageItem.paid ? (
                <>
                  <div className="text-24 lh-1 text-dark-1 fw-500">
                    ${pageItem.discountedPrice}
                  </div>
                  <div className="lh-1 line-through">
                    ${pageItem.originalPrice}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-24 lh-1 text-dark-1 fw-500">Free</div>
                  <div></div>
                </>
              )}
            </div>

            {!userCourses?.includes(pageItem.id) && <>
              <button
              className="button -md -purple-1 text-white w-1/1"
              onClick={() => addCourseToCart(pageItem.id)}
            >
              {isAddedToCartCourses(pageItem.id)
                ? "Already Added"
                : "Add To Cart"}
            </button>
            <button className="button -md -outline-dark-1 text-dark-1 w-1/1 mt-10">
              Buy Now
            </button>
            </>}

            {/* <div className="text-14 lh-1 text-center mt-30">
              30-Day Money-Back Guarantee
            </div> */}

            <div className="mt-25">
              <div className="d-flex justify-between py-8 ">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-video-file"></div>
                  <div className="mr-10">عدد الفيديوهات</div>
                </div>
                <div>10</div>
              </div>

              {/* <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-puzzle"></div>
                  <div className="ml-10">Quizzes</div>
                </div>
                <div>3</div>
              </div> */}

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-clock-2"></div>
                  <div className="mr-10">المدة</div>
                </div>
                <div>3 ساعات و 16 دقيقة</div>
              </div>

              {/* <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-bar-chart-2"></div>
                  <div className="ml-10">Skill level</div>
                </div>
                <div>Beginner</div>
              </div> */}

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-translate"></div>
                  <div className="mr-10">اللغة</div>
                </div>
                <div>العربية</div>
              </div>

              {/* <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-badge"></div>
                  <div className="ml-10">Certificate</div>
                </div>
                <div>Yes</div>
              </div> */}

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-infinity"></div>
                  <div className="mr-10">الوصول الكامل مدى الحياة للمحتوى</div>
                </div>
                <div>نعم</div>
              </div>
            </div>

            <div className="d-flex justify-center pt-15">
              <a
                href="#"
                className="d-flex justify-center items-center size-40 rounded-full"
              >
                <i className="fa fa-facebook"></i>
              </a>

              <a
                href="#"
                className="d-flex justify-center items-center size-40 rounded-full"
              >
                <i className="fa fa-twitter"></i>
              </a>

              <a
                href="#"
                className="d-flex justify-center items-center size-40 rounded-full"
              >
                <i className="fa fa-instagram"></i>
              </a>

              <a
                href="#"
                className="d-flex justify-center items-center size-40 rounded-full"
              >
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ModalVideoComponent
        videoId={"pL5VWAW6OIE"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
