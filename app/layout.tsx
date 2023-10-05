"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Button from "@mui/material/Button";
import { Router } from "react-router-dom";
import { Box } from "@mui/material";
import Provider from "./GlobalRedux/store/Provider";
import { store } from "./GlobalRedux/store/store";
import Link from "next/link";
import { Suspense } from "react";
import LoadingState from "@/components/ui/loadingState";
import CachedIcon from "@mui/icons-material/Cached";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Suspense fallback={<LoadingState />}>
        <body className="h-screen bg-gray-100">
          <Provider>
            <nav className="bg-blue-400 p-4">
              <div className="container mx-auto flex justify-start items-center">
                {" "}
                {/* Change justify-end to justify-start */}
                <CachedIcon
                  className="text-white hover:text-gray-300 mr-4 cursor-pointer"
                  onClick={() => window.location.reload()}
                />{" "}
                {/* Reload icon */}
                <Link
                  href="/patients"
                  className="text-white hover:text-gray-300 mr-4"
                >
                  Patients
                </Link>
                <Link
                  href="/patients/editLayout"
                  className="text-white hover:text-gray-300"
                >
                  Edit Layout
                </Link>
              </div>
            </nav>
            <div className="h-full">{children}</div>
          </Provider>
        </body>
      </Suspense>
    </html>
  );
}
