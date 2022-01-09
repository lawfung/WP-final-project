import { useState } from 'react';
import styled from 'styled-components'
import { Divider } from '@mui/material';
import { ShowChart, RunCircle} from '@mui/icons-material/';
import {Sidebar, NavItemsContainer, NavItem, ExpandIcon} from './sidebar';
import usePages from './usePages';
import CreateNew from './Create';

const AppContainer = styled.section`
  height: 100%;
  overflow: auto;
`

export default function TradePage() {
  const [tabM, setTabM] = useState(0);
  const [tabB, setTabB] = useState(0);
  const [MB, setMB] = useState(0);
  const {monitorList, backtestList, addMonitorList, deleteMonitor, addBacktestList, deleteBacktest, dummyM, dummyB} = usePages();
  const contentid = (MB ? dummyB[tabB] : dummyM[tabM]);
  const content = (contentid+1 ? (MB ? backtestList[contentid] : monitorList[contentid])[1] : <></>)
  const [open, setOpen] = useState(0);
  const [openMB, setOpenMB] = useState(null);
  const handleCloseCreate = () => {
    setOpen(0);
  }
  return (
    <div style={{flexGrow: 1, overflow: "auto"}}>
      <AppContainer>
      <Sidebar hideFooter={false} > 
        <NavItemsContainer>
            {dummyM.map((_, i) =>
              <NavItem to='' label={monitorList[i][0]} key={monitorList[i][0]} exact icon={<ShowChart width='0.75rem'/>} onClickAll={()=>{setTabM(i);setMB(0);}} onClickClean={()=>{deleteMonitor(i);}}/> )}
            <NavItem to='/New Monitor' label='New Monitor' exact icon={<ExpandIcon width='0.75rem'/>} clean={false} onClickAll={()=>{setOpenMB(0);setOpen(true);}}/>
            <Divider style={{ background: 'orange' }}/>
            {dummyB.map((_, i) =>
              <NavItem to='' label={backtestList[i][0]} key={backtestList[i][0]} exact icon={<RunCircle width='0.75rem'/>} onClickAll={()=>{setTabB(i);setMB(1);}} onClickClean={()=>{deleteBacktest(i);}}/> )}
            <NavItem to='/New Backtest' label='New Backtest' exact icon={<ExpandIcon width='0.75rem'/>} clean={false} onClickAll={()=>{setOpenMB(1);setOpen(true);}}/>
        </NavItemsContainer>
      </Sidebar>
      {content}
      <CreateNew open={open} openMB={openMB} handleCloseCreate={handleCloseCreate}/>
      </AppContainer>
    </div>
  );
}