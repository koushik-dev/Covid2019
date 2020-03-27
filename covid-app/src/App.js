import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Card from "./card";

function App() {
  let [countries, setCountries] = useState([]);
  let [codes, setCodes] = useState([]);
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

  return (
    <div className="App">
      <div className="flex">
        {countries.map((country, index) => (
          <Card data={country} key={index} />
        ))}
      </div>
        
    </div>
  );
}

export default App;
