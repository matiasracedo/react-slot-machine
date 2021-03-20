import {useEffect, useState} from 'react';
import Header from './components/Header';
import Slots from './components/Slot';
import Table from './components/Table'
import Footer from './components/Footer';
import './App.css';

function App() {
    const [balance, setBalance] = useState(99.99);
    const [rows, setRows] = useState([{ 
      id: 0, 
      slot1: 0, 
      slot2: 0, 
      slot3: 0, 
      date: '' }])

    useEffect(() => {
      const result = localStorage.getItem('balance');
      if (result) setBalance(JSON.parse(result));
    }, [])

    useEffect(() => {
      localStorage.setItem('balance', balance);
    }, [balance])

    return (
      <div>
        <Header balance={balance} setBalance={setBalance} />
        <div className={"appContainer"}>
        <Slots setBalance={setBalance} setRows={setRows} rows={rows} />  
        <Table rows={rows} />
        </div>
        <Footer />            
      </div>
    );

}

export default App;
