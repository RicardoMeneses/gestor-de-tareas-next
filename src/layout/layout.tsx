import { AppProps } from "next/app";
import Header from "./Header";

export default function withLayout({ children }: any) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
