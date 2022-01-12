import { useState } from 'react';
import styled from 'styled-components'
import { Divider } from '@mui/material';
import { ShowChart, RunCircle} from '@mui/icons-material/';
import {Sidebar, NavItemsContainer, NavItem, ExpandIcon} from './sidebar';
import usePages from './usePages';
import CreateNew from './Create';
import { Candlestick_QUERY } from '../../graphql';
import { useApolloClient  } from "@apollo/client";

const AppContainer = styled.section`
  height: 100%;
  overflow: auto;
`

export default function TradePage() {
  const {monitorList, backtestList, addMonitorList, deleteMonitor, addBacktestList, deleteBacktest, dummyM, dummyB,  setMorB, setIdid, MorB, idid} = usePages();
  const content = (
    <>
      {monitorList.map( (y) => <div key={"monitor" +(y)[2]} style={{height:"100%", display:(MorB===0 && idid===y[2] ? 'flex' : 'none')}}>{(y)[1]}</div> )}
      {backtestList.map((y) => <div key={"backtest"+(y)[2]} style={{height:"100%", display:(MorB===1 && idid===y[2] ? 'flex' : 'none')}}>{(y)[1]}</div> )}
    </>
  )
  const [open, setOpen] = useState(false);
  const [openMB, setOpenMB] = useState(null);
  const handleCloseCreate = () => {
    setOpen(false);
  }
  const client = useApolloClient();
  const handleCreate = async ({tabName, startTime, endTime, assetType, timeScale, openMB, timeScaleString}) => {
    const epochS = Date.parse(startTime) / 1000
    const epochE = Date.parse(endTime) / 1000
    console.log(epochS, epochE, timeScaleString)
    if(openMB){
      addBacktestList({title:tabName, startTime, endTime, assetType, timeScale});
    }
    else{
      const req = await client.query({
        query: Candlestick_QUERY,
        variables: {asset : assetType + "/USDT", startTime: epochS, endTime: epochE, cookie: "123", scale: timeScaleString}
      });
      const data = req.data.Candlestick.map((x) => [x.startTime, x.open, x.close, x.low, x.high])
      addMonitorList({title:tabName, XStart_time:startTime, XEnd_time:endTime, XAsset:assetType, XTime_scale:timeScaleString, data});
      // console.log(data);
    }
  }
  return (
    <div style={{flexGrow: 1, overflow: "auto"}}>
      <AppContainer>
      <Sidebar hideFooter={false} > 
        <NavItemsContainer>
            {dummyM.map((I, i) =>{
              return <NavItem to='' label={monitorList[i][0]} exact icon={<ShowChart width='0.75rem'/>} onClickAll={()=>{setIdid(I);setMorB(0);}} onClickClean={()=>{deleteMonitor(i);}} key={"monitor"+monitorList[i][2]}/> })
            }
            <NavItem to='/New Monitor' label='New Monitor' exact icon={<ExpandIcon width='0.75rem'/>} clean={false} onClickAll={()=>{setOpenMB(0);setOpen(true);}}/>
            <Divider style={{ background: 'orange' }}/>
            {dummyB.map((I, i) =>
              <NavItem to='' label={backtestList[i][0]} exact icon={<RunCircle width='0.75rem'/>} onClickAll={()=>{setIdid(I);setMorB(1);}} onClickClean={()=>{deleteBacktest(i);}} key={"backtest"+backtestList[i][2]}/> )
            }
            <NavItem to='/New Backtest' label='New Backtest' exact icon={<ExpandIcon width='0.75rem'/>} clean={false} onClickAll={()=>{setOpenMB(1);setOpen(true);}}/>
        </NavItemsContainer>
      </Sidebar>
      {content}
      <CreateNew open={open} openMB={openMB} handleCloseCreate={handleCloseCreate} handleCreate={handleCreate}/>
      </AppContainer>
    </div>
  );
}