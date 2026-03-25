"use client"

import Sidebar from "../SideBar"
import { Kategori } from "@/components/SideBar"

interface Props {
    children: React.ReactNode
    sidebarGoster?: boolean
    kategoriler: Kategori[]
}

export default function MainLayout({ children, sidebarGoster = true, kategoriler }: Props) {
    return (
        <div className="flex min-h-screen lg:h-screen bg-white relative">

            <div className="flex flex-col flex-1 overflow-hidden pl-12">
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>

            </div>

            {sidebarGoster && (
                <div className="absolute left-0 top-0 bottom-0 z-50">
                    <Sidebar kategoriler={kategoriler} />
                </div>
            )}

        </div>
    )
}