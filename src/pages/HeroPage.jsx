import "../App.css";
import Topbar from "../components/Topbar";
import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import SmartphoneDeals from "../components/SmartphoneDeals";
import TopCategories from "../components/TopCategories";
import TopElectronics from "../components/TopElectronics";
import Essentials from "../components/Essentials";
import Footer from "../components/Footer";
import { essentials, mostPopularCategories, customerServices } from "../data/data";

export default function HeroPage() {
  return (
    <>
      <Header showBanner={true} showCart={true}/>
      <Topbar />
      <HeroSlider />
      <SmartphoneDeals />
      <TopCategories />
      <TopElectronics />
      <Essentials essentials={essentials} />
      <Footer
        mostPopularCategories={mostPopularCategories}
        customerServices={customerServices}
      />
    </>
  );
}
