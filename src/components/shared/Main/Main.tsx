import { MainLayout } from "@/components/layouts/MainLayout";
import { MainForm } from "@/components/shared/MainForm";
import { pages } from "@/utils/const";

import Link from "next/link";
import s from './Main.module.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import {TextArea} from "@/components/kit/TextArea";
import Icon from "@mdi/react";
import {mdiAbacus, mdiInformationOutline} from "@mdi/js";

export const Main = () => {
  const [value, setValue] = useState('');


  // useEffect(() => {
  //   const yandexApiKey = 'bdf0f75b-7444-45f8-808d-fd5f2abdc77d';
  //   const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${yandexApiKey}&geocode=Краснодарский+край+Выселковский+р-н+станица+Выселки+ул+Украинская+д+1&format=json`;
  //   axios.get(url)
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err));
  //
  //   const pointFrom = '39.665048,47.213785';
  //   const pointTo = '37.926431,47.973598';
  //   const pointRostov = '39.718813,47.222109';
  //   const pointMoscow = '37.617698,55.755864';
  //
  //   const pointYalta = '34.169506,44.497415';
  //   const pointSimferopol = '34.109921,44.980125';
  //
  //
  //   // axios.get(`https://api.routing.yandex.net/v2/route?waypoints=${pointFrom}|${pointTo}&apikey=${yandexApiKey}`)
  //   //   .then(data => console.log(data))
  //   //   .catch(err => console.log(err));
  //
  //   //axios.get(`http://router.project-osrm.org/route/v1/driving/37.622504,55.753215;37.617761,55.755768?overview=false`).then(res => console.log(res))
  //   axios.get(`http://router.project-osrm.org/route/v1/driving/${pointYalta};${pointRostov}?overview=false`).then(res => console.log(res))
  // }, []);
  return (
    <MainLayout>
      <MainForm/>
      <div className={s.createTravelWrapper}>
        <Link href={pages.createTrip.link} className={s.createTravelLink}>
          Создать поездку
        </Link>
      </div>
      <div style={{padding: "0 20px 0 20px"}}>
        <TextArea value={value} onChange={(newValue) => setValue(newValue)}
                  placeholder="Напишите подробности о поездке"/>
      </div>

      {/*<div style={{width: width, display: 'flex', alignItems: 'center'}}>*/}
      {/*  <div style={{*/}
      {/*    maxWidth: `calc(${width} - 24px)`,*/}
      {/*    overflow: 'hidden',*/}
      {/*    whiteSpace: 'nowrap',*/}
      {/*    textOverflow: 'ellipsis'*/}
      {/*  }}>*/}
      {/*    <span className={s.ellipsis_text}>какой-то очень длинный текст</span>*/}
      {/*  </div>*/}
      {/*  <Icon width={"24px"}/>*/}
      {/*</div>*/}

      <div className={s.testWrapper}>
        <div className={s.wrapper}>
          <div className={s.spanWrapper}>
            <span>очень очень длинный текст</span>
          </div>
          <Icon path={mdiInformationOutline} size={"16px"} className={s.icon}/>
        </div>
      </div>

      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th style={{width: '25%'}}> {/* Установить позицию для внутреннего div */}
              <div className={s.spanWrapper}>
                <span>1-я колонка с длинным текстом, который должен обрезаться</span>
              </div>
              <Icon path={mdiInformationOutline} size={"16px"} className={s.icon}/>
            </th>
            <th style={{width: '25%'}}>
              <div className={s.spanWrapper}>
                <span>2-я колонка</span>
              </div>
            </th>
            <th style={{width: '25%'}}>
              <div className={s.spanWrapper}>
                <span>3-я колонка</span>
              </div>
            </th>
            <th style={{width: '25%'}}>
              <div className={s.spanWrapper}>
                <span>4-я колонка</span>
              </div>
            </th>
          </tr>
        </thead>
      </table>

    </MainLayout>
  );
};