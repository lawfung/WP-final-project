import HomePage from "./home";
import TradePage from "./trade";
import LoginPage from "./login";
import RegisterPage from "./register";
import { Routes, Route } from 'react-router-dom';

export default function SwitchPage() {
    return (
        <Routes>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/trade" element={<TradePage/>}></Route>
            <Route path="/register" element={<RegisterPage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
    )
}