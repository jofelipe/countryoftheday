import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Country of the day',
    template: '%s - Country of the day',
  },
  description: 'Discover the country of the day in our amazing page!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
