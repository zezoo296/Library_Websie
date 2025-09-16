import Header from "../components/Header";
import Providers from "./provider";
import "./globals.css";
import VideoBackground from "../components/VideoBackground";

export const metadata = {
  title: "Pheonix Library",
  description: "Online library for books lovers",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-container">
          <VideoBackground />
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
