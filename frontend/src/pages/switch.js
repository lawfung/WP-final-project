import HomePage from "./home";
import TradePage from "./trade";
import LoginPage from "./login";
import RegisterPage from "./register";
import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useUsername } from "../tools/useUsername";
import { useCookies } from 'react-cookie';
import { useApolloClient  } from "@apollo/client";
import { Username_QUERY } from "../graphql";
// import { Input } from "@mui/material";

export default function SwitchPage() {
    const [cookies, _] = useCookies(['session']); 
    const {changeUsername} = useUsername();
    const client = useApolloClient();
    useEffect( () =>{
        async function dummy() {
            console.log("get username");
            const cookie = cookies.session;
            if(cookie) {
                console.log("gogo")
                const res = await client.query({
                    query: Username_QUERY,
                    variables: {cookie}
                });
                const name = res.data.GetUsername;
                if(name){
                    changeUsername(name);
                    return;
                }
            }
            changeUsername("");
        }
        dummy();
    }, [client, changeUsername, cookies]);
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
// export default function App() {
//     const [cookies, setCookie] = useCookies(['name']); 
//     function onChange(X) {
//         const newName = X.target.value
//         console.log(newName)
//       setCookie('name', newName, { path: '/' });
//     }

//     return (
//       <div>
//         <Input value={cookies.name} onChange={onChange} />
//         {cookies.name && <h1>Hello {cookies.name}!</h1>}
//       </div>
//     );
// }