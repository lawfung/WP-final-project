import SwitchPage from "./pages/switch";
import { BrowserRouter, NavLink} from 'react-router-dom'
import { Toolbar, AppBar, Stack, Button, Typography } from '@mui/material';

function LinkedButton({to, color, sty2, text, variant, height="100%"}) {
  return <NavLink to={to} style={{ textDecoration: 'none'}}>
            <Button color={color} style={{...sty2, height}} variant={variant} >
              {text}
            </Button>
          </NavLink>
}

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column",height: "100vh" }}>
      <BrowserRouter>
        <AppBar position="relative" sx={{zIndex: (theme) => 8000, background: 'orange'}}>
          <Toolbar>
            <LinkedButton to="/home" sty2={{ fontSize: '4vh', "fontFamily": "Roboto", color:"black"}} text="Awesome"/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Stack spacing={-0} direction="row" sx={{display: "flex", justifyContent: "space-around"}}>
                <LinkedButton to="/home" color="secondary" sty2={{ fontSize: '2.5vh', "fontFamily": "Nunito"}} text="Home"/>
                <LinkedButton to="/trade" color="secondary" sty2={{ fontSize: '2.5vh', "fontFamily": "Nunito"}} text="Moniter &amp; Backtest"/>
                <LinkedButton to="/setting" color="secondary" sty2={{ fontSize: '2.5vh', "fontFamily": "Nunito"}} text="Setting"/>
              </Stack>
            </Typography>
            
            <Stack spacing={2} direction="row">
              <LinkedButton to="/register" variant="contained" text="Register"/>
              <LinkedButton to="/login" variant="contained" text="Login"/>
            </Stack>
          </Toolbar>
        </AppBar>
        <SwitchPage />
      </BrowserRouter>
    </div>
  )
}

export default App;
