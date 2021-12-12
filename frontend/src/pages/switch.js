import TradePage from "./trade"
import LoginPage from "./login"
import { Routes, Route } from 'react-router-dom'
export default function SwitchPage() {
    return <Routes>
        <Route path="/trade" element={<TradePage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
    </Routes>
}