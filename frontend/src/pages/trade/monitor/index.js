import { Button, Stack, Grid, Item } from "@mui/material";
const monitor = () => {
    return (
        <div style={{display: "flex", height: "100%", flexDirection: "row"}}>
            <div style={{background: 'aliceblue', height: "100%", width : "50%", overflow : "auto"}}>
                <Stack spacing={-0} direction="row" sx={{display: "flex", justifyContent: "space-around", marginTop: "2vh"}}>
                    <Button variant="contained" sx={{ fontSize: '2vh', "fontFamily": "", textTransform: "none"}} > Go LEFT </Button>
                    <Button variant="contained" sx={{ fontSize: '2vh', "fontFamily": "", textTransform: "none"}}> Go FULL size </Button>
                    <Button variant="contained" sx={{ fontSize: '2vh', "fontFamily": "", textTransform: "none"}}> Go RIGHT </Button>
                </Stack>
                <Grid container spacing={1} sx={{marginTop: "0.4rem"}}>
                    <Grid item xs={6} sx={{display: "flex", justifyContent: "space-around"}}>
                        start time: 2021/Jun/08 20:00:00
                    </Grid>
                    <Grid item xs={6} sx={{display: "flex", justifyContent: "space-around"}}>
                        end time:  2021/Jun/08 20:00:00
                    </Grid>
                    <Grid item xs={6} sx={{display: "flex", justifyContent: "space-around"}}>
                        time scale: 15s
                    </Grid>
                </Grid>
            </div>
            <div style={{background: 'yellow', width : "50%"}}>
                wee
            </div>
        </div>
    )
}

export default monitor;