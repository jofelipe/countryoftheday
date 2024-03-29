import getCountry from '@/services/country';
import { ImageResponse } from 'next/og';
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default async function Icon() {
  const country = await getCountry()

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: '#333',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 4,
          paddingRight: 4,
        }}
      >
        <img src={country.flags.png} alt={country.translations.por.official} />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}