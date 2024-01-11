import { RapidAPIResponse } from '@/types';
import { formatNumber } from '@/utils/formatters';
import { getLocale, getTranslations } from 'next-intl/server';

type DistanceProps = {
  capital: string;
  country: string;
  userCity: string | null;
  userCountry: string | null;
};

export default async function Distance({
  capital,
  country,
  userCity,
  userCountry,
}: DistanceProps) {
  const locale = await getLocale();
  const t = await getTranslations('home');

  const body = {
    route: [
      {
        country: userCountry,
        name: userCity,
      },
      {
        country,
        name: capital,
      },
    ],
  };

  const data = await fetch(`${process.env.NEXT_PUBLIC_RAPID_API_URL}`, {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_RAPID_APY_KEY}`,
      'content-type': 'application/json',
      'X-RapidAPI-Host': 'distanceto.p.rapidapi.com',
    },
    body: JSON.stringify(body),
  });

  const { route } = (await data.json()) as RapidAPIResponse;

  if (!userCity || !userCountry) {
    return <></>;
  }

  return (
    <div className="text-gray-300 text-center italic">
      <p>
        {t('distance')} {userCity}, {userCountry} <br />
        <strong className="not-italic">
          {`${formatNumber(route?.greatCircle, locale)} km`}
        </strong>
      </p>
    </div>
  );
}
