import React, {useState} from 'react';
import s from "../Register.module.scss";
import { HeadingText } from "@/components/kit/HeadingText/HeadingText";
import { MainLayout2 } from "@/components/MainLayout2";
import { Input } from "@/components/kit/Input";
import {Button} from "@/components/kit/Button";
import Link from "next/link";

const Email = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <MainLayout2>
      <div className={s.wrapper}>
        <div className={s.contentContainer}>
          <HeadingText variant="dark">Регистрация</HeadingText>
          <p>Создайте аккаунт чтобы бронировать и создавать поездки</p>
          <Input
            value={name}
            onChange={(name) => setName(name)}
            type="text"
            placeholder="Имя"
            style={{marginBottom: '20px'}}
          />
          <Input
            type="email"
            placeholder="Электронная почта"
            value={email}
            onChange={(email) => setEmail(email)}
            style={{marginBottom: '20px'}}
          />
          <Input
            type="password"
            placeholder="пароль"
            value={password} onChange={(password) => setPassword(password)}
            style={{marginBottom: '20px'}}
          />
          <Input
            type="password"
            placeholder="подтвердите пароль"
            value={confirmPassword}
            onChange={(password) => setConfirmPassword(password)}
            style={{marginBottom: '20px'}}
          />

          <Button variant="continue">Создать учётную запись</Button>
        </div>

        <div className={s.footer}>
          Уже есть учётная запись? <Link href="../login" className={s.link}>Войти</Link>
        </div>
      </div>
    </MainLayout2>
  );
};

export default Email;