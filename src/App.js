
import { useState } from 'react';
import './App.css';
import Cursor from './components/Cursor';
import Loading from './components/Loading';
import Home from './pages/Home';

const App = () => {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Cursor />
      { loading && <Loading />}
      <Home />
    </>
  );
}

export default App;
