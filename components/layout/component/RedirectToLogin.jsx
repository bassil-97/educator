"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToLogin() {

    const router = useRouter();

    // Redirect the user to the dashboard page after successful login
  useEffect(() => {
    router.push('/login');
  }, []);

  return <div>Redirecting...</div>;
}
