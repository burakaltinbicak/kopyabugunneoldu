"use client"

import React, { useRef } from "react"
import { useRouter } from "next/navigation"

interface Props {
    haberler: { _id: string; title: string; slug: string }[]
}

export default function NewsCardList({ haberler }: Props) {
    const router = useRouter()
    const listRef = useRef<HTMLDivElement>(null)

    const isDragging = useRef(false)
    const startY = useRef(0)
    const scrollTop = useRef(0)
    const hasDragged = useRef(false)

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true
        hasDragged.current = false
        startY.current = e.clientY
        scrollTop.current = listRef.current!.scrollTop
        listRef.current!.style.cursor = "grabbing"
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return
        const delta = e.clientY - startY.current
        if (Math.abs(delta) > 10) {
            hasDragged.current = true
        }
        listRef.current!.scrollTop = scrollTop.current - delta
    }

    const handleMouseUp = () => {
        isDragging.current = false
        if (listRef.current) listRef.current.style.cursor = "grab"
    }
    const handleCardClick = (haber: { _id: string; title: string; slug: string }) => {
        if (hasDragged.current) return
        router.push(`/news/${haber._id}`)
    }

    return (
        <div className="relative w-full h-full overflow-hidden bg-white">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

            <div
                ref={listRef}
                className="h-full overflow-y-auto scrollbar-hide px-4 sm:px-8 lg:px-16"
                style={{ cursor: "grab", userSelect: "none", scrollBehavior: "auto" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div className="py-24">
                    {haberler.map((haber, index) => (
                        <div
                            key={index}
                            className="group py-6 cursor-pointer border-b border-[#DEDEDE] last:border-0 transition-all duration-200"
                            onClick={() => handleCardClick(haber)}
                        >
                            <p className="text-center font-[family-name:var(--font-poppins)] text-base sm:text-lg lg:text-2xl leading-relaxed text-[#333333] group-hover:text-red-600 transition-colors">
                                {haber.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}