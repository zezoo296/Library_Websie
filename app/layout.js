import Header from "../components/Header";
import Providers from "./provider";
import "./globals.css";

export const metadata = {
  title: "Pheonix Library",
  description: "Online library for books lovers",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="video-bg-container">
          <video autoPlay muted loop playsInline id="bg-video">
            <source src="/videos/HomeBackground.mp4" type="video/mp4"></source>
            <source src="/videos/HomeBackground.mp4" type="video/webm"></source>
          </video>
          <div className="overlay"></div>
          <div className="content">
            <Providers>
              <Header />
              {children}
            </Providers>
          </div>
        </div>

      </body>
    </html >
  );
}
