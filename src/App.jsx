import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MuiTable from './components/MuiTable';
import { Box } from '@mui/material';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios('http://localhost:4000/users');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (search) {
      setSearchedData(
        data.filter((item) =>
          item.email.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setSearchedData([]);
    }
  }, [data, search]);
  

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };
  console.log(searchedData);
  return (
    <>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <input style={{ display: "block", marginBottom: "150px", width: "100%" }} type="text" value={search} onChange={handleSearch} />
        {
          searchedData.length > 0 && (
            <Box sx={{ background: "white", maxHeight: "100px", overflow: "auto", color: "black", position: "absolute", top: "50px", left: 0, right: 0 }}>
              {
                searchedData.map(item => <p>{item.name}</p>)
              }
            </Box>
          )
        }
      </Box>
      <MuiTable data={data} />
    </>
  );
}

export default App;