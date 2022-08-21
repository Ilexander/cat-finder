/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useUpload = (setValue) => {
  const [currentPhoto, setCurrentPhoto] = useState(false);
  const [buttonInner, setButtonInner] = useState("Выбрать фото");

  const deletePhoto = async (photo) => {
    const resp = await fetch(`http://localhost:3001/users/pictures/${photo}`, {
      method: "DELETE",
    });
  };

  useEffect(() => {
    return () => {
      if (typeof currentPhoto === "string") {
        deletePhoto(currentPhoto);
      }
    };
  }, [currentPhoto]);

  const uploadPhoto = async (event) => {
    const formDataFile = new FormData();
    formDataFile.append("user_avatar", event.target.files[0]);
    const resp = await fetch(`http://localhost:3001/users/avatar`, {
      method: "POST",
      body: formDataFile,
    });
    const json = await resp.json();
    setCurrentPhoto(json.avatar);
    setValue("user_avatar", json.avatar, { shouldValidate: true });
  };

  const handleFilePick = (event) => {
    setButtonInner(event.target.files[0].name);
    uploadPhoto(event);
  };

  return {
    currentPhoto,
    buttonInner,
    handleFilePick,
    setCurrentPhoto,
  };
};

export { useUpload };
