import ReactQueryProvider from "@/components/providers/reactQueryProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virtualized Chat App",
  description:
    "Virtualized Chat App created by Amirhossein Khatabakhsh for TechnoPay interview",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
};

const openSans = localFont({
  src: "../../public/fonts/OpenSans-VariableFont.ttf",
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.variable}>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
