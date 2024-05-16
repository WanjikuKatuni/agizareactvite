import react from "react"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import CustomerOrderDetails from "./pages/CustomerOrderDetails"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
      />
      <Route path="/customers/details/:customerId" element={
        <ProtectedRoute>
          <CustomerOrderDetails/>
        </ProtectedRoute>
      }
      />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<RegisterAndLogout/>} />
      <Route path="/logout" element={<Logout/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
