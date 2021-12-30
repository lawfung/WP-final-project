import { Button, Stack, Grid, ButtonGroup, Slider, InputLabel, MenuItem, FormControl, Select, Box, Chip, TextField } from "@mui/material";
import { useState } from "react";
import {ArrowLeft, ArrowRight} from '@mui/icons-material';
import styled from "styled-components";
const HalfWrapper = styled.div`
    height: 100%;
    width : 50%;
    overflow : auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const MyGrid = styled(Grid)`
    display: flex;
    justify-content: space-around;
`
const MyStack = styled(Stack)`
    display: flex;
    justify-content: space-around;
    margin-top: 2vh;
    width: 100%;
`
const marksTimes = ['1 min', '5 min', '15 min', '30 min', '1 hr', '2 hr', '4 hr', '1 day'];
const indexList = ["MA", "EMA"];
const Monitor = () => {
    const handleChange = (f) => ((e) => {f(e.target.value);})
    const marks = marksTimes.map((x, i) => ({value: i, label: x}));
    const [chartType, setChartType] = useState('Histogram');
    const [indexType, setIndexType] = useState([]);
    const handleIndexChange = (event) => {
        const value = event.target.value;
        setIndexType(typeof value === 'string' ? value.split(',') : value);
    };
    const [startTime, setStartTime] = useState('2021-01-01T00:00');
    const [endTime, setEndTime] = useState('2022-01-01T00:00');
    const [assetType, setAssetType] = useState('BTC');
    const sizeSwitch = 
        <ButtonGroup variant="contained" sx={{marginTop: "2vh"}}>
            <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go LEFT</Button>
            <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go FULL size</Button>
            <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go RIGHT</Button>
        </ButtonGroup>
    const attrPanel = 
        <Grid container spacing={1} sx={{marginTop: "2vh"}}>
            <MyGrid item xs={6}>Start time: 2021 Jun 08 20:00:00</MyGrid>
            <MyGrid item xs={6}>End time:  2021 Jun 08 20:00:00</MyGrid>
            <MyGrid item xs={6}>Time scale: 15s</MyGrid>
        </Grid>
    const backAndNext =
        <MyStack spacing={-30} direction="row">
            <Button variant="contained" startIcon={<ArrowLeft />} sx={{ fontSize: '2vh', "fontFamily": "", textTransform: "none"}}>Back</Button>
            <Button variant="contained" endIcon={<ArrowRight />} sx={{ fontSize: '2vh', "fontFamily": "", textTransform: "none"}}>Next</Button>
        </MyStack>
    const chartAndIndex = 
        <MyStack spacing={-20} direction="row">
            <FormControl variant="filled">
                <InputLabel>chart type</InputLabel>
                <Select
                    value={chartType}
                    onChange={handleChange(setChartType)}
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
        </MyStack>
    const timeScale = 
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
    const twoButtons = 
        <MyStack spacing={-20} direction="row">
            <Button variant="contained" sx={{ fontSize: '3vh', "fontFamily": "", textTransform: "none"}}>View raw data</Button>
            <Button variant="contained" sx={{ fontSize: '3vh', "fontFamily": "", textTransform: "none"}}>Backtest This</Button>
        </MyStack>
    const setSet = 
        <div style={{width: "100%"}}>
        <FormControl variant="standard" sx={{marginTop: "2vh",marginLeft: "2vh",marginRight: "2vh", border: 1}}>
            <div style={{margin: "2vh"}}>
                <Grid container spacing={1}>
                    <MyGrid item xs={8}>
                        <TextField label="Start time" value={startTime} type="datetime-local" onChange={handleChange(setStartTime)} InputLabelProps={{ shrink: true }}/>
                    </MyGrid>
                    <MyGrid item xs={4}>
                        <TextField label="Asset type" value={assetType} onChange={handleChange(setAssetType)}/>
                    </MyGrid>
                    <MyGrid item xs={8}>
                        <TextField label="End time" value={endTime} type="datetime-local" onChange={handleChange(setEndTime)} InputLabelProps={{ shrink: true }}/>
                    </MyGrid>
                    <MyGrid item xs={4}>
                        <Button> Set Minotor </Button>
                    </MyGrid>
                </Grid>
            </div>
        </FormControl>
        </div>

    return (
        <div style={{display: "flex", height: "100%", flexDirection: "row"}}>
            <HalfWrapper style={{background: 'aliceblue', }}>
                {sizeSwitch}
                {attrPanel}
                <div style={{color : "red"}}>Here will be the graph</div>
                {backAndNext}
            </HalfWrapper>
            <HalfWrapper style={{background: 'antiquewhite',}}>
                {chartAndIndex}
                {timeScale}
                {twoButtons}
                {setSet}
            </HalfWrapper>
        </div>
    )
}

export default Monitor;