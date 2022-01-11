import { Button, Stack, Grid, ButtonGroup, Slider, InputLabel, MenuItem, FormControl, Select, Box, Chip, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {ArrowLeft, ArrowRight, ShowChart} from '@mui/icons-material';
import styled from "styled-components";
import Lines from './lines';
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
const MyTitle = styled(Typography)`
    border-color: coral;
    border-width: thick;
    border-style: solid;
    border-radius: 2vh;
    padding: 1vh;
    background: Cornsilk;
`
const marksTimes = ['1 min', '5 min', '15 min', '30 min', '1 hr', '2 hr', '4 hr', '1 day'];
const indexList = ["MA", "EMA"];
const Monitor = ({title="Monitor1"}) => {
    const handleChange = (f) => ((e) => {f(e.target.value);})
    const TitleSwitch = 
        <MyStack spacing={-0} direction="row" sx={{marginTop: "2vh"}}>
            <MyTitle variant="h5" component="div">
                <ShowChart /> {title}
            </MyTitle>
            <ButtonGroup variant="contained">
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go LEFT</Button>
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go FULL size</Button>
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go RIGHT</Button>
            </ButtonGroup>
        </MyStack>
    const attrPanel = 
        <Grid container spacing={1} sx={{marginTop: "2vh"}}>
            <MyGrid item xs={6}>Start time: 2021 Jun 08 20:00:00</MyGrid>
            <MyGrid item xs={6}>End time:  2021 Jun 08 20:00:00</MyGrid>
            <MyGrid item xs={6}>Time scale: 15s</MyGrid>
            <MyGrid item xs={6}>Asset: BTC</MyGrid>
        </Grid>
    const backAndNext =
        <MyStack spacing={-30} direction="row">
            <Button variant="contained" startIcon={<ArrowLeft />} sx={{ fontSize: '2vh', "fontFamily": "", textTransform: "none"}}>Back</Button>
            <Button variant="contained" endIcon={<ArrowRight />} sx={{ fontSize: '2vh', "fontFamily": "", textTransform: "none"}}>Next</Button>
        </MyStack>
    const [chartType, setChartType] = useState('Histogram');
    const [indexType, setIndexType] = useState([]);
    const handleIndexChange = (event) => {
        const value = event.target.value;
        setIndexType(typeof value === 'string' ? value.split(',') : value);
    };
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
            <FormControl variant="filled" sx={{ minWidth: "25%", minHeight: "12vh" }}>
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
    const marks = marksTimes.map((x, i) => ({value: i, label: x}));
    const [timeScale, setTimeScale] = useState(0);
    const timeScaleSlider =
        <>
            <Slider
                // aria-label="Custom marks"
                value={timeScale}
                onChange={handleChange(setTimeScale)}
                // getAriaValueText={valuetext}
                step={null}
                marks={marks}
                max={marksTimes.length - 1}
                sx={{width: "90%", marginTop: "0vh"}}
                track={false}
            />
        </>
    const twoButtons = 
        <MyStack spacing={-20} direction="row">
            <Button variant="contained" sx={{ fontSize: '3vh', "fontFamily": "", textTransform: "none"}}>View raw data</Button>
            <Button variant="contained" sx={{ fontSize: '3vh', "fontFamily": "", textTransform: "none"}}>Backtest This</Button>
        </MyStack>
    const [startTime, setStartTime] = useState('2021-01-01T00:00');
    const [endTime, setEndTime] = useState('2022-01-01T00:00');
    const [assetType, setAssetType] = useState('BTC');
    const setSet = 
        <>
        <FormControl variant="standard" sx={{marginTop: "2vh",marginLeft: "2vh",marginRight: "2vh", border: 1}}>
            <div style={{margin: "2vh"}}>
                <Grid container spacing={2}>
                    <MyGrid item xs={12}>
                        Time Scale
                    </MyGrid>
                    <MyGrid item xs={12}>
                        {timeScaleSlider}
                    </MyGrid>
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
                        <Button> Reset Minotor </Button>
                    </MyGrid>
                </Grid>
            </div>
        </FormControl>
        </>

    return (
        <div style={{display: "flex", height: "100%", flexDirection: "row"}}>
            <HalfWrapper style={{background: 'aliceblue', }}>
                {TitleSwitch}
                {attrPanel}
                <Lines/>
                {/* <div style={{color : "red"}}>Here will be the graph</div> */}
                {backAndNext}
            </HalfWrapper>
            <HalfWrapper style={{background: 'antiquewhite',}}>
                {chartAndIndex}
                {/* {timeScaleSlider} */}
                {twoButtons}
                {setSet}
            </HalfWrapper>
        </div>
    )
}

export default Monitor;