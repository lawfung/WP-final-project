import Monitor from './monitor'
import Backtest from './backtest';
import { useState } from 'react';

const defaultMonitor = [["m1", <Monitor title="m1"/>,0],["m2", <Monitor title="m2"/>,1],["m3", <Monitor title="m3"/>,2]];
// const defaultBacktest = [["b1", <Backtest title="b1"/>, 0 ]];
const defaultBacktest = [];

const usePages = () => {
    // Title, dom
    const [MorB, setMorB] = useState(0);
    const [idid, setIdid] = useState(0);
    const [count, setCount] = useState(10);
    const addOne = (Type, setList, dummy, setDummy) => (props) => {
        setList((til) => [...til, [props.title, <Type {...props}/>, count]]);
        setDummy([...dummy, count]);
        setCount(count + 1);
    }
    const copyDeleteI = (ls, id) => (ls.slice(0, id).concat(ls.slice(id + 1)));
    const deleteOne = (MBT, dummy, setList, ls, setDummy) => (id) => {
        if(MorB === MBT && dummy[id] === idid)
            setIdid(dummy[id - 1]);
        setList(copyDeleteI(ls, id))
        setDummy(copyDeleteI(dummy, id));
    }
    const [dummyM, setDummyM] = useState(defaultMonitor.map((_,i) => i));
    const [dummyB, setDummyB] = useState(defaultBacktest.map((_,i) => i));
    const [monitorList, setMonitorList] = useState(defaultMonitor)
    const [backtestList, setBacktestList] = useState(defaultBacktest)
    const addMonitorList = addOne(Monitor, setMonitorList, dummyM, setDummyM);
    const addBacktestList = addOne(Backtest, setBacktestList, dummyB, setDummyB);
    const deleteMonitor = deleteOne(0, dummyM, setMonitorList, monitorList, setDummyM);
    const deleteBacktest = deleteOne(1, dummyB, setBacktestList, backtestList, setDummyB);
    return {MorB, setMorB, idid, setIdid, dummyM, dummyB, monitorList, backtestList, addMonitorList, addBacktestList, deleteMonitor, deleteBacktest};
}
export default usePages;