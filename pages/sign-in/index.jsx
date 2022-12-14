import React from 'react';
import { Input } from '../../components/Header/UI/Input/Input';
import { Button } from '../../components/Header/UI/Button/Button';
import { ButtonLink } from '../../components/Header/UI/ButtonLink/ButtonLink'
import css from "./signin.module.css"
import { useState } from 'react';
import { postFetch } from '../../utils/Fetch'
import { setCookie } from '../../utils/setCookies'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Layout } from '../../components/Layout/Layout';

const SignIn = () => {

  const[email, setEmail] = useState();
  const[password, setPassword] = useState();
  const[isLoading, setLoading] = useState();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  })

  function FormHandler(e) {
    e.preventDefault();
    setLoading(true);
    postFetch("https://norma.nomoreparties.space/api/auth/login", {
      email, 
      password,
    }).then(res => {
      setCookie("accessToken", res.accessToken, 1);
      setCookie("refreshToken", res.refreshToken);
      setLoading(false);
      router.push("/");
    });
  }

  return (
    <Layout title="Sign in" onlyUnAuth>
      <form className={css.form} onSubmit={FormHandler}>
        <fieldset className={css.form__inputs}>
          <legend>Вход</legend>
          <Input onChange={e => setEmail(e.target.value)} placeholder="логин" required type="email" value={email}>Логин</Input>
          <Input onChange={e => setPassword(e.target.value)} placeholder="пароль" required type="password" value={password}>Пароль</Input>
        </fieldset>
        <ButtonLink type="submit" href="/register">Зарегистрироваться</ButtonLink>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "..." : "Войти"}
          </Button>
      </form>
    </Layout>
  )
}

export default SignIn;
