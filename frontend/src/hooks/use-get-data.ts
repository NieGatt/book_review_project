import { useState } from "react"

export const UseGetData = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleGetData = async () => {
        setLoading(true)
        const res = await fetch(url);
        const data = await res.json() as T
        setData(res.ok ? data : null);
        setLoading(false)
    };

    return { data, loading, handleGetData }
}