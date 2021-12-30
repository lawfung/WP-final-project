import { Button, Stack, Grid, ButtonGroup, InputLabel, MenuItem, FormControl, Select, Box, Chip, Switch, FormControlLabel } from "@mui/material";
import { useState } from "react";
import {PlayArrow, Pause} from '@mui/icons-material';
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
const indexList = ["MA", "EMA"];
const Backtest = () => {
    const handleChange = (f) => ((e) => {f(e.target.value);})
    const [chartType, setChartType] = useState('Histogram');
    const [indexType, setIndexType] = useState([]);
    const handleIndexChange = (event) => {
        const value = event.target.value;
        setIndexType(typeof value === 'string' ? value.split(',') : value);
    };
    const jumpList = [1, 2, 4, 8, 16];
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
            <MyGrid item xs={6}>Asset: BTC</MyGrid>
        </Grid>
    const backAndNext =
        <Grid container spacing={1} sx={{marginTop: "2vh"}}>
            <MyGrid item xs={6}>
                <Button variant="contained" endIcon={<PlayArrow />} sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Run</Button>
            </MyGrid>
            <MyGrid item xs={6}>
                <Button variant="contained" endIcon={<Pause />} sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Pause</Button>
            </MyGrid>
        </Grid>
    const jumpPanel = 
        <ButtonGroup variant="contained" sx={{marginTop: "2vh"}}>
            {jumpList.map((x) => 
                <Button variant="contained" sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}} key={x}>Jump {x}</Button>
            )}
        </ButtonGroup>
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
    const twoButtons = 
        <MyStack spacing={-20} direction="row">
            <Button variant="contained" sx={{ fontSize: '3vh', "fontFamily": "", textTransform: "none"}}>View raw data</Button>
            <Button variant="contained" sx={{ fontSize: '3vh', "fontFamily": "", textTransform: "none"}}>Monitor This</Button>
        </MyStack>
    const [checked, setChecked] = useState(true);
    const easyMode = 
        <FormControlLabel control={<Switch checked={checked} onChange={(e) => {
            setChecked(e.target.checked);}}/>} label="Easy Mode" />
    return (
        <div style={{display: "flex", height: "100%", flexDirection: "row"}}>
            <HalfWrapper style={{background: 'aliceblue', }}>
                {sizeSwitch}
                {attrPanel}
                <div style={{color : "red"}}>Here will be the graph</div>
                {backAndNext}
                {jumpPanel}
            </HalfWrapper>
            <HalfWrapper style={{background: 'antiquewhite',}}>
                {easyMode}
                {chartAndIndex}
                {twoButtons}
            </HalfWrapper>
        </div>
    )
}

export default Backtest;