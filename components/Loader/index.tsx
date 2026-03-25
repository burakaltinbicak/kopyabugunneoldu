export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 p-10">
            <div className="w-8 h-8 border-4 border-[#DEDEDE] border-t-red-500 rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Yükleniyor...</p>
        </div>
    )
}