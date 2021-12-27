// import logo from '../../logo.svg';
import '../../App.css';
import {Sidebar, NavItemsContainer, NavItem, ExpandIcon} from './sidebar';
import styled from 'styled-components'
import { Divider } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import Monitor from './monitor'


const AppContainer = styled.section`
  height: 100%;
  overflow: auto;
`

export default function TradePage() {
  return (
    <div style={{flexGrow: 1, overflow: "auto"}}>
      <AppContainer>
      <Sidebar hideFooter={false} > 
        <NavItemsContainer>
            <NavItem to='/monitor/1' label='monitor1' exact icon={<ShowChartIcon width='0.75rem'/>}/>
            <NavItem to='/monitor/2' label='monitor2' exact icon={<ShowChartIcon width='0.75rem'/>}/>
            <NavItem to='/New Monitor' label='New Monitor' exact icon={<ExpandIcon width='0.75rem'/>} clean={false}/>
            <Divider style={{ background: 'orange' }}/>
            <NavItem to='/backtest/1' label='backtest1' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/backtest/2' label='backtest2' exact icon={<RunCircleIcon width='0.75rem'/>}/>
            <NavItem to='/New Backtest' label='New Backtest' exact icon={<ExpandIcon width='0.75rem'/>} clean={false}/>
        </NavItemsContainer>
      </Sidebar>
      <Monitor></Monitor>
      {/* <div style={{height: "100%", background: 'bisque'}}> */}
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div> */}
        
      {/* </div> */}
      </AppContainer>
    </div>
  );
}