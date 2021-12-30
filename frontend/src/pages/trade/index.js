import '../../App.css';
import {Sidebar, NavItemsContainer, NavItem, ExpandIcon} from './sidebar';
import styled from 'styled-components'
import { Divider } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import Monitor from './monitor'
import Backtest from './backtest';
import { useState } from 'react';


const AppContainer = styled.section`
  height: 100%;
  overflow: auto;
`

export default function TradePage() {
  const [tab, setTab] = useState(1);
  const tabs = [<Monitor/>, <Backtest/>];
  return (
    <div style={{flexGrow: 1, overflow: "auto"}}>
      <AppContainer>
      <Sidebar hideFooter={false} > 
        <NavItemsContainer>
            <NavItem to='/monitor/1' label='monitor1' exact icon={<ShowChartIcon width='0.75rem'/>} onClickAll={()=>{setTab(0);}}/>
            <NavItem to='/New Monitor' label='New Monitor' exact icon={<ExpandIcon width='0.75rem'/>} clean={false}/>
            <Divider style={{ background: 'orange' }}/>
            <NavItem to='/backtest/1' label='backtest1' exact icon={<RunCircleIcon width='0.75rem'/>} onClickAll={()=>{setTab(1);}}/>
            <NavItem to='/New Backtest' label='New Backtest' exact icon={<ExpandIcon width='0.75rem'/>} clean={false}/>
        </NavItemsContainer>
      </Sidebar>
      {tabs[tab]}
      </AppContainer>
    </div>
  );
}