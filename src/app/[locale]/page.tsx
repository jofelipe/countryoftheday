import { getLocale, getTranslations } from 'next-intl/server';
import { WebPage, WithContext } from 'schema-dts';


import getCountry from '@/services/country';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import Image from 'next/image';

export async function generateMetadata() {
  const country = await getCountry()
  const { name } = country;

  console.log('country', country)

  return {
    title: name.official,
    openGraph: {
      title: `${name.official} is the country of the day`,
      type: 'website',
      publishedTime: new Date(),
      authors: ['Jonathan Felipe'],
    },
  };
}

export default async function Index() {
  // const headersList = headers();
  // const userCity = headersList.get(HEADERS.USER_CITY);
  // const userCountry = headersList.get(HEADERS.USER_COUNTRY);

  const country = await getCountry()
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
  }

  return (
    <div className="-z-10 h-full w-full bg-gray-800 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <main className="flex flex-col gap-8 min-h-screen items-center justify-center py-12">
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
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
