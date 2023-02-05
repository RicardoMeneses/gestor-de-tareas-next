import Header from "./Header";
import { GlobalsProvider } from "@/providers/globals";

const withLayout = ({ children }: any) => {
  return (
    <>
      <GlobalsProvider>
        <Header />
        <main>{children}</main>
      </GlobalsProvider>
    </>
  );
};

export default withLayout;
