/* eslint-disable react-hooks/exhaustive-deps */
import Router from "next/dist/server/router.js";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpload } from "../../hooks/useUpload.js";

const RegistrationForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { currentPhoto, buttonInner, handleFilePick, setCurrentPhoto } =
    useUpload(setValue);
  const filePicker = useRef(null);

  const onSubmit = async (data) => {
    console.log(data);
    router.push("/");
    const resp = await fetch("http://localhost:3001/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCurrentPhoto(false);
    const dataResp = await resp.json();
  };

  const handleClick = () => {
    filePicker.current.click();
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__wrapper">
          <label htmlFor="" className="form__label">
            Имя
            <input
              className="form__input"
              type="text"
              name="user_name"
              {...register("user_name", {
                required: {
                  value: true,
                  message: "Это поле обязательное!",
                },
                minLength: {
                  value: 2,
                  message: "Минимальная длинна имени 2 символа",
                },
              })}
            />
            <p className="form__error">{errors.user_name?.message}</p>
          </label>
          <label htmlFor="" className="form__label">
            Фамилия
            <input
              className="form__input"
              type="text"
              name="user_surname"
              {...register("user_surname", {
                required: {
                  value: true,
                  message: "Это поле обязательное!",
                },
                minLength: {
                  value: 2,
                  message: "Минимальная длинна фамилии 2 символа",
                },
              })}
            />
            <p className="form__error">{errors.user_surname?.message}</p>
          </label>
        </div>
        <label htmlFor="" className="form__label">
          Логин
          <input
            className="form__input"
            type="text"
            name="user_login"
            {...register("user_login", {
              required: {
                value: true,
                message: "Это поле обязательное!",
              },
              minLength: {
                value: 3,
                message: "Минимальная длинна логина 3 символа",
              },
            })}
          />
          <p className="form__error">{errors.user_login?.message}</p>
        </label>
        <label htmlFor="" className="form__label">
          Телефон
          <input
            className="form__input"
            type="text"
            name="user_phone"
            {...register("user_phone", {
              required: {
                value: true,
                message: "Это поле обязательное!",
              },
              minLength: {
                value: 8,
                message: "Минимальная длинна телефона 8 символов",
              },
            })}
          />
          <p className="form__error">{errors.user_phone?.message}</p>
        </label>
        <label htmlFor="" className="form__label">
          Почта
          <input
            className="form__input"
            type="text"
            name="user_email"
            {...register("user_email", {
              required: {
                value: true,
                message: "Это поле обязательное!",
              },
            })}
          />
          <p className="form__error">{errors.user_email?.message}</p>
        </label>
        <label htmlFor="" className="form__label">
          Пароль
          <input
            className="form__input"
            type="password"
            name="user_password"
            {...register("user_password", {
              required: {
                value: true,
                message: "Это поле обязательное!",
              },
            })}
          />
          <p className="form__error">{errors.user_password?.message}</p>
        </label>
        <label
          htmlFor=""
          className="form__label"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div>
            {currentPhoto ? (
              <Image
                className="form__avatar"
                src={`http://localhost:3001/users/pictures/${currentPhoto}`}
                alt="Avatar"
                width={120}
                height={120}
                objectFit="contain"
              />
            ) : (
              "Выберите фото"
            )}
          </div>
          <button className="form__file" type="button" onClick={handleClick}>
            {buttonInner}
          </button>
          <input
            className="form__input form__input--file"
            type="file"
            onChange={handleFilePick}
            name="user_avatar"
            accept=".png, .jpg"
            ref={filePicker}
          />
          <p className="form__error">{errors.user_avatar?.message}</p>
        </label>
        <button
          className="form__submit"
          type="submit"
          disabled={!currentPhoto ? true : false}
        >
          Зарегистрироваться
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
