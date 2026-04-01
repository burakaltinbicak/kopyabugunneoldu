
"use client"

import { useEffect, useState, use } from "react"
import MainLayout from "@/components/MainLayout"
import NewsCardDetail from "@/components/NewsCard/NewsCardDetail"
import Loader from "@/components/Loader"
import HataError from "@/components/ErrorMessage/HataError"
import BoşError from "@/components/ErrorMessage/BoşError"
import api from "@/lib/axios"


export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [haberler, setHaberler] = useState([])
    const [kategoriler, setKategoriler] = useState<{ title: string; slug: string }[]>([])
    const [yukleniyor, setYukleniyor] = useState(true)
    const [hata, setHata] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        api.get("/news")
            .then(res => {
                const donusturulmusHaberler = res.data.news.map((h: any, index: number) => ({
                    id: h._id,
                    slug: h.slug,
                    numara: String(index + 1).padStart(2, "0"),
                    zaman: new Date(h.publishedAt).toLocaleDateString("tr-TR"),
                    baslik: h.title,
                    gorsel: h.coverImage,
                    kucukGorsel: h.coverImage,
                    ozet: h.summary,
                    icerik: h.content,
                }));


                setHaberler(donusturulmusHaberler);


                setYukleniyor(false);
            })
            .catch(err => {
                setHata(true)
                setYukleniyor(false)
            });

        api.get("/categories")
            .then(res => {
                setKategoriler(res.data.map((k: any) => ({ title: k.title, slug: k.slug })))

            })
            .catch(err => {
                setHata(true)
                setYukleniyor(false)
            })
    }, [])
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
            <div className="h-full">
                <NewsCardDetail haberler={haberler} seciliId={id} />
            </div>
        </MainLayout>
    )
}