import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  const handleRightClick = (event: any) => {
    event.preventDefault();
  };

  const disbaleBackButton = () => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  };

  useEffect(() => {
    if (process.env["NODE_ENV"] === "production") {
      window.addEventListener("contextmenu", handleRightClick);
      disbaleBackButton();
      return () => {
        window.removeEventListener("contextmenu", handleRightClick);
      };
    }
  }, [router]);

  return (
    <SessionProvider session={session}>
      <ToastContainer />
      {/* <Navbar /> */}
      <Component {...pageProps} />
      <Navbar />
    </SessionProvider>
  );
}
