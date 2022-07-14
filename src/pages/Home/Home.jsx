import Carousel from "../../components/Carousel/Carousel";
import styles from "./Home.module.scss";
const Home = () => {
  return (
    <div>
      <div>
        <h1 className={styles.h1}>What are you interested in?</h1>
      </div>
      <Carousel title="Most view" />
    </div>
  );
};

export default Home;
