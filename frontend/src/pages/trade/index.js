import { useState } from 'react';
import styled from 'styled-components'
import { Divider } from '@mui/material';
import { ShowChart, RunCircle} from '@mui/icons-material/';
import {Sidebar, NavItemsContainer, NavItem, ExpandIcon} from './sidebar';
import usePages from './usePages';
import CreateNew from './Create';
import { Candlestick_QUERY, CACHE } from '../../graphql';
import { useApolloClient  } from "@apollo/client";
import { useMutation } from '@apollo/client';
import { resolution_dict } from '../../tools/constant';

const AppContainer = styled.section`
  height: 100%;
  overflow: auto;
`

export default function TradePage() {
  const {MorB, setMorB, idid, setIdid, dummyM, dummyB, monitorList, backtestList, addMonitorList, addBacktestList, deleteMonitor, deleteBacktest} = usePages();
  const easyMap = (ls, MBT, name) => ls.map( (y) => <div key={name +(y)[2]} style={{height:"100%", display:(MorB===MBT && idid===y[2] ? 'flex' : 'none')}}>{(y)[1]}</div> )
  const content = (
    <>
      {easyMap(monitorList, 0, "monitor")}
      {easyMap(backtestList, 1, "backtest")}
    </>
  )
  const [open, setOpen] = useState(false);
  const [openMB, setOpenMB] = useState(null);
  const handleCloseCreate = () => {
    setOpen(false);
  }
  const client = useApolloClient();
  const [doCache] = useMutation(CACHE);
  const handleCreate = async ({tabName, startTime, endTime, assetType, openMB, timeScaleString}) => {
    const epochS = Date.parse(startTime) / 1000
    const epochE = Date.parse(endTime) / 1000
    console.log(epochS, epochE, timeScaleString)
    if(openMB){
      doCache({variables: {asset : assetType + "/USDT", startTime: epochS, endTime: epochE, cookie: "123", scale: timeScaleString}})
      const delta = resolution_dict[timeScaleString];
      const req = await client.query({
        query: Candlestick_QUERY,
        variables: {asset : assetType + "/USDT", startTime: epochS, endTime: epochS + delta, cookie: "123", scale: timeScaleString}
      });
      const data = req.data.Candlestick.map((x) => [x.startTime, x.open, x.close, x.low, x.high])
      addBacktestList({title:tabName, XStart_time:startTime, XEnd_time:endTime, XAsset:assetType, XTime_scale:timeScaleString, data, next: epochS + delta})
    }
    else{
      const req = await client.query({
        query: Candlestick_QUERY,
        variables: {asset : assetType + "/USDT", startTime: epochS, endTime: epochE, cookie: "123", scale: timeScaleString}
      });
      const data = req.data.Candlestick.map((x) => [x.startTime, x.open, x.close, x.low, x.high])
      addMonitorList({title:tabName, XStart_time:startTime, XEnd_time:endTime, XAsset:assetType, XTime_scale:timeScaleString, data});
    }
  }
  return (
    <div style={{flexGrow: 1, overflow: "auto"}}>
      <AppContainer>
      <Sidebar hideFooter={false} > 
        <NavItemsContainer>
            {dummyM.map((I, i) =>
              <NavItem label={monitorList[i][0]} exact icon={<ShowChart width='0.75rem'/>} onClickAll={()=>{setIdid(I);setMorB(0);}} onClickClean={()=>{deleteMonitor(i);}} key={"monitor"+monitorList[i][2]}/> )
            }
            <NavItem label='New Monitor' exact icon={<ExpandIcon width='0.75rem'/>} clean={false} onClickAll={()=>{setOpenMB(0);setOpen(true);}}/>
            <Divider style={{ background: 'orange' }}/>
            {dummyB.map((I, i) =>
              <NavItem to='' label={backtestList[i][0]} exact icon={<RunCircle width='0.75rem'/>} onClickAll={()=>{setIdid(I);setMorB(1);}} onClickClean={()=>{deleteBacktest(i);}} key={"backtest"+backtestList[i][2]}/> )
            }
            <NavItem label='New Backtest' exact icon={<ExpandIcon width='0.75rem'/>} clean={false} onClickAll={()=>{setOpenMB(1);setOpen(true);}}/>
        </NavItemsContainer>
      </Sidebar>
      {content}
      <CreateNew open={open} openMB={openMB} handleCloseCreate={handleCloseCreate} handleCreate={handleCreate}/>
      </AppContainer>
    </div>
  );
}