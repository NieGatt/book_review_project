import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../components/home"

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home} />
            </Routes>
        </BrowserRouter>
    )
} 