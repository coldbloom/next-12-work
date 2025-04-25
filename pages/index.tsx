import type { NextPage } from 'next'
import { Main } from 'src/components/main/Main';
import { Meta } from '@/components/layouts/Meta';
import {MainLayout} from "@/components/layouts/MainLayout";

// Не вкладывайте <header>, <main>, <footer> друг в друга.
// Внутри <main> используйте <section>, <article>, <aside> для дополнительной структуризации.
// Используйте <nav> для основной и внутренней навигации
// <nav> выделяет меню/панели навигации (может быть несколько).

// На странице допустим только один <h1>, он должен быть внутри <main> (реже — в <header> если это название сайта).

// B. Отличие наполнения head на каждой странице
// title — обязательно индивидуальный для каждой страницы.
//   description — уникальный (важно для SEO).
// OG (Open Graph, соцсети) — желательно уникальные (og:title, og:description, og:image, og:type, og:url).
// canonical — для избежания дублей (особенно если есть query-параметры).
// robots — если надо что-то закрыть от индексации.
//   Никаких дубликатов во favicon'ах, viewport'е и базовых мета: делайте их в layout.


const Home: NextPage = () => {

  return (
    <>
      {/* @TODO вынести в отдельную компоненту meta или сделать layout with Head*/}
      <Meta
        title="Сервис поиска автомобильных попутчиков без комиссии"
        description="главная описание"
        canonical="https://блаблаавто.рф/"
        ogTitle="title для соцсетей"
        ogDescription="Описание для соц-сетей"
      />

      <MainLayout>
        <Main />
      </MainLayout>
    </>
  )
}

export default Home
