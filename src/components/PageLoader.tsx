import { useEffect } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { useNavigation } from "react-router-dom";

nprogress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 500,
});

const PageLoader = () => {
  const navigation = useNavigation();
  const isTransitioning =
    navigation.state === "loading" || navigation.state === "submitting";

  useEffect(() => {
    // Start the progress bar when the navigation state changes to loading/submitting
    if (isTransitioning) {
      nprogress.start();
    } else {
      // Finish the progress bar when the transition is idle (finished)
      nprogress.done();
    }

    // Cleanup function to ensure it finishes on unmount/re-render
    return () => {
      nprogress.done();
    };
  }, [isTransitioning]);

  return null; // This component doesn't render any visible JSX
};

export default PageLoader;
