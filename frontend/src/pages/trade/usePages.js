import Monitor from './monitor'
import Backtest from './backtest';
import { useState } from 'react';

const usePages = () => {
    // Title, dom
    const [dummyM, setDummyM] = useState([0, 1, 2]);
    const [MorB, setMorB] = useState(0);
    const [idid, setIdid] = useState(0);
    const [monitorList, setMonitorList] = useState([["m1", <Monitor title="m1"/>,0],["m2", <Monitor title="m2"/>,1],["m3", <Monitor title="m3"/>,2]])
    const [dummyB, setDummyB] = useState([0]);
    const [backtestList, setBacktestList] = useState([["b1", <Backtest title="b1"/>, 0 ]])
    const [count, setCount] = useState(10);
    const addMonitorList = (props) => {
        setMonitorList((til) => [...til, [props.title, <Monitor {...props}/>, count]])
        setDummyM([...dummyM, count]);
        setCount(count + 1);
    }
    const deleteMonitor = (id) => {
        setMonitorList(monitorList.slice(0, id).concat(monitorList.slice(id + 1)))
        setDummyM(dummyM.slice(0, id).concat(dummyM.slice(id + 1)) );
        if(MorB === 0 && dummyM[id] === idid)
            setIdid(dummyM[id-1]);
    }
    const addBacktestList = (props) => {
        setBacktestList((til) => [...til, [props.title, <Backtest {...props}/>, count]])
        setDummyB([...dummyB, count]);
        setCount(count + 1);
    }
    const deleteBacktest = (id) => {
        setBacktestList(backtestList.slice(0, id).concat(backtestList.slice(id + 1)))
        setDummyB(dummyB.slice(0, id).concat(dummyB.slice(id + 1)) );
        if(MorB === 1 && dummyB[id] === idid)
            setIdid(dummyB[id-1]);
    }
    return {monitorList, backtestList, addMonitorList, deleteMonitor, addBacktestList, deleteBacktest, dummyM, dummyB, setMorB, setIdid, MorB, idid, setMonitorList};
}
export default usePages;