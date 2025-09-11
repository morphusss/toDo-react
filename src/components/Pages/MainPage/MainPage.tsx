import { MainPageBody } from "@components/MainPageBody";
import { Header } from "@components/Header";
import MobileLightBg from "@images/bg-mobile-light.jpg";
import MobileDarkBg from "@images/bg-mobile-dark.jpg";
import DesktopLightBg from "@images/bg-desktop-light.jpg";
import DesktopDarkBg from "@images/bg-desktop-dark.jpg";
import useScreeSize from "@src/hooks/useScreenSize/useScreenSize";
import verifyTheme from "@utils/themeVerification";

export function MainPage() {
  function handleImageWidth() {
    const screenSize = useScreeSize();
    if (screenSize.width < 768) {
      return verifyTheme() ? MobileDarkBg : MobileLightBg;
    } else {
      return verifyTheme() ? DesktopDarkBg : DesktopLightBg;
    }
  }

  return (
    <>
      <section
        className={`${
          verifyTheme() ? "dark" : ""
        } w-screen h-screen bg-gray-100 dark:bg-[#161722] flex flex-col 
          justify-between items-center relative pl-5 pr-5 pt-9 pb-5 lg:pt-18 select-none`}
      >
        <img
          src={handleImageWidth()}
          alt="background image"
          className="w-full h-fit max-h-1/3 absolute top-0 z-0"
        />
        <section className="w-full h-1/5 z-10 md:w-[50%] lg:w-[35%]">
          <Header />
        </section>
        <section className="w-full h-4/5 z-10 md:w-[50%] lg:w-[35%]">
          <MainPageBody />
        </section>
      </section>
    </>
  );
}
