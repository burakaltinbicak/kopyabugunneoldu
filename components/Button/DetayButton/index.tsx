"use client"

interface Props {
    onClick: () => void
}

export default function DetayButton({ onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="border border-[#DEDEDE] text-black font-bold text-xs px-4 py-2 md:text-sm md:px-5 md:py-2.5 lg:w-[90px] lg:h-[40px] cursor-pointer"
        >
            Detay
        </button>
    );
}