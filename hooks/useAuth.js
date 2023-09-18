// utils/auth.js

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

export function useAuth() {
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    // Check if the user is authenticated (e.g., by verifying JWT or checking session)
    const isAuthenticated = cookies.get("TOKEN");

    if (!isAuthenticated) {
      // Redirect the user to the login page or a 403 page
      router.push("/login"); // Redirect to your login page
    }
  }, []);

  return true; // You can return user information or other data here if needed
}
