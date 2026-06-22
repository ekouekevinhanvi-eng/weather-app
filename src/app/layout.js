import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Météo HEK : La météo en temps réel ",
  description: "Une très belle interface utilisateur pour la météo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
