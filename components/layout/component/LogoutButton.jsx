import React from 'react';
import Cookies from "universal-cookie";
import { useRouter } from 'next/navigation';


export default function LogoutButton() {

    const cookies = new Cookies();
    const router = useRouter();

    const handleLogout = () => {
        cookies.remove("TOKEN", { path: "/" });
        router.push("/login");
    };

  return (
    <button className='mr-30' onClick={handleLogout}>
        <img width="48" height="48" src="https://img.icons8.com/color/48/exit.png" alt="exit"/>
    </button>
  )
}
