'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    function redirectTologin() {
      router.push('/sign-in')
    }

    redirectTologin();



  },)

  return (
    <h1 className="text-4xl"> </h1>
  );
}
