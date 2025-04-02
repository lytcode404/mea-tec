// src/app/layout.js
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Task Manager App",
  description:
    "A full-stack task manager application with secure authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
