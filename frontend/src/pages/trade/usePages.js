import Monitor from './monitor'
import Backtest from './backtest';
import { useState } from 'react';

const usePages = () => {
    // Title, dom
    const [dummyM, setDummyM] = useState([0]);
    const monitorList = [["m1", Monitor({title: "m1"})]];
    const [dummyB, setDummyB] = useState([0]);
    const backtestList = [["b1", Backtest({title: "b1"})]];
    const addMonitorList = (props) => {
        monitorList.push([props.title, Monitor(props)]);
        setDummyM([...dummyM, dummyM.length]);
    }
    const deleteMonitor = (id) => {
        monitorList.splice(id, 1);
        setDummyM(dummyM.slice(0, -1));
    }
    const addBacktestList = (props) => {
        backtestList.push([props.title, Backtest(props)]);
        setDummyB([...dummyB, dummyB.length]);
    }
    const deleteBacktest = (id) => {
        backtestList.splice(id, 1);
        setDummyB(dummyB.slice(0, -1))
    }
    return {monitorList, backtestList, addMonitorList, deleteMonitor, addBacktestList, deleteBacktest, dummyM, dummyB};
}
export default usePages;