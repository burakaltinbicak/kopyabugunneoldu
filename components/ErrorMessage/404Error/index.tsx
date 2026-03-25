"use client"

import TamamButton from "@/components/Button/TamamButton";
import { useRouter } from "next/navigation";


export default function Error404() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white gap-4">
            <h1
                className="font-[family-name:var(--font-abril)] text-[120px] sm:text-[180px] lg:text-[240px] leading-none"
                style={{ color: "var(--color-primary)" }}
            >
                404
            </h1>
            <p className="font-[family-name:var(--font-poppins)] text-gray-400 text-sm sm:text-base">
                Aradığın sayfa bulunamadı.
            </p>
            <TamamButton onClick={() => router.push("/")} />
        </div>
    );
}
