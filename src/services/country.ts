import { CountryRequest } from "@/types";

export default async function getCountry() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/country`, {
    cache: 'no-cache'
  });

  const { country } = (await res.json()) as CountryRequest

  return country
}