import { Button, Stack, Grid, ButtonGroup, Slider, InputLabel, MenuItem, FormControl, Select, Box } from "@mui/material";
import { useState } from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
const Monitor = () => {
    const marksTimes = ['1 min', '5 min', '15 min', '30 min', '1 hr', '2 hr', '4 hr', '1 day']
    const marks = marksTimes.map((x, i) => ({value: i, label: x}))
    const [chartType, setChartType] = useState('Histogram');
    const handleChartTypeChange = (event) => { setChartType(event.target.value);};
      
    return (
        <div style={{display: "flex", height: "100%", flexDirection: "row"}}>
            <div style={{background: 'aliceblue', height: "100%", width : "50%", overflow : "auto", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <ButtonGroup variant="contained" sx={{marginTop: "2vh"}}>
                    <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go LEFT</Button>
                    <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go FULL size</Button>
                    <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go RIGHT</Button>
                </ButtonGroup>
                <Grid container spacing={1} sx={{marginTop: "2vh"}}>
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
                <div style={{color : "red"}}>Here will be the graph</div>
                <Stack spacing={-30} direction="row" sx={{display: "flex", justifyContent: "space-around", marginTop: "2vh", width: "100%"}}>
                    <Button variant="contained" startIcon={<ArrowLeftIcon />} sx={{ fontSize: '2vh', "fontFamily": "", textTransform: "none"}}>
                        Back
                    </Button>
                    <Button variant="contained" endIcon={<ArrowRightIcon />} sx={{ fontSize: '2vh', "fontFamily": "", textTransform: "none"}}>
                        Next
                    </Button>
                </Stack>
                <Slider
                    // aria-label="Custom marks"
                    defaultValue={0}
                    // getAriaValueText={valuetext}
                    step={null}
                    marks={marks}
                    max={marksTimes.length - 1}
                    sx={{width: "30vw", marginTop: "2vh"}}
                    track={false}
                />
            </div>
            <div style={{background: 'antiquewhite', height: "100%", width : "50%", overflow : "auto", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Box sx={{ marginTop: "2vh" }}>
                <FormControl variant="filled">
                    <InputLabel>chart type</InputLabel>
                    <Select
                        value={chartType}
                        onChange={handleChartTypeChange}
                    >
                        <MenuItem value={"Histogram"}>Histogram</MenuItem>
                        <MenuItem value={"lineChart"}>Line chart</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            </div>
        </div>
    )
}

export default Monitor;