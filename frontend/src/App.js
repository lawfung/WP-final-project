import SwitchPage from "./pages/switch";
import { BrowserRouter, NavLink} from 'react-router-dom'
import { Toolbar, AppBar, Stack, Button, Typography } from '@mui/material';
import { useEffect } from "react";
import { useUsername } from "./tools/useUsername";
import { useCookies } from 'react-cookie';
import { useApolloClient  } from "@apollo/client";
import { Username_QUERY } from "./graphql";
// import { Input } from "@mui/material";

function LinkedButton({to, color, sty2, text, variant, height="100%"}) {
  return <NavLink to={to} style={{ textDecoration: 'none'}}>
            <Button color={color} style={{...sty2, height}} variant={variant} >
              {text}
            </Button>
          </NavLink>
}

function App() {
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
    <div style={{ display: "flex", flexDirection: "column",height: "100vh" }}>
      <BrowserRouter>
        <AppBar position="relative" sx={{zIndex: (theme) => 1299, background: 'orange'}}>
          <Toolbar>
            <LinkedButton to="/home" sty2={{ fontSize: '4vh', "fontFamily": "Roboto", color:"black"}} text="Awesome"/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Stack spacing={-0} direction="row" sx={{display: "flex", justifyContent: "space-around"}}>
                <LinkedButton to="/home" color="secondary" sty2={{ fontSize: '2.5vh', "fontFamily": "Nunito"}} text="Home"/>
                <LinkedButton to="/trade" color="secondary" sty2={{ fontSize: '2.5vh', "fontFamily": "Nunito"}} text="Moniter &amp; Backtest"/>
                {/* <LinkedButton to="/setting" color="secondary" sty2={{ fontSize: '2.5vh', "fontFamily": "Nunito"}} text="Setting"/> */}
              </Stack>
            </Typography>
            
            <Stack spacing={3} direction="row">
              <LinkedButton to="/register" variant="contained" text="Register"/>
              <LinkedButton to="/login" variant="contained" text="Login"/>
              <Button color="error" style={{height: "100%"}} variant="contained"> Logout </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <SwitchPage />
      </BrowserRouter>
    </div>
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

export default App;
