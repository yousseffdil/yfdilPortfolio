import "./global.css";
import type { Metadata } from "next";
import { CustomCursor } from "./Components/CustomCursor";
import { ThemeProvider } from "./context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "YOUSSEF FDIL | Portfolio",
  description: "A minimalist portfolio",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {children}
      <Analytics />
      <CustomCursor />
    </ThemeProvider>
  );
}
