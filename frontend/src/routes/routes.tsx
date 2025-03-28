import { Route, Routes } from "react-router-dom"
import { Home } from "../components/home"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
        </Routes>
    )
} 