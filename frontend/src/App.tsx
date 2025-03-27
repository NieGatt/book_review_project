import { UserContextProvider } from "./context/user-context"
import { AppRoutes } from "./routes/routes"

function App() {
  return <UserContextProvider>
    {<AppRoutes />}
  </UserContextProvider>
}

export default App