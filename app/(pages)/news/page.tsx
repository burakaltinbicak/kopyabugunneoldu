"use client"

import { useEffect, useState } from "react"
import MainLayout from "@/components/MainLayout"
import NewsCardSlider from "@/components/NewsCard/NewsCardSlider"
import Loader from "@/components/Loader"
import HataError from "@/components/ErrorMessage/HataError"
import BoşError from "@/components/ErrorMessage/BoşError"
import api from "@/lib/axios"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import SearchBar from "@/components/SearchBar/SearchBar"

export default function NewsPage() {
    const bugun = format(new Date(), "yyyy-MM-dd", { locale: tr })
    const [haberler, setHaberler] = useState([])
    const [ozet, setOzet] = useState("")
    const [kategoriler, setKategoriler] = useState<{ title: string, slug: string }[]>([])
    const [yukleniyor, setYukleniyor] = useState(true)
    const [hata, setHata] = useState(false)
    const [aramaQuery, setAramaQuery] = useState("")

    useEffect(() => {
        api.get("/news")
            .then(res => {
                setHaberler(res.data.news.map((h: any) => ({
                    id: h._id,
                    slug: h.slug,
                    zaman: new Date(h.publishedAt).toLocaleDateString("tr-TR"),
                    baslik: h.title,
                    gorsel: h.coverImage,
                    ozet: h.summary,
                })))
                if (res.data.news.length > 0) {
                    setOzet(res.data.news[0].summary)
                }
                setYukleniyor(false)
            })
            .catch(err => {
                setHata(true)
                setYukleniyor(false)
            })

        api.get("/categories")
            .then(res => {
                setKategoriler(res.data.map((k: any) => ({ title: k.title, slug: k.slug })))
            })
            .catch(err => {
                setHata(true)
                setYukleniyor(false)
            })
    }, [])

    const handleFilter = (query: string, category: string, sort: string) => {
        setAramaQuery(query)

        const params = new URLSearchParams()
        if (query) params.append("search", query)
        if (category) params.append("category", category)
        if (sort) params.append("sort", sort)

        api.get(`/news?${params.toString()}`)
            .then(res => {
                setHaberler(res.data.news.map((h: any) => ({
                    id: h._id,
                    slug: h.slug,
                    zaman: new Date(h.publishedAt).toLocaleDateString("tr-TR"),
                    baslik: h.title,
                    gorsel: h.coverImage,
                    ozet: h.summary,
                })))
            })
            .catch(() => {
                setHata(true)
            })
    }

    if (yukleniyor) return (
        <div className="flex items-center justify-center h-screen bg-white">
            <Loader />
        </div>
    )

    if (hata) return (
        <div className="flex items-center justify-center h-screen bg-white">
            <HataError />
        </div>
    )


    return (
        <MainLayout kategoriler={kategoriler}>
            <div className="flex flex-col lg:flex-row h-full bg-white">
                <div className="flex flex-col justify-center p-6 lg:p-12 w-full lg:w-1/4">
                    <div className="mb-24">
                        <SearchBar onFilter={handleFilter} />
                    </div>
                    <p className="text-black text-sm font-bold mb-4">{bugun}</p>
                    <h1 className="font-[family-name:var(--font-abril)] text-black text-3xl sm:text-4xl lg:text-6xl leading-tight mb-6">
                        Bugün ne oldu?
                    </h1>
                    <p className="text-gray-500 text-sm leading-relaxed">{ozet}</p>
                </div>

                <div className="flex-1 h-64 sm:h-80 lg:h-full overflow-hidden">
                    {haberler.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                            <BoşError />
                        </div>
                    ) : (
                        <NewsCardSlider haberler={haberler} reklamGorseli="/assets/reklam.png" />
                    )}
                </div>
            </div>
        </MainLayout>
    )
}