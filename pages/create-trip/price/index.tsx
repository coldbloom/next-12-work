import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from "next/router";
import { LayoutContainer } from "@/components/layouts/LayoutContainer";
import { Button } from "@/components/kit/Button";
import { GoBackBtn } from "@/components/kit/GoBackBtn";
import { Input } from "@/components/kit/Input";
import { Label } from "@/components/kit/Label";
import { Loader } from "@/components/kit/Loader";
import { AnimatedRouteCities } from "@/components/shared/AnimatedRouteCities";

import useSWR from "swr";
import { observer } from "mobx-react-lite";
import { tripStore } from '@/store/createTripStore';
import { Location, RouteDetails } from "@/utils/types";
import { fetcher } from "@/context/AuthContext";
import { withAuth } from "@/components/hoc/WithAuth";

import s from './Price.module.scss';
import cn from 'classnames';
import Icon from "@mdi/react";
import { mdiInformationOutline } from "@mdi/js";
import { useRecommendedPrice } from "@/utils/hooks/useRecommendedPrice";
import { Heading } from "@/components/kit/Heading/Heading";

// Constants
const MAX_PRICE = 100000;
const MIN_PRICE = 0;

const PRICE_ERROR_TEXT = {
  empty: "Введите цену за место",
  lowPrice: "Цена слишком мала"
}

const getAddress = (city: Location | null, street: Location | null, building: Location | null) => {
  const joinNonEmptyStrings = (arr: (string | undefined)[]): string => {
    return arr.filter(part => part).join('+');
  }

  return [
    joinNonEmptyStrings([city?.parents, city?.cityTypeFull, city?.settlementTypeFull, city?.name]),
    joinNonEmptyStrings([street?.type, street?.name]),
    joinNonEmptyStrings([building?.type, building?.name])
  ]
    .filter(part => part && part.trim() !== '') // Filter out empty strings
    .join('+')
    .replace(/\s+/g, '+') // Replace spaces with plus signs
    .replace(/,/g, '')
};

const Price = observer(() => {
  const [priceError, setPriceError] = useState<string | null>(null);
  const { cityFrom, streetFrom, buildingFrom, cityTo, streetTo, buildingTo, price, duration, distance } = tripStore;
  const router = useRouter();

  // Redirect if no cities selected
  // useEffect(() => {
  //   if (!cityFrom || !cityTo) {
  //     router.push('/create-trip');
  //   }
  // }, [cityFrom, cityTo, router]);

  if (!cityFrom || !cityTo) {
    router.push('/create-trip');
    return null;
  }

  // Генерация параметров запроса
  const from = useMemo(() =>
      getAddress(cityFrom, streetFrom, buildingFrom),
    [cityFrom, streetFrom, buildingFrom]
  );
  const to = useMemo(() =>
      getAddress(cityTo, streetTo, buildingTo),
    [cityTo, streetTo, buildingTo]
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Проверяем, что значение не отрицательное и не более 100000
    if (Number(value) >= MIN_PRICE && Number(value) < MAX_PRICE || value === '') {
      tripStore.updatePrice(value);

      if (Number(value) < 100) {
        setPriceError(PRICE_ERROR_TEXT.lowPrice);
      } else if (priceError === PRICE_ERROR_TEXT.lowPrice) {
        setPriceError(null);
      }
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Блокируем ввод символов "-", "e", "E"
    if (event.key === '-' || event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  };

  const handleClear = () => tripStore.updatePrice('');
  const handleContinue = () => {
    if (!price) {
      setPriceError(PRICE_ERROR_TEXT.empty)
    } else {
      router.push('/create-trip/description')
    }
  };
  const handleGoBack = () => router.push('seats')

  const { data: routeDetails, error, isLoading } = useSWR<RouteDetails>(
    // Ключ запроса (зависит от from и to)
    from && to ? ["routeDetails", from, to] : null,
    // Функция для выполнения запроса
    async ([, from, to]) => {
      const res = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/route-detail`, {
        params: { from, to }
      });
      return res;
    },
    {
      // Опции SWR
      revalidateOnFocus: false, // Отключаем повторный запрос при фокусе
      revalidateOnReconnect: false, // Отключаем повторный запрос при восстановлении сети
      //shouldRetryOnError: false, // Отключаем повторный запрос при ошибке
      revalidateIfStale: false, // Отключаем фоновое обновление
    }
  );

  //* Price recommendation hook *//
  const recommendedPrice = useRecommendedPrice(
    routeDetails,
    !price ? (calculatedPrice) => tripStore.updatePrice(calculatedPrice) : undefined,
  );

  useEffect(() => {
    if (!price) {
      setPriceError(PRICE_ERROR_TEXT.empty)
    } else if (priceError && priceError !== PRICE_ERROR_TEXT.lowPrice) {
      setPriceError(null);
    }
  }, [price]);

  useEffect(() => {
    if (routeDetails) {
      tripStore.getDetails(routeDetails);
    }
  }, [routeDetails]);

  if (isLoading) {
    return (
      <div className={s.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <LayoutContainer>
        <div className={s.formWrapper}>
          <GoBackBtn onClick={handleGoBack} />
          <p>Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>
          <Button variant="continue" onClick={() => router.reload()}>Попробовать снова</Button>
        </div>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      <div className={s.formWrapper}>
        <GoBackBtn onClick={handleGoBack} />
        <Heading variant="dark">Установите цену за место</Heading>
        <div className={s.contentWrapper}>
          <AnimatedRouteCities from={cityFrom?.name} to={cityTo?.name}/>
          <div className={s.currencyWrapper}>
            <Input
              type="number"
              step="1"
              inputMode="numeric"
              isLabel={false}
              value={price || ''}
              onChange={onChange}
              onKeyDown={onKeyDown}
              handleClear={handleClear}
              className={cn(s.inputPrice, { [s.pr]: !price || price.length === 0 })}
              classNameWrapper={s.inputWrapper}
              min="0"
              errorText={priceError ?? undefined}
            />
            <div className={s.empty}></div>
            <span className={s.currency}>₽</span>
          </div>
        </div>
        {recommendedPrice && (
          <Label
            color="green"
            className={cn(s.label, s.first)}
            size="m"
          >
            Рекомендуемая цена: {recommendedPrice.min} ₽ - {recommendedPrice.max} ₽
          </Label>
        )}
        {routeDetails && (
          <>
            <Label color="grey" className={s.label}>Расстояние: {distance} км</Label>
            <Label color="grey" className={s.label}>Время в пути: {duration}</Label>
          </>
        )}
      </div>

      <div className={s.bottomWrapper}>
        <div className={s.infoWrapper}>
          <div>
            <Icon path={mdiInformationOutline} size="16px"/>
          </div>
          <p>Редактирование цены за место после публикации объявления невозможно</p>
        </div>
        <Button variant="continue" disabled={!!priceError} onClick={handleContinue}>Далее</Button>
      </div>
    </LayoutContainer>
  );
});

export default withAuth(Price);