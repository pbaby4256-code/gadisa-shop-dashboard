import './globals.css';

export const metadata = {
  title: 'Gadisa Shop — Payment Dashboard',
  description: 'Live payment confirmation dashboard for Gadisa Shop employees',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
