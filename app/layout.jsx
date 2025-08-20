import "@styles/globals.css";
import Provider from "@components/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Medi Link",
  description: "Book appointments, ambulance services, and more with ease.",
  icons: {
    icon: { url: "/assets/Logo.png", sizes: "40x40", type: "image/png" },
  },
};

const Root = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          <SpeedInsights />
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </Provider>
    </html>
  );
};

export default Root;
