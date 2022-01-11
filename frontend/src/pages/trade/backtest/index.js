import { Button, Stack, Grid, ButtonGroup, InputLabel, MenuItem, FormControl, Select, Box, Chip, Switch, FormControlLabel, Typography } from "@mui/material";
import { Input, Button as AntdButton } from "antd";
import { useState } from "react";
import {PlayArrow, Pause, RunCircle} from '@mui/icons-material';
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
const MyTitle = styled(Typography)`
    border-color: coral;
    border-width: thick;
    border-style: solid;
    border-radius: 2vh;
    padding: 1vh;
    background: Cornsilk;
`
const indexList = ["MA", "EMA"];
const Backtest = ({title="Backtest1", XStart_time="2021 Jun 08 21:00:00", XEnd_time="2021 Jun 08 20:00:00", XTime_scale="15s", XAsset="BTC"}) => {
    const handleChange = (f) => ((e) => {f(e.target.value);})
    const [chartType, setChartType] = useState('Histogram');
    const [indexType, setIndexType] = useState([]);
    const handleIndexChange = (event) => {
        const value = event.target.value;
        setIndexType(typeof value === 'string' ? value.split(',') : value);
    };
    const jumpList = [1, 2, 4, 8, 16];
    const TitleSwitch = 
        <MyStack spacing={-0} direction="row" sx={{marginTop: "2vh"}}>
            <MyTitle variant="h5" component="div">
                <RunCircle /> {title}
            </MyTitle>
            <ButtonGroup variant="contained">
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go LEFT</Button>
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go FULL size</Button>
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go RIGHT</Button>
            </ButtonGroup>
        </MyStack>
    const attrPanel = 
        <Grid container spacing={1} sx={{marginTop: "2vh"}}>
            <MyGrid item xs={6}>Start time: {XStart_time}</MyGrid>
            <MyGrid item xs={6}>End time: {XEnd_time}</MyGrid>
            <MyGrid item xs={6}>Time scale: {XTime_scale}</MyGrid>
            <MyGrid item xs={6}>Asset: {XAsset}</MyGrid>
        </Grid>
    const runAndPause =
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
    const [buyAmount, setBuyAmount] = useState(1);
    const [sellAmount, setSellAmount] = useState(1);
    const BuyAndSell = 
        <MyStack spacing={-0} direction="row">
            <Input.Search
                value={buyAmount}
                onChange={handleChange(setBuyAmount)}
                size="large"
                enterButton={<AntdButton style={{background: "green", color: "white"}}>Buy</AntdButton>}
                style={{ width: "40%"}}
                onSearch={(bb) => {
                    console.log(bb);
                }}
            />
            <Input.Search
                value={sellAmount}
                onChange={handleChange(setSellAmount)}
                size="large"
                enterButton={<AntdButton style={{background: "red", color: "white"}}>Sell</AntdButton>}
                style={{ width: "40%"}}
                onSearch={(bb) => {
                    console.log(bb);
                }}
            />
        </MyStack>
    const CodeEditor = <></>
    const AUM = 
        <>
            <div style={{marginTop: "2vh"}}>Assets Under Management</div>
            <Grid container spacing={1} sx={{marginTop: "2vh"}}>
                <MyGrid item xs={6}>USDT: 1000</MyGrid>
                <MyGrid item xs={6}>BTC: 0 (≈ 0 USDT)</MyGrid>
            </Grid>
        </>
    return (
        <div style={{display: "flex", height: "100%", flexDirection: "row"}}>
            <HalfWrapper style={{background: 'aliceblue', }}>
                {TitleSwitch}
                {attrPanel}
                <div style={{color : "red"}}>Here will be the graph</div>
                {runAndPause}
                {jumpPanel}
            </HalfWrapper>
            <HalfWrapper style={{background: 'antiquewhite',}}>
                {easyMode}
                {checked ? BuyAndSell : CodeEditor}
                {AUM}
                {chartAndIndex}
                {twoButtons}
            </HalfWrapper>
        </div>
    )
}

export default Backtest;