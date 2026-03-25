"use client"

export default function HataError() {
    return (
        <div className="flex flex-col items-center gap-2 p-6 border border-[#DEDEDE]">
            <span className="text-red-500 text-3xl">!</span>
            <p className="text-black font-bold text-sm">Bir hata oluştu</p>
            <p className="text-gray-400 text-xs text-center">Haberler yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.</p>
        </div>
    )
}