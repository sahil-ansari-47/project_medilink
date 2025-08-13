"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const { data: session } = useSession();
  useEffect(() => {
    if(session){
      router.push('/');
    }
  })
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary to-emerald-950">
      <div className="relative w-[min(75vw,350px)] aspect-square mb-4">
        <Image
          className="animate-pulse scale-[0.9] drop-shadow-2xl drop-shadow-zinc-800"
          src="/assets/Logo.png"
          alt="Logo"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>

      <h1 className="mb-4 text-[clamp(2rem,5vw,4rem)] w-10/12 bg-gradient-to-r from-orange-500 via-white to-green-600 font-extrabold text-center text-transparent bg-clip-text drop-shadow-2xl drop-shadow-zinc-800 animate-pulse">
        "The One Stop Destination to all your medical needs!"
      </h1>
      <div className="w-[171px] h-[40px] m-8 bg-white rounded-2xl transform hover:bg-gray-200 active:translate-y-1 transition-all duration-200 ease-in-out shadow-md shadow-zinc-800 hover:shadow-lg">
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              className="cursor-pointer w-full h-full p-2 px-4"
              key={provider.name}
              onClick={() => {
                signIn(provider.id);
              }}
            >
              Sign in with {provider.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Login;
