import { getLocale, getTranslations } from 'next-intl/server';
import { WebPage, WithContext } from 'schema-dts';

import getCountry from '@/services/country';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import Image from 'next/image';
import ListItem from '../components/ListItem';
import { Spotlight } from '../components/Spotlight';

export const metadata = {
  title: 'Home page',
  description: 'Discover the country of the day in our amazing page!',
  openGraph: {
    title: 'Home page - Country of the Day',
    type: 'website',
    authors: ['Jonathan Felipe'],
  },
};

export default async function Index() {
  const country = await getCountry();
  const {
    name,
    capital,
    flags,
    continents,
    population,
    area,
    currencies,
    translations,
  } = country;

  const locale = await getLocale();
  const t = await getTranslations('home');

  const isPt = locale === 'pt';

  const translatedOfficialName = isPt
    ? translations.por.official
    : name.official;

  const translatedName = isPt ? translations.por.common : name.common;

  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${name.official} is the country of the day`,
    image: flags.png,
    description: 'Discover the country of the day in our amazing page!',
  };

  return (
    <>
      <Spotlight
        className="-top-40 left-30 md:left-60 md:-top-20"
        fill="white"
      />

      <span className="flex flex-1 py-3 bg-gray-500 w-full justify-center mt-8 mb-12 text-lg font-medium lg:text-2xl">
        {translatedOfficialName}
      </span>

      <Image
        className="rounded-lg mb-10"
        src={flags.png}
        alt={flags.alt}
        width={200}
        height={120}
      />

      <h1 className="text-3xl lg:text-5xl font-semibold from-gray-100 to-gray-400 bg-gradient-to-b bg-clip-text text-transparent mb-8">
        {translatedName}
      </h1>

      <div className="px-6 lg:px-12 pb-6 lg:pb-12 w-full">
        <ul className="w-full">
          <ListItem className="mb-4">
            <strong className="text-gray-200">{t('capital')}: </strong>{' '}
            {capital}
          </ListItem>
          <ListItem className="mb-4">
            <strong className="text-gray-200">{t('continent')}: </strong>{' '}
            {continents[0]}
          </ListItem>
          <ListItem className="mb-4">
            <strong className="text-gray-200">{t('population')}: </strong>{' '}
            {formatNumber(population, locale)}
          </ListItem>
          <ListItem className="mb-4">
            <strong className="text-gray-200">{t('area')}: </strong>{' '}
            {`${formatNumber(area, locale)} km²`}
          </ListItem>
          <ListItem className="mb-4">
            <strong className="text-gray-200">{t('currency')}: </strong>{' '}
            {formatCurrency(currencies)}
          </ListItem>
        </ul>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
