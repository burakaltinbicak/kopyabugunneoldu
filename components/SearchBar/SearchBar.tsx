"use client"

import { useState, useEffect } from "react"
import api from "@/lib/axios"

interface Category {
    _id: string
    title: string
}

interface Props {
    onFilter: (query: string, category: string, sort: string) => void
}

export default function SearchBar({ onFilter }: Props) {
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("")
    const [sort, setSort] = useState("newest")
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        api.get("/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onFilter(query, category, sort)
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [query, category, sort])

    return (
        <div className="flex flex-col gap-3 w-full">
            <input
                type="text"
                placeholder="Haberlerde ara..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg outline-none text-black focus:border-black transition-colors"
            />

            <div className="flex gap-2">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-2 py-2 text-sm outline-none text-black bg-white"
                >
                    <option value="">Tüm Kategoriler</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.title}</option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-2 py-2 text-sm outline-none text-black bg-white"
                >
                    <option value="newest">En Yeni</option>
                    <option value="oldest">En Eski</option>
                </select>
            </div>
        </div>
    )
}