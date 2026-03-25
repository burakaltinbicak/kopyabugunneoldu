"use client"

interface Props { onClick: () => void }

export default function GörüntüleButton({ onClick }: Props ) {
    return (<button onClick={onClick} className="border border-[#DEDEDE] bg-white text-red-500 font-bold text-xs px-6 py-2 md:text-sm md:px-8 md:py-2.5 cursor-pointer"

    >
        Görüntüle
    </button>);
}    