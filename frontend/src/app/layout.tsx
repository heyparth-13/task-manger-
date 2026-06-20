import { Outfit } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow | Premium Task Management",
  description: "A handcrafted, portfolio-worthy task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased bg-gray-50 text-gray-900 selection:bg-indigo-100 selection:text-indigo-900`}
      >
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'font-sans rounded-xl shadow-lg border border-gray-100',
              duration: 4000,
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
