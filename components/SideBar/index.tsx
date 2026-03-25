"use client"
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export interface Kategori {
    name: string;
    slug: string;
}


function Sidebar({ kategoriler }: { kategoriler: Kategori[] }) {
    const [acik, setAcik] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const toggle = () => setAcik(!acik)

    useEffect(() => {
        if (acik) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [acik])

    const handleKategoriClick = () => {
        setAcik(false)
    }

    return (
        <>
            {acik && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={toggle}
                    aria-hidden="true"
                />
            )}

            <div className={`relative flex h-full transition-all duration-300 ${acik ? "w-[80vw] sm:w-80 md:w-96" : "w-12"}`}>


                <div className="absolute top-4 left-0 w-12 flex justify-center z-20">
                    <Link href="/" onClick={handleKategoriClick}>
                        <img src="/assets/htlogo.png" alt="Logo" className="h-8 object-contain cursor-pointer" />
                    </Link>
                </div>

                <button
                    type="button"
                    aria-label="Menüyü Aç/Kapat"
                    className="w-12 flex flex-col items-center cursor-pointer flex-shrink-0 h-full overflow-hidden relative border-none bg-transparent p-0 outline-none"
                    onClick={toggle}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundColor: "var(--color-primary)",
                            clipPath: acik ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 90% 0%)",
                            transition: "clip-path 0.4s ease",
                        }}
                    />
                    <div className="absolute inset-0 bg-white" style={{ zIndex: -1 }} />

                    <div className="flex-1 flex items-center justify-center relative z-10">
                        <span className={`font-black text-base ${acik ? "text-white" : "text-black"}`}>
                            {acik ? "✕" : "☰"}
                        </span>
                    </div>
                    <div className="pb-4 relative z-10">
                        <span
                            className="w-1.5 h-1.5 rounded-full block"
                            style={{ backgroundColor: acik ? "#ffffff" : "var(--color-primary)" }}
                        />
                    </div>
                </button>

                {/* Sidebar içeriği */}
                <div
                    className="flex flex-col overflow-hidden flex-shrink-0"
                    style={{
                        backgroundColor: "var(--color-primary)",
                        width: acik ? "calc(100% - 48px)" : "0px",
                        height: "100%",
                        transition: "width 0.4s ease",
                    }}
                >
                    <div className="p-6 pb-2 opacity-0" aria-hidden="true">
                        <img src="/assets/htlogo.png" alt="Logo" className="h-8 object-contain" />
                    </div>

                    <div className="flex flex-col gap-1 px-5 sm:px-8 flex-1 justify-center">

                        {kategoriler.map((kategori) => {
                            const href = kategori.slug === "anasayfa" ? "/news" : `/category/${kategori.slug}`;
                            const isAktif = pathname === href;

                            const handleNavigation = (e: React.MouseEvent) => {
                                e.preventDefault();
                                handleKategoriClick();
                                router.push(href);
                            };

                            return (
                                <div
                                    key={kategori.slug || kategori.name}
                                    onClick={handleNavigation}
                                    className={`cursor-pointer text-left text-base sm:text-lg font-bold transition-colors py-1 hover:text-red-200 ${isAktif ? "text-red-300" : "text-white"}`}
                                >
                                    {kategori.name}
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex gap-3 p-5 sm:p-8">
                        <img src="/assets/facebook.svg" alt="Facebook" className="w-4 h-4" />
                        <img src="/assets/twitter.svg" alt="Twitter" className="w-4 h-4" />
                        <img src="/assets/linkedin.svg" alt="LinkedIn" className="w-4 h-4" />
                    </div>
                </div>

            </div>
        </>
    )
}
export default Sidebar