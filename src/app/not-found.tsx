"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import FuzzyText from "./ui/fuzzytext";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Count down from n seconds before redirecting
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 text-center">
        <div className="mb-8">
          <div
            className="mb-4"
            style={{
              height: "120px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FuzzyText
              fontSize="6rem"
              fontWeight={900}
              color="#ffffff"
              baseIntensity={0.18}
              hoverIntensity={0.7}
            >
              404
            </FuzzyText>
          </div>
          <div className="h-0.5 w-16 bg-gray-500 mx-auto mb-8"></div>

          <div
            style={{
              marginBottom: "24px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FuzzyText
              fontSize="1.25rem"
              fontWeight={500}
              color="#e0e0e0"
              baseIntensity={0.08}
              hoverIntensity={0.4}
            >
              Page Not Found
            </FuzzyText>
          </div>

          <p className="text-gray-400 mb-6 font-light">
            The path{" "}
            <span className="font-mono bg-gray-800 px-1.5 py-0.5 rounded-sm text-sm">
              {pathname}
            </span>{" "}
            does not exist
          </p>

          <p className="text-gray-500 text-sm font-light mt-8">
            Redirecting to homepage in{" "}
            <span className="text-gray-300 font-medium">{countdown}</span>{" "}
            seconds...
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-white/90 px-5 py-2.5 text-black hover:bg-white transition-all duration-300 font-medium"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
