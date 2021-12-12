import {SwitchPage} from "./pages/switch";
import { BrowserRouter, NavLink} from 'react-router-dom'
import { Toolbar, AppBar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Stack spacing={10} direction="row">
                <LinkedButton to="/home" sty2={{ fontSize: '2rem', "fontFamily": "Roboto", color:"black"}} text="Awesome"/>
                <LinkedButton to="/home" color="secondary" sty2={{ fontSize: '1.2rem', "fontFamily": "Nunito"}} text="Home"/>
                <LinkedButton to="/trade" color="secondary" sty2={{ fontSize: '1.2rem', "fontFamily": "Nunito"}} text="Moniter &amp; Backtest"/>
                <LinkedButton to="/setting" color="secondary" sty2={{ fontSize: '1.2rem', "fontFamily": "Nunito"}} text="Setting"/>
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
