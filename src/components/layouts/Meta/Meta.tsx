import Head from "next/head";

type MetaProps = {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string
  ogDescription: string;
}

export const Meta = ({ title, description, canonical, ogTitle, ogDescription }: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {/*FIXME заполнить мета теги*/}

      <meta property="og:site_name" content="блаблаавто.рф" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content="https://example.com/image.jpg"/>
      <meta property="og:url" content="https://example.com"/>
      <meta property="og:type" content="website"/>

      {/*<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>*/}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>
  );
};

//Особенности заполнения meta-тегов:
// Каждая страница — свои title, description, og:title, og:description, og:image.
// Контент в description и og:description — не дублируй, делай уникальными и релевантными.
// og:image должен быть ссылкой на валидную картинку (желательно 1200×630px, jpg/png), не обязательно хостить на своем домене — но лучше так (ускоряет загрузку).
// Относись к тегам robots осторожно! Не ставь noindex случайно на рабочую страницу.
// Canonical всегда на динамических страницах и в случае дублей одного контента!
// Twitter Cards копируй значения из OG, но можешь изменить для спец. случаев.
// Title/description/OG максимум информативности в первых 60–70 и 160–180 символах.
// Структурированные данные добавляй там, где это реально принесет пользу (добавить во все места — не обязательно).
// Однотипные страницы (товары, статьи) — автоматизируй генерацию title/description/og/structured data с помощью шаблонов.
