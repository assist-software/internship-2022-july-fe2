import { useNavigate } from "react-router-dom";
import { Button, Card } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import styles from "./Carousel.module.scss";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
// Import Swiper styles
import "./swipper.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useStateProvider from "../../hooks/useStateProvider";
import { useEffect, useState } from "react";

const Carousel = ({ title }) => {
  const navigate = useNavigate();
  // listings
  const { listings } = useStateProvider();
  const [like, setLike] = useState(false);

  return (
    <div>
      <div>
        <div className={styles.headerSwiper}>
          <h5>{title}</h5>
          <span onClick={() => navigate("/listing")}>
            <Button
              icon={<ArrowRight />}
              position="right"
              variant="tertiary"
              label="See everything "
            />
          </span>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={1}
          slidesPerGroup={3}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwipper"
        >
          {listings?.map((listing) => (
            <SwiperSlide key={listing.id}>
              <Card
                style={{ width: "90%" }}
                image={listing.images}
                title={listing.title}
                description={listing.description}
                price={listing.price}
                location={listing.location}
                listingId={listing.id}
                onClick={() => {
                  navigate("/listing/" + listing.id);
                }}
              />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div onClick={() => navigate("/listing")}>
              <div className={styles.seeEverything}>
                <span>
                  <ArrowRight className={styles.chevron} />
                </span>
                <p className={styles.text}>See Everything</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
