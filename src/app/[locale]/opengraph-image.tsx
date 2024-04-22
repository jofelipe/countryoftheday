import getCountry from '@/services/country';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export default async function Image() {
  const country = await getCountry();

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#151718',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: 'rgb(237, 237, 237)',
            display: 'flex',
            fontSize: '4rem',
            fontWeight: 'bold',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={country.flags.png}
            width="320"
            height="200"
            style={{ borderRadius: 8, marginBottom: 48 }}
          />
          <div
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgb(237, 237, 237), rgb(139, 149, 154))',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {country.name.official}
          </div>
          <div style={{ display: 'flex', fontSize: '2.4rem' }}>
            is the country of the day
          </div>
          <div style={{ display: 'flex', fontSize: '1.6rem', marginTop: 48 }}>
            🔗 countryoftheday.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
