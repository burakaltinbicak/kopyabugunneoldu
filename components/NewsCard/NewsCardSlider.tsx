"use client"

import React, { useRef } from "react"
import { useRouter } from "next/navigation"
import DetayButton from "../Button/DetayButton"
interface Haber {
    _id: string
    id: string
    slug: string
    zaman: string
    baslik: string
    gorsel: string
    ozet: string
}

interface props {
    haberler: Haber[]
    reklamGorseli: string
}

export default function NewsCardSlider({ haberler, reklamGorseli }: props) {
    const sliderRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)
    const router = useRouter()

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true
        startX.current = e.clientX
        scrollLeft.current = sliderRef.current!.scrollLeft
        sliderRef.current!.style.cursor = "grabbing"
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return
        sliderRef.current!.scrollLeft = scrollLeft.current - (e.clientX - startX.current)
    }

    const handleMouseUp = () => {
        isDragging.current = false
        sliderRef.current!.style.cursor = "grab"
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX
        scrollLeft.current = sliderRef.current!.scrollLeft
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        sliderRef.current!.scrollLeft = scrollLeft.current - (e.touches[0].clientX - startX.current)
    }



    return (
        <div
            ref={sliderRef}
            className="flex h-full overflow-x-auto scrollbar-hide"
            style={{ userSelect: "none", cursor: "grab" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            {haberler.map((haber, index) => (
                <React.Fragment key={haber.id || index}>
                    <div
                        className={`flex-shrink-0 w-40 sm:w-48 lg:w-56 h-full border-r border-[#DEDEDE] px-3 sm:px-4 lg:px-6 py-4 transition-colors duration-200 flex flex-col justify-center ${index === 0 ? "border-l" : ""}`}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-cream)")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                        <p className="text-gray-400 text-xs mb-2">{haber.zaman}</p>
                        <p className="text-black font-bold text-xs sm:text-sm mb-3 leading-snug">{haber.baslik}</p>
                        <img

                            src={haber.gorsel}
                            alt={haber.baslik}
                            className="w-full h-24 sm:h-28 lg:h-32 object-cover mb-3"
                            draggable={false}
                        />
                        <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-3">{haber.ozet}</p>
                        <DetayButton onClick={() => router.push(`/news/${haber.id}`)} />
                    </div>
                    {(index + 1) % 4 === 0 && (
                        <div className="flex-shrink-0 w-40 sm:w-48 lg:w-56 h-full border-r border-[#DEDEDE] flex items-center justify-center">
                            <img
                                src={reklamGorseli}
                                alt="Reklam"
                                className="object-contain"
                                draggable={false}
                            />
                        </div>
                    )}
                </React.Fragment>
            ))
            }
        </div >
    )
}
