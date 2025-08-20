import {Routes, Route} from "react-router-dom"
import Home from "./views/Home.jsx"
import LoginPage from "./views/LoginPage.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import RegisterPage from "./views/RegisterPage.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/login-page" element={<LoginPage/>}/>
      <Route path="/register-page" element={<RegisterPage/>} />
    </Routes>
  )
}

export default App
