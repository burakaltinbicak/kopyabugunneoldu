"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import MainLayout from "@/components/MainLayout"
import NewsCardSlider from "@/components/NewsCard/NewsCardSlider"
import Loader from "@/components/Loader"
import HataError from "@/components/ErrorMessage/HataError"
import BoşError from "@/components/ErrorMessage/BoşError"
import api from "@/lib/axios"
import { format } from "date-fns"
import { tr } from "date-fns/locale"

export default function CategoryPage() {
    const { slug } = useParams()
    const bugun = format(new Date(), "dd,MM.yyyy", { locale: tr })

    const [haberler, setHaberler] = useState([])
    const [kategoriAdi, setKategoriAdi] = useState("")
    const [ozet, setOzet] = useState("")
    const [kategoriler, setKategoriler] = useState<{ name: string; slug: string }[]>([])
    const [yukleniyor, setYukleniyor] = useState(true)
    const [hata, setHata] = useState(false)

    useEffect(() => {

        if (!slug) return
        api.get(`/categories/${slug}/news`)
            .then(res => {
                setKategoriAdi(res.data.category.name)
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
                setKategoriler(res.data.map((k: any) => ({ name: k.name, slug: k.slug })))
            })
            .catch(err => {
                setHata(true)
                setYukleniyor(false)

            })
    }, [slug])

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

    if (haberler.length === 0) return (
        <div className="flex items-center justify-center h-screen bg-white">
            <BoşError />
        </div>
    )
    return (
        <MainLayout kategoriler={kategoriler}>
            <div className="flex flex-col lg:flex-row h-full bg-white">

                {/* Sol - İçerik */}
                <div className="flex flex-col justify-center p-6 lg:p-12 w-full lg:w-1/4">
                    <p className="text-black text-sm font-bold mb-4">{bugun}</p>
                    <h1 className="font-[family-name:var(--font-abril)] text-black text-3xl sm:text-4xl lg:text-6xl leading-tight mb-6">
                        {kategoriAdi}
                    </h1>
                    <p className="text-gray-500 text-sm leading-relaxed">{ozet}</p>
                </div>

                {/* Sağ - NewsCardSlider */}
                <div className="flex-1 h-64 sm:h-80 lg:h-full overflow-hidden">
                    <NewsCardSlider haberler={haberler} reklamGorseli="/assets/reklam.png" />
                </div>

            </div>
        </MainLayout>
    )
}