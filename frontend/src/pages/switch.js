import {TradePage} from "./trade/trade"
import {Routes, Route } from 'react-router-dom'
export function SwitchPage() {
    return <Routes>
        <Route path="/trade" element={<TradePage/>}></Route>
    </Routes>
}