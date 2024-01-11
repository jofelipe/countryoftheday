import { CountryProps } from '@/types';
import { getLocale, getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';

import { HEADERS } from '@/consts/headers';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import dynamic from 'next/dynamic';
import Image from 'next/image';

export async function generateMetadata() {
  const todayCountry = await fetch(`${process.env.NEXT_PUBLIC_URL}api/country`);
  const { country } = await todayCountry.json();

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL}alpha/${country}`
  );
  const countryInfo = (await data.json()) as CountryProps[];
  const { name } = countryInfo[0];

  return {
    title: name.official,
  };
}

const LazyDistance = dynamic(() => import('../components/Distance'));

export default async function Index() {
  const headersList = headers();
  const userCity = headersList.get(HEADERS.USER_CITY);
  const userCountry = headersList.get(HEADERS.USER_COUNTRY);

  const todayCountry = await fetch(`${process.env.NEXT_PUBLIC_URL}api/country`);
  const { country } = await todayCountry.json();

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL}alpha/${country}`
  );
  const countryInfo = (await data.json()) as CountryProps[];
  const {
    name,
    capital,
    flags,
    continents,
    population,
    area,
    currencies,
    translations,
  } = countryInfo[0];

  const locale = await getLocale();
  const t = await getTranslations('home');

  const isPt = locale === 'pt';

  const translatedOfficialName = isPt
    ? translations.por.official
    : name.official;

  const translatedName = isPt ? translations.por.common : name.common;

  return (
    <main className="flex flex-col gap-8 min-h-screen items-center justify-center bg-gray-800 py-12">
      <div className="text-gray-100 flex flex-col bg-gray-700 border-1 border-gray-500 border-dashed min-w-[580px] items-center rounded-lg">
        <span className="flex flex-1 py-3 bg-gray-500 w-full justify-center mt-8 mb-12 text-2xl font-medium">
          {translatedOfficialName}
        </span>

        <Image
          className="rounded-lg mb-12"
          src={flags.png}
          alt={flags.alt}
          width={266}
          height={160}
        />

        <h1 className="text-6xl font-semibold from-gray-100 to-gray-400 bg-gradient-to-b bg-clip-text text-transparent mb-8">
          {translatedName}
        </h1>

        <div className="px-12 pb-12 w-full">
          <ul className="w-full">
            <li className="bg-gray-600 border-1 border-dashed border-gray-400 text-xl py-2 px-4 rounded-lg flex justify-between mb-4">
              <strong>{t('capital')}: </strong> {capital}
            </li>
            <li className="bg-gray-600 border-1 border-dashed border-gray-400 text-xl py-2 px-4 rounded-lg flex justify-between mb-4">
              <strong>{t('continent')}: </strong> {continents[0]}
            </li>
            <li className="bg-gray-600 border-1 border-dashed border-gray-400 text-xl py-2 px-4 rounded-lg flex justify-between mb-4">
              <strong>{t('population')}: </strong>{' '}
              {formatNumber(population, locale)}
            </li>
            <li className="bg-gray-600 border-1 border-dashed border-gray-400 text-xl py-2 px-4 rounded-lg flex justify-between mb-4">
              <strong>{t('area')}: </strong>{' '}
              {`${formatNumber(area, locale)} km²`}
            </li>
            <li className="bg-gray-600 border-1 border-dashed border-gray-400 text-xl py-2 px-4 rounded-lg flex justify-between">
              <strong>{t('currency')}: </strong> {formatCurrency(currencies)}
            </li>
          </ul>
        </div>
      </div>

      <div className="h-[100px]">
        <LazyDistance
          capital={capital[0]}
          country={country}
          userCity={userCity}
          userCountry={userCountry}
        />
      </div>
    </main>
  );
}
