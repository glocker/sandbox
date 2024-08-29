import { useState } from 'react';
import './App.css';
import Tabs from './Tabs/Tabs';
import Grid from './GridPagination/Grid';

function App() {
  const [count, setCount] = useState(0);

  const mockData = [
    {
        name: 'tab1',
        text: 'text1'
    },
    {
        name: 'tab2',
        text: 'text2'
    },
    {
        name: 'tab3',
        text: 'text3'
    }
];

  return (
    <>
      <Grid />
    </>
  )
}

export default App
