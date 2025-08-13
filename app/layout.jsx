import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "Medi Link",
  description: "Book appointments, ambulance services, and more with ease.",
};

const Root = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          {children}
        </body>
      </Provider>
    </html>
  );
};

export default Root;
