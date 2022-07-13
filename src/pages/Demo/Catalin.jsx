import React, { useState } from "react";
import Card from "../../components/Card/Card";

const Catalin = (props) => {
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
  const [announces, setAnnounces] = useState(DATA);
  const [showGrid, setShowGrid] = useState(false);
  return (
    <div>
      Catalin
      <button onClick={() => setShowGrid(!showGrid)}>Click here</button>
      {announces.map((announce) => (
        <Card
          title={announce.title}
          location={announce.location}
          price={announce.price}
          description={announce.description}
          key={announce.id}
          showGrid={showGrid}
        />
      ))}
    </div>
  );
};

export default Catalin;
