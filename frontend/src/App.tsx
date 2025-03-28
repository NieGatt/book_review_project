import { BrowserRouter } from "react-router-dom"
import { UserContextProvider } from "./context/user-context"
import { AppRoutes } from "./routes/routes"
import { Header } from "./components/header"

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Header />
        <AppRoutes />
      </UserContextProvider>
    </BrowserRouter>
  )
}
export default App