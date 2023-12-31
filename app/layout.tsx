import ActiveStatus from '@/app/components/ActiveStatus';
import AuthContext from '@/app/context/AuthContext';
import ToasterContext from '@/app/context/ToasterContext';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Messenger Clone',
  description: 'Messenger Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
