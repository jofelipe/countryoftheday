import { COUNTRIES } from '@/consts/countries';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const today = new Date();
  const dayOfYear = today.getUTCDate();
  const selectedCountry = COUNTRIES[dayOfYear % COUNTRIES.length];

  return NextResponse.json({ country: selectedCountry });
}
