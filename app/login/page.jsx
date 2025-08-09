"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary to-emerald-950">
      <div className="relative w-[min(75vw,350px)] aspect-square mb-4">
        <Image
          className="animate-pulse scale-[0.9] drop-shadow-2xl drop-shadow-zinc-800"
          src="/assets/Logo.png"
          alt="Logo"
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          priority
        />
      </div>
    
      <h1 className="mb-4 text-[clamp(2rem,5vw,4rem)] w-10/12 bg-gradient-to-r from-orange-500 via-white to-green-600 font-extrabold text-center text-transparent bg-clip-text drop-shadow-2xl drop-shadow-zinc-800 animate-pulse">
        "The One Stop Destination to all your medical needs!"
      </h1>
      <button className="m-8" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
