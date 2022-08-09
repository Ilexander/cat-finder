import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchInfo, getPopup } from "../../store/popupSlice.reducer";

const CatsCard = ({ item }) => {
  const dispatch = useDispatch();
  const [more, setMore] = useState(true);

  const openPopup = (id) => {
    dispatch(fetchInfo(id));
    dispatch(getPopup());
  };

  return (
    <li className="cats__item">
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
      <p className="cats__name">
        Его зовут: <span>{item.cat_name}</span>
      </p>
      <p className="cats__location">
        <b>{item.cat_name}</b> потерялся(ась) на улице: &nbsp;
        <b>
          <a href={"https://www.google.com/maps/place/" + item.lost_location}>
            {item.lost_location}
          </a>
        </b>
      </p>
      <div
        className="cats__discription"
        style={{ maxHeight: more ? "43px" : "500px" }}
      >
        <b>Подробности:</b> {item.cat_description}
      </div>
      <button className="cats__more" onClick={() => setMore(!more)}>
        <b>{more ? "Подробнее" : "Скрыть"}</b>
      </button>
      <button className="cats__info" onClick={() => openPopup(item._id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>search</title>
          <path
            fill="white"
            d="M19 17l-5.15-5.15a7 7 0 1 0-2 2L17 19zM3.5 8A4.5 4.5 0 1 1 8 12.5 4.5 4.5 0 0 1 3.5 8z"
          />
        </svg>
      </button>
    </li>
  );
};

export default CatsCard;
