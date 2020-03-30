import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Card from "./card";
import LeftPane from './left-pane';

function App() {
  let [countries, setCountries] = useState([]),
    [codes, setCodes] = useState([]),
    [searchText, setSearchText] = useState('');
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(resp => {
      setCodes(resp?.data);
    })}, []);

    useEffect(() => {
      if(codes.length) {
        axios
        .get(
          "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
          {
            headers: {
              "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
              "x-rapidapi-key":
                "e369c68502msh33c9a6e223e4a4ep1e25f0jsn36af6548764a"
            }
          }
        )
        .then(resp => {
          let new_data = resp?.data?.countries_stat.map(country => {
            return {
              ...country,
              countryCode: codes.filter(
                code => [code.name, code.alpha3Code].indexOf(country.country_name) !== -1
              )
            };
          });
          setCountries(new_data);
        });
      }
      
    }, [codes]);

    function search(e) {
      
      setSearchText(e.target.value);
    }

  return (
    <div className="App">
      <LeftPane>
        <div className="search">
          <input type="text" className="textbox" onChange={e => search(e)} placeholder="Search Country" />
        </div>
      </LeftPane>
      <div className="right-pane">
        <div className="flex">
          {getCountries(countries, searchText).map((country, index) => (
            <Card data={country} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function getCountries(countries, search = '') {
  return countries.filter(country => country.country_name.toLowerCase().indexOf(search.toLowerCase()) > -1)
}
export default App;
