import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePopup } from "../store/popupSlice.reducer";

const Popup = ({ style }) => {
  const dispatch = useDispatch();
  const { info, loadingInfo } = useSelector((state) => state.popupInfo);
  const { popupStatus } = useSelector((state) => state.popupInfo);
  const catSign = Object.keys(...info.cat_signs);
  const catSignValue = Object.values(...info.cat_signs);
  return (
    <div className={popupStatus === "use" ? "popup popup--active" : "popup"}>
      <button className="popup__close" onClick={() => dispatch(removePopup())}>
        &times;
      </button>
      <div className="popup__inner">
        <Image
          className="popup__image"
          src={"http://localhost:3001/cats/pictures/" + info.cat_photo}
          alt={"Photo animal by name: " + info.cat_name}
          width={400}
          height={400}
          objectFit="cover"
        />
        <div className="popup__content">
          <h3 className="popup__name">
            Его зовут: <b>{info.cat_name}</b>
          </h3>
          <a
            className="popup__location"
            href={"https://www.google.com/maps/place/" + info.lost_location}
          >
            <b>{info.cat_name} </b>
            потерялся примерно тут: <b>{info.lost_location}</b>
          </a>

          <p className="popup__description">
            <b>Описание: </b> {info.cat_description}
          </p>
          <ul className="popup__signs">
            <b>Особые приметы:</b>
            {catSign.map((item, index) => (
              <li className="popup__item" key={index}>
                <b>{catSign[index]}</b>: {catSignValue[index]}
              </li>
            ))}
          </ul>
          <p className="popup__text">
            Вы нашли {info.cat_name + "'a"}? Тогда, свяжитесь с:{" "}
            <b>{info.owner_name}</b>
          </p>
          <a className="popup__link" href={`tel:${info.owner_number}`}>
            Связаться
          </a>
        </div>
      </div>
    </div>
  );
};

export default Popup;
