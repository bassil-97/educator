
"use client"
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import CourseListOne from '@/components/courseList/CourseListOne'
import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import React, { useEffect } from 'react';
import Cookies from "universal-cookie";
import { useRouter } from 'next/navigation';

export const metadata = {
  title: 'Couese-list-1 || Educrat - Professional LMS Online Education Course NextJS Template',
  description:
    'Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.',
  
}

export default function page() {

  const router = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  useEffect(() => {
    if(!token) return router.push("/login");
  }, []);

  return (
    <div className="main-content  ">
    <Preloader/>
        <Header/>
        <div className="content-wrapper  js-content-wrapper overflow-hidden">
            <PageLinks/>
            <CourseListOne/>
            <FooterOne/>
        </div>
    </div>
  )
}
