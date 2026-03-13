import ScrollToTop from "./app/elements/scroll-to-top";
import RootLayout from "./layouts/root-layout";
import Loader from "./app/elements/loader";
import { useState, useEffect } from "react";
// import FloatingSocialButtons from "./app/components/FloatingSocialButtons";

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <ScrollToTop />
      <RootLayout />
      {/* <FloatingSocialButtons/> */}
    </>
  );
}

export default App;
