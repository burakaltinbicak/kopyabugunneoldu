    "use client"

    export default function BoşError() {
        return (
            <div className="flex flex-col items-center gap-2 p-6 border border-[#DEDEDE]">
                <span className="text-gray-300 text-3xl">○</span>
                <p className="text-black font-bold text-sm">İçerik bulunamadı</p>
                <p className="text-gray-400 text-xs text-center">Aradığınız içerik mevcut değil veya kaldırılmış olabilir.</p>
            </div>
        )
    }