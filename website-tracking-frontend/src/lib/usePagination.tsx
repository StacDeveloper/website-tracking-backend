import { useState, useMemo } from "react"

export function usePagination(items: any[], pagesize: number = 10) {
    const [page, setPage] = useState<number>(1)

    const totalPages = Math.max(1, Math.ceil(items.length / pagesize))

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * pagesize
        return items.slice(start, start + pagesize)
    }, [items, page, pagesize])

    if (page > pagesize) setPage(totalPages)
    return { page, setPage, totalPages, paginatedItems }
}