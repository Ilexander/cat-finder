import Image from "next/image";
import React, { useState } from "react";
import CatsContent from "./CatsContent";

const CatsCard = ({ item }) => {
  const [more, setMore] = useState(true);

  return (
    <li className="cats__item" style={{ maxHeight: more ? "535px" : "1500px" }}>
      <Image
        className="cats__image"
        src={`http://localhost:3001/cats/pictures/${item.cat_photo}`}
        alt={"Animal Photo by name " + item.cat_name}
        placeholder="blur"
        blurDataURL={
          "https://i.pinimg.com/originals/f0/b7/20/f0b72013df4e5c545c315172c7d96d13.jpg"
        }
        width={300}
        height={300}
        objectFit="cover"
      />
      <CatsContent item={item} styleState={more} setMore={setMore} />
    </li>
  );
};

export default CatsCard;
