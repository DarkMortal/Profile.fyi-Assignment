import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { Providers } from "../components/provider";
import '@fortawesome/fontawesome-svg-core/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Profile.fyi Frontend Assignment",
  description: "Developed by Saptarshi Dey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
