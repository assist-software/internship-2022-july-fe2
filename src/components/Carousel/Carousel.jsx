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
import moment from "moment";
import { useEffect } from "react";
const Carousel = ({
  title,
  pending,
  pending2,
  showcontrols,
  category,
  all,
}) => {
  const navigate = useNavigate();
  // listings
  const { listings } = useStateProvider();
  const { setListView } = useStateProvider();

  useEffect(() => {
    setListView(false);
  }, [setListView]);

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
          {listings?.slice(0, 6).map((listing) =>
            listing.status !== pending && listing.status !== pending2 && all ? (
              // latest
              <SwiperSlide key={listing.id}>
                <Card
                  showcontrols={showcontrols}
                  style={{ width: "90%" }}
                  image={listing.images[0]}
                  title={listing.title}
                  description={listing.description}
                  price={listing.price}
                  location={listing.location[2] + ", " + listing.location[5]}
                  listingId={listing.id}
                  onClick={() => {
                    navigate("/listing/" + listing.id);
                  }}
                />
              </SwiperSlide>
            ) : (
              listing.category === category && (
                <SwiperSlide key={listing.id}>
                  <Card
                    showcontrols={showcontrols}
                    style={{ width: "90%" }}
                    image={listing.images[0]}
                    title={listing.title}
                    description={listing.description}
                    price={listing.price}
                    location={listing.location[2] + ", " + listing.location[5]}
                    listingId={listing.id}
                    onClick={() => {
                      navigate("/listing/" + listing.id);
                    }}
                  />
                </SwiperSlide>
              )
            )
          )}
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
