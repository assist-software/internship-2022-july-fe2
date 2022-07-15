import React, { useEffect, useState } from "react";
// import Card from "../../components/Card/Card";
import { getListings } from "../../api/API";
// import styles from "./Catalin.module.scss";
// eslint-disable-next-line no-unused-vars
import styles from "../../components/Card/Card.module.scss";

const Catalin = (props) => {
  const [listings, setListings] = useState([]);
  console.log(listings);
  useEffect(() => {
    getListings().then((res) => setListings(res));
  }, []);
  const DATA = [
    {
      id: 1,
      title: "Dreamy Treehouse Above Park City asdasd asd asd",
      location: "Suceava",
      price: 123,
      description:
        "Designers tend to cut the lorem ipsum text when it pleases them to keep their designs nice and tidy. However, in reality, content is not the same length. Small areas may not be able to house the necessary content needed. This, in turn, causes you (the designer) to spend more time reworking the layout to fit the text. Dummy text misleads future content.",
    },
    {
      id: 2,
      title: "Dreamy Treehouse Above Park City",
      location: "Suceava",
      price: 1323,
      description:
        "Designers tend to cut the lorem ipsum text when it pleases them to keep their designs nice and tidy. However, in reality, content is not the same length. Small areas may not be able to house the necessary content needed. This, in turn, causes you (the designer) to spend more time reworking the layout to fit the text. Dummy text misleads future content.",
    },
    {
      id: 3,
      title: "Dreamy Treehouse Above Park City",
      location: "Suceava",
      price: 1323,
      description:
        "Designers tend to cut the lorem ipsum text when it pleases them to keep their designs nice and tidy. However, in reality, content is not the same length. Small areas may not be able to house the necessary content needed. This, in turn, causes you (the designer) to spend more time reworking the layout to fit the text. Dummy text misleads future content.",
    },
    {
      id: 4,
      title: "Dreamy Treehouse Above Park City",
      location: "Suceava",
      price: 1323,
      description:
        "Designers tend to cut the lorem ipsum text when it pleases them to keep their designs nice and tidy. However, in reality, content is not the same length. Small areas may not be able to house the necessary content needed. This, in turn, causes you (the designer) to spend more time reworking the layout to fit the text. Dummy text misleads future content.",
    },
    {
      id: 5,
      title: "Dreamy Treehouse Above Park City asdasd asd asd",
      location: "Suceava",
      price: 123,
      description:
        "Designers tend to cut the lorem ipsum text when it pleases them to keep their designs nice and tidy. However, in reality, content is not the same length. Small areas may not be able to house the necessary content needed. This, in turn, causes you (the designer) to spend more time reworking the layout to fit the text. Dummy text misleads future content.",
    },
  ];
  // eslint-disable-next-line no-unused-vars
  const [announces, setAnnounces] = useState(DATA);
  const [listView, setListView] = useState(false);

  return (
    <div>
      Catalin
      <button onClick={() => setListView(!listView)}>Click here</button>
      {/* {announces.map((announce) => (
        <Card
          title={announce.title}
          location={announce.location}
          price={announce.price}
          description={announce.description}
          key={announce.id}
          listView={listView}
        />
      ))} */}
      {/* {listings?.map((listing, index) => (
        <Card
          key={index}
          image={listing.image}
          title={listing.title}
          description={listing.description}
          price={listing.price}
          location={listing.location}
          listView={listView}
        />
      ))} */}
    </div>
  );
};

export default Catalin;
