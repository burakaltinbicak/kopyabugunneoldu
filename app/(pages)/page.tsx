"use client"

import { useEffect, useState } from "react"
import GörüntüleButton from "@/components/Button/GörüntüleButton"
import HataError from "@/components/ErrorMessage/HataError"
import Loader from "@/components/Loader"
import NewsCardList from "@/components/NewsCard/NewsCardList"
import api from "@/lib/axios"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { useRouter } from "next/navigation"

export default function AnaSayfa() {
  const bugun = format(new Date(), "dd MMMM yyyy", { locale: tr })
  const [latest, setLatest] = useState<string[]>([])
  const [featured, setFeatured] = useState<{ summary: string } | null>(null)
  const [yukleniyor, setYukleniyor] = useState(true)
  const [hata, setHata] = useState(false)
  const router = useRouter()

  useEffect(() => {
    api.get("/homepage")
      .then(res => {
        setFeatured(res.data.featured)
        setLatest(res.data.latest.map((h: { title: string }) => h.title))
        setYukleniyor(false)
      })
      .catch(() => {
        setHata(true)
        setYukleniyor(false)
      })
  }, [])

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen bg-white overflow-hidden">

      {/* Sol */}
      <div
        className="w-full lg:w-2/3 flex relative min-h-[100svh] lg:min-h-0"
        style={{
          backgroundImage: "url('/assets/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(207, 22, 28, 0.88)" }} />

        <div
          className="w-6 lg:w-8 h-full flex-shrink-0 relative z-10"
          style={{ background: "linear-gradient(to bottom, transparent 14%, #ffffff 14%)" }}
        />

        <div className="flex flex-col p-6 lg:p-10 relative z-10 flex-1">
          <div className="flex flex-col h-full">

            <div className="absolute top-6 lg:top-10" style={{ left: "0px" }}>
              <img src="/assets/htlogo.png" alt="Logo" className="h-7 lg:h-10 object-contain" />
            </div>

            <div className="flex flex-col gap-1 flex-1 justify-center pt-16 lg:pt-0">
              <p className="text-white font-bold text-xs lg:text-sm">{bugun}</p>
              <h1 className="font-[family-name:var(--font-abril)] text-white text-[60px] leading-[68px] sm:text-[90px] sm:leading-[100px] md:text-[110px] md:leading-[124px] lg:text-[140px] lg:leading-[160px] xl:text-[160px] xl:leading-[182px]" style={{ fontWeight: 400 }}>
                Bugün<br />ne oldu?
              </h1>
              <p className="text-white text-xs lg:text-sm opacity-80 max-w-sm">
                {featured?.summary || ""}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex flex-col gap-1">
                  <div className="w-5 h-0.5 bg-white" />
                  <div className="w-5 h-0.5 bg-white" />
                  <div className="w-5 h-0.5 bg-white" />
                </div>
                <GörüntüleButton onClick={() => router.push("/news")} />
              </div>
            </div>

            <p className="text-white text-xs opacity-60 mt-6 lg:mt-0">
              Copyright © 2026 - Tüm hakları saklıdır. Habertürk Gazetecilik A.Ş.
            </p>

          </div>
        </div>
      </div>

      {/* Sağ */}
      <div className="flex-1 lg:h-full flex items-center justify-center">
        {yukleniyor ? (
          <Loader />
        ) : hata ? (
          <HataError />
        ) : (
          <NewsCardList haberler={latest} />
        )}
      </div>

    </div>
  )
}