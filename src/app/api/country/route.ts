import { COUNTRIES } from '@/consts/countries';

export async function GET() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const todayIndex = dayOfYear % COUNTRIES.length;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL}alpha/${COUNTRIES[todayIndex]}`, {
      cache: 'no-cache'
    }
  );
  const data = await res.json()

  return Response.json({ country: data[0] });
}
