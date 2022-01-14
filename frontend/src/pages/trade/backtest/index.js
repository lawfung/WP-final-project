// import { InputLabel, MenuItem, Select, Box, Chip, Switch, FormControlLabel } from "@mui/material";
import { Button, Grid, ButtonGroup, FormControl } from "@mui/material";
import { Input, Button as AntdButton } from "antd";
import React, { useState } from "react";
// import {PlayArrow, Pause} from '@mui/icons-material';
import { RunCircle } from '@mui/icons-material';
import Lines from '../lines';
import { Candlestick_QUERY, CREATE_RECORD_MUTATION } from '../../../graphql';
import { useApolloClient  } from "@apollo/client";
import { useMutation } from '@apollo/client';
import {HalfWrapper, MyGrid, MyStack, MyTitle} from '../styles';
import { resolution_dict, nameConvert, TimestampToDate } from "../../../tools/constant";
import display from "../../../tools/display";
import { useCookies } from 'react-cookie';

const Backtest = ({title, XStart_time, XEnd_time, XTime_scale, XAsset, data, next, epochS, epochE}) => {
    const handleChange = (f) => ((e) => {f(e.target.value);});
    const [cookie] = useCookies(['session']);
    const [createRecordMutation] = useMutation(CREATE_RECORD_MUTATION);
    const [finished, setFinished] = useState(false);
    const [price, setPrice] = useState(data[data.length - 1][2])
    const [pocket, setPocket] = useState({USDT: 0, [XAsset]: 0});
    const [Record, setRecord] = useState({start: 0, end: 0, high: 0, low: 0});
    const getTotal = (p) => (pocket['USDT'] + p * pocket[XAsset]);
    const [nextTime, setNextTime] = useState(next);
    const [dd, setDD] = useState(data);
    const onTrade = (amount) => {
        setPocket({USDT: pocket['USDT'] - amount * price, [XAsset]: pocket[XAsset] + amount });
    }
    const client = useApolloClient();
    // const [intervalID, setID] = useState(0);
    // const stopRun = () => {
        // console.log("hello");
        // console.log(intervalID);
        // clearInterval(intervalID);
    // }
    const goEnd = () => {
        // stopRun();
        display({ type: 'success', msg: "You have reached the end" });
        setFinished(true);
    }
    const updateRecord = (lst) => {
        const tmp = lst.map((x) => getTotal(x[2]));
        const low = Math.min(...tmp, Record.low);
        const high = Math.max(...tmp, Record.high);
        setRecord({...Record, low, high});
    }
    const handlejump = async (step) => {
        if(nextTime >= epochE) {
            goEnd();
            return;
        }
        const req = await client.query({
            query: Candlestick_QUERY,
            variables: {asset : nameConvert(XAsset), startTime: nextTime, endTime: Math.min(nextTime + step * resolution_dict[XTime_scale], epochE), cookie: cookie.session, scale: XTime_scale}
        });
        const data2 = req.data.Candlestick.map((x) => [TimestampToDate(x.startTime), x.open, x.close, x.low, x.high])
        updateRecord(data2);
        if(data2.length > 0) {
            setPrice(data2[data2.length - 1][2])
            setDD([...dd, ...data2]);
        }
        setNextTime(nextTime + step * resolution_dict[XTime_scale]);
    }
    // const autoRun = () => {
        // setID(setInterval(handlejump, 1000, 2));
    // }
    const jumpList = [1, 2, 4, 8, 16];
    const TitleSwitch = 
        <MyStack spacing={-0} direction="row" sx={{marginTop: "2vh"}}>
            <MyTitle variant="h5" component="div">
                <RunCircle /> {title}
            </MyTitle>
            {/* <ButtonGroup variant="contained">
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go LEFT</Button>
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go FULL size</Button>
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go RIGHT</Button>
            </ButtonGroup> */}
        </MyStack>
    const attrPanel = 
        <Grid container spacing={1} sx={{marginTop: "2vh"}}>
            <MyGrid item xs={6}>Start time: {XStart_time}</MyGrid>
            <MyGrid item xs={6}>End time: {XEnd_time}</MyGrid>
            <MyGrid item xs={6}>Time scale: {XTime_scale}</MyGrid>
            <MyGrid item xs={6}>Asset: {XAsset}</MyGrid>
        </Grid>
    // const runAndPause =
    //     <Grid container spacing={1} sx={{marginTop: "2vh"}}>
    //         <MyGrid item xs={6}>
    //             <Button variant="contained" endIcon={<PlayArrow />} sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}} onClick={autoRun}>Run</Button>
    //         </MyGrid>
    //         <MyGrid item xs={6}>
    //             <Button variant="contained" endIcon={<Pause />} sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}} onClick={stopRun}>Pause</Button>
    //         </MyGrid>
    //     </Grid>
    const jumpPanel = 
        <ButtonGroup variant="contained" sx={{marginTop: "2vh"}}>
            {jumpList.map((x) => 
                <Button variant="contained" sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}} key={x} onClick={()=>{handlejump(x);}}>Jump {x}</Button>
            )}
        </ButtonGroup>
    const [checked, setChecked] = useState(true);
    // const easyMode = 
    //     <FormControlLabel control={<Switch checked={checked} onChange={(e) => {
    //         setChecked(e.target.checked);}}/>} label="Easy Mode" />
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
                    const tmp = Number(bb)
                    if(tmp && tmp > 0){
                        onTrade(tmp)
                    }
                    else {
                        display({type:"error", msg: "buying amount should be a positive number"});
                    }
                }}
            />
            <Input.Search
                value={sellAmount}
                onChange={handleChange(setSellAmount)}
                size="large"
                enterButton={<AntdButton style={{background: "red", color: "white"}}>Sell</AntdButton>}
                style={{ width: "40%"}}
                onSearch={(bb) => {
                    const tmp = Number(bb)
                    if(tmp && tmp > 0){
                        onTrade(-tmp)
                    }
                    else {
                        display({type:"error", msg: "selling amount should be a positive number"});
                    }
                }}
            />
        </MyStack>
    const CodeEditor = <></>
    const graph = <Lines data={dd}/>
    const [strategy, setStrategy] = useState("");
    const AUM = 
        <FormControl variant="standard" sx={{marginTop: "2vh",marginLeft: "2vh",marginRight: "2vh", border: 1, width: "80%"}}>
            <div style={{margin: "2vh"}}>
                <Grid container spacing={2}>
                    <MyGrid item xs={12}> Assets Under Management </MyGrid>
                    <MyGrid item xs={6}>USDT: {pocket['USDT']}</MyGrid>
                    <MyGrid item xs={6}>{XAsset}: {pocket[XAsset]} (≈ {pocket[XAsset] * price} USDT)</MyGrid>
                </Grid>
            </div>
        </FormControl>
    const REC = 
        <FormControl variant="standard" sx={{marginTop: "2vh",marginLeft: "2vh",marginRight: "2vh", border: 1, width: "80%"}}>
            <div style={{margin: "2vh"}}>
                <Grid container spacing={2}>
                    <MyGrid item xs={12}> Record: </MyGrid>
                    <MyGrid item xs={6}>Start: {0} (USDT)</MyGrid>
                    <MyGrid item xs={6}>Current: {getTotal(price)} (USDT)</MyGrid>
                    <MyGrid item xs={6}>Low: {Record['low']} (USDT)</MyGrid>
                    <MyGrid item xs={6}>High: {Record['high']} (USDT)</MyGrid>
                </Grid>
            </div>
        </FormControl>

    const SendRecord = 
        <Input.Search
            value={strategy}
            onChange={handleChange(setStrategy)}
            size="large"
            placeholder="Strategy (may leave blank)"
            enterButton={<AntdButton style={{background: "blue", color: "white"}}>Save Record</AntdButton>}
            style={{ width: "80%", marginTop: "2vh"}}
            onSearch={ async (name) => {
                const ret = await createRecordMutation({variables: {strategyName : name, startTime: epochS, endTime: epochE, cookie: cookie.session, ...Record, end: getTotal(price)} });
                if(ret.data.CreateRecord) {
                    display({ type: 'success', msg: "Save successfully" });
                }
                else {
                    display({ type: 'error', msg: "Save failed" });
                }
            }}
        />
    const priceNow = <MyStack spacing={-20} direction="row">Current Price: {price}</MyStack>
    return (
        <div style={{display: "flex", height: "100%", width: "100%", flexDirection: "row"}}>
            <HalfWrapper style={{background: 'aliceblue', }}>
                {TitleSwitch}
                {attrPanel}
                {graph}
            </HalfWrapper>
            <HalfWrapper style={{background: 'antiquewhite',}}>
                {/* {easyMode} */}
                {priceNow}
                {checked ? BuyAndSell : CodeEditor}
                {AUM}
                {/* {runAndPause} */}
                {REC}
                {finished ? SendRecord : jumpPanel}
                {/* {!finished ? SendRecord : jumpPanel} */}
            </HalfWrapper>
        </div>
    )
}

export default Backtest;