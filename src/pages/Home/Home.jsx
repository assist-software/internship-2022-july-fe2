import Carousel from "../../components/Carousel/Carousel";
import Tabs from "../../components/Tabs/Tabs";
import styles from "./Home.module.scss";
const Home = () => {
  return (
    <div>
      <div>
        <Tabs />
      </div>

      <Carousel title="Most view" />
      <Carousel title="Big Houses" />
      <Carousel title="Small Houses" />
    </div>
  );
};

export default Home;
