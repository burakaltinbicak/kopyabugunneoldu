"use client"
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface Haber {
    id: string
    numara: string
    zaman: string
    baslik: string
    gorsel: string
    kucukGorsel: string
    ozet: string
    icerik: string
}

interface props {
    haberler: Haber[]
    seciliId?: string
}

export default function NewsCardDetail({ haberler, seciliId }: props) {
    const [seciliHaber, setSeciliHaber] = useState<Haber | null>(null)
    const [detayAcik, setDetayAcik] = useState(false)
    const listRef = useRef<HTMLDivElement>(null)
    const detayRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const startY = useRef(0)
    const scrollTop = useRef(0)

    useEffect(() => {
        if (haberler.length > 0) {
            let decodedId = "";
            if (seciliId) {
                try {
                    decodedId = decodeURIComponent(seciliId);
                } catch (e) {
                    decodedId = seciliId;
                }
            }

            const haber = seciliId
                ? haberler.find(h => h.id === seciliId || (h as any).slug === seciliId || h.baslik === decodedId)
                : haberler[0];

            if (haber) {
                setSeciliHaber(haber);
                if (seciliId) setDetayAcik(true);
            } else {

                setSeciliHaber(null);
            }
        }
    }, [haberler, seciliId])

    useEffect(() => {
        if (detayRef.current) {
            detayRef.current.scrollTop = 0;
        }
    }, [seciliHaber])

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true
        startY.current = e.clientY
        scrollTop.current = listRef.current!.scrollTop
        listRef.current!.style.cursor = "grabbing"
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return
        listRef.current!.scrollTop = scrollTop.current - (e.clientY - startY.current)
    }

    const handleMouseUp = () => {
        isDragging.current = false
        listRef.current!.style.cursor = "grab"
    }

    const handleHaberClick = (haber: Haber) => {
        setSeciliHaber(haber)
        setDetayAcik(true)
    }

    return (
        <div className="flex h-full bg-white">
            {/* Sol Liste */}
            <div
                ref={listRef}
                className={`w-full lg:w-92 flex-shrink-0 overflow-y-auto scrollbar-hide ${detayAcik ? "hidden lg:block" : "block"}`}
                style={{ cursor: "grab", userSelect: "none" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {haberler.map(haber => (
                    <div
                        key={haber.id}
                        onClick={() => handleHaberClick(haber)}
                        className="flex gap-3 p-4 border-b border-[#DEDEDE] cursor-pointer transition-shadow duration-200 hover:shadow-md"
                        style={{ backgroundColor: seciliHaber?.id === haber.id ? "var(--color-cream)" : "white" }}
                    >

                        <span className="text-gray-300 text-lg font-bold w-8 flex-shrink-0">{haber.numara}</span>
                        <img
                            src={haber.kucukGorsel}
                            alt={haber.baslik}
                            className="w-16 h-12 sm:w-20 sm:h-16 object-cover flex-shrink-0"
                            draggable={false}
                        />
                        <div>
                            <p className="text-black text-xs font-bold leading-snug mb-1">{haber.baslik}</p>
                            <p className="text-gray-400 text-xs">{haber.zaman}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sağ - Detay Paneli */}
            <div
                ref={detayRef}
                className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ${detayAcik ? "block" : "hidden lg:block"}`}
                style={{ backgroundColor: "var(--color-cream)" }}
            >
                {seciliHaber ? (
                    <>
                        <button
                            className="lg:hidden flex items-center gap-2 text-sm font-bold text-gray-500 mb-4"
                            onClick={() => setDetayAcik(false)}
                        >
                            ← Haberlere dön
                        </button>

                        <h1 className="text-black font-bold text-xl sm:text-2xl mb-3 uppercase leading-tight">
                            {seciliHaber.baslik}
                        </h1>
                        <p className="text-gray-400 text-sm mb-6 italic">{seciliHaber.ozet}</p>
                        <Image
                            src={seciliHaber.gorsel}
                            alt={seciliHaber.baslik}
                            width={1200}
                            height={800}
                            className="w-full object-cover mb-6"
                        />
                        <p className="text-gray-600 text-sm leading-relaxed">{seciliHaber.icerik}</p>
                    </>
                ) : (
                    /* Haber bulunamadığında görünecek boş/placeholder alan */
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Lütfen bir haber seçiniz.
                    </div>
                )}
            </div>
        </div>
    )
}