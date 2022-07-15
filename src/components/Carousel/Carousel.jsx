import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListings } from "../../api/API";
import { Button, Card } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import styles from "./Carousel.module.scss";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
import { ReactComponent as ChevronRight } from "../../assets/icons/chevron-right.svg";
// Import Swiper styles
import "./swipper.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Carousel = ({ title }) => {
  const [listings, setListings] = useState([]);
  console.log(listings);
  useEffect(() => {
    getListings().then((res) => setListings(res));
  }, []);

  const navigate = useNavigate();
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
          slidesPerView={5}
          spaceBetween={1}
          slidesPerGroup={5}
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
              />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div onClick={() => navigate("/listing")}>
              <div className={styles.seeEverything}>
                <span>
                  <ChevronRight className={styles.chevron} />
                </span>
                <span>
                  <Button variant="tertiary" label="See everything" />
                </span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;