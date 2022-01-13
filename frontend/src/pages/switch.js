import HomePage from "./home";
import TradePage from "./trade";
import LoginPage from "./login";
import RegisterPage from "./register";
import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useUsername } from "../tools/useUsername";
export default function SwitchPage() {
    const {changeUsername} = useUsername();
    useEffect( () =>{
        changeUsername("LYB");
    }, [])
    // TODO :
    // (only when enter this website or refresh)
    // check cookie for auto-login (need to ask backend) (then setUserName and setLogin)
    // otherwise, clear cookie
    return (
        <Routes>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/trade" element={<TradePage/>}></Route>
            <Route path="/register" element={<RegisterPage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
    )
}
