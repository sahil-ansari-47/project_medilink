"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@components/Header";
import Nav from "@components/Nav";
import Footer from "@components/Footer";

const hideOn = ["/profile", "/settings"];

export default function PrivateLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const shouldHide = hideOn.some((hidePath) => pathname.startsWith(hidePath));

  if (status === "loading") return null;
  return (
    <>
      {!shouldHide && (
        <>
          <Header />
          <Nav />
        </>
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname} // important: key must be pathname
          initial={pathname === "/profile" ? { x: 1000, opacity: 0 } : {}}
          animate={pathname === "/profile" ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <main>{children}</main>
        </motion.div>
      </AnimatePresence>
      {!shouldHide && <Footer />}
    </>
  );
}
