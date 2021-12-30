import { Button, Stack, Grid, ButtonGroup, Slider, InputLabel, MenuItem, FormControl, Select, Box, Chip, TextField } from "@mui/material";
import { useState } from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
const marksTimes = ['1 min', '5 min', '15 min', '30 min', '1 hr', '2 hr', '4 hr', '1 day'];
const indexList = ["MA", "EMA"];
const Monitor = () => {
    const marks = marksTimes.map((x, i) => ({value: i, label: x}));
    const [chartType, setChartType] = useState('Histogram');
    const handleChartTypeChange = (event) => { setChartType(event.target.value);};
    const [indexType, setIndexType] = useState([]);
    const handleIndexChange = (event) => {
        const { target: { value }} = event;
        setIndexType(typeof value === 'string' ? value.split(',') : value);
    };
    const [startTime, setStartTime] = useState('2021-01-01T00:00');
    const handleStratTimeChange = (event) => { setStartTime(event.target.value); };
    const [endTime, setEndTime] = useState('2022-01-01T00:00');
    const handleEndTimeChange = (event) => { setEndTime(event.target.value);};
    const [assetType, setAssetType] = useState('BTC');
    const handleAssetTypeChange = (event) => { setAssetType(event.target.value); };
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
                        start time: 2021 Jun 08 20:00:00
                    </Grid>
                    <Grid item xs={6} sx={{display: "flex", justifyContent: "space-around"}}>
                        end time:  2021 Jun 08 20:00:00
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
            </div>
            <div style={{background: 'antiquewhite', height: "100%", width : "50%", overflow : "auto", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Stack spacing={-20} direction="row" sx={{display: "flex", justifyContent: "space-around", marginTop: "2vh", width: "100%"}}>
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
                    <FormControl variant="filled" sx={{ minWidth: "10vw", minHeight: "12vh" }}>
                        <InputLabel>index type</InputLabel>
                        <Select
                            value={indexType}
                            onChange={handleIndexChange}
                            multiple
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                    {selected.map((value) => (<Chip key={value} label={value} />))}
                                </Box>
                            )}
                        >
                            {indexList.map(
                                (x) => (<MenuItem value={x} key={x}>{x}</MenuItem>)
                            )}
                        </Select>
                    </FormControl>
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
                <div style={{width: "100%"}}>
                <FormControl variant="standard" sx={{marginTop: "2vh",marginLeft: "2vh",marginRight: "2vh", border: 1}}>
                    <div style={{margin: "2vh"}}>
                        <Grid container spacing={1}>
                            <Grid item xs={8} sx={{display: "flex", justifyContent: "space-around"}}>
                                <TextField label="Start time" value={startTime} type="datetime-local" onChange={handleStratTimeChange} InputLabelProps={{ shrink: true }}/>
                            </Grid>
                            <Grid item xs={4} sx={{display: "flex", justifyContent: "space-around"}}>
                                <TextField label="Asset type" value={assetType} onChange={handleAssetTypeChange}/>
                            </Grid>
                            <Grid item xs={8} sx={{display: "flex", justifyContent: "space-around"}}>
                                <TextField label="End time" value={endTime} type="datetime-local" onChange={handleEndTimeChange} InputLabelProps={{ shrink: true }}/>
                            </Grid>
                            <Grid item xs={4} sx={{display: "flex", justifyContent: "space-around"}}>
                                <Button> Set </Button>
                            </Grid>
                        </Grid>
                    </div>
                </FormControl>
                </div>
            </div>
        </div>
    )
}

export default Monitor;