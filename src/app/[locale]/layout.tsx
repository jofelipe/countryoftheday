import { GeistSans } from 'geist/font/sans';
import Card from '../components/Card';
import '../globals.css';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  return (
    <html lang={params.locale} className={GeistSans.className}>
      <body>
        <main className="-z-10 min-h-screen w-full bg-gray-800 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:6rem_4rem] relative overflow-hidden">
          <div className="flex flex-col gap-8 min-h-screen items-center justify-center py-12 px-6">
            <Card>{children}</Card>
          </div>
        </main>
      </body>
    </html>
  );
}
