import Header from '@components/Header';
import SessionProviderWrapper from 'src/providers/SessionProviderWrapper';
import QueryClientProviderWrapper from '../providers/QueryClientProviderWrapper';
import '../styles/globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body className={`${process.env.NODE_ENV === 'development' ? 'debug-screens' : ''}`}>
        <SessionProviderWrapper>
          <QueryClientProviderWrapper>
            <Header />
            <main className="grid min-h-screen w-full pt-header">
              <div className="flex px-container">
                <div className="mx-auto w-full max-w-container py-4 @container">{children}</div>
              </div>
            </main>
          </QueryClientProviderWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
