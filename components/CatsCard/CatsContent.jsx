import React from "react";
import { useDispatch } from "react-redux";
import { fetchInfo, getPopup } from "../../store/popupSlice.reducer";

const CatsContent = ({ item, styleState, setMore }) => {
  const dispatch = useDispatch();
  const openPopup = (id) => {
    dispatch(fetchInfo(id));
    dispatch(getPopup());
  };

  return (
    <div>
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
        style={{ maxHeight: styleState ? "40px" : "500px" }}
      >
        <b>Подробности:</b> {item.cat_description}
      </div>
      <button className="cats__more" onClick={() => setMore(!styleState)}>
        <b>{styleState ? "Подробнее" : "Скрыть"}</b>
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
    </div>
  );
};

export default CatsContent;
