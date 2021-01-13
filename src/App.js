import React, { useState, useEffect } from "react";
import './App.css';
// import logo from "./images/logo.png";
import Infobox from "./components/Infobox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import { sortData } from "./util";

// Material-UI dependecies
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

function App() {

  // STATE = how to write a variable in REACT 
  // API call to endpoint...
  // https://disease.sh/v3/covid-19/countries 

  // USEEFFECT = runs a peice of code based on a given condition

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect( () => {
    // async function to send a request, wait for it, then run the code below
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2 
        }));
        
        const sortedData = sortData(data);
        setTableData(sortedData);         // gets data from fetch request and sets into the state
        setCountries(countries);
      });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);  // setting the state to clicked country code

    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

   await fetch(url)
   .then(response => response.json())   // get the data in json
   .then(data => {              
     setCountry(countryCode); 
     
     // All of the data
     // From country response
     setCountryInfo(data);            // store data in countryInfo's state
   });
  };

  console.log("COUNTRY INFO >>>", countryInfo)
 
  return (
    <div className="app">
      {/* <img src={logo} alt="COVID-19" className="covid__logo" /> */}
      
      <div className="app__left">
        <div className="app__header">
          <h1> COVID TRACKER </h1>
          <FormControl className="app__dropdown">
            <Select 
              variant="outlined" 
              onChange={onCountryChange} 
              value={country} 
            >
            
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {/* Loop through all countries for dropdown */}
              {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Infobox 
            title="Coronavirus cases" 
            cases={countryInfo.todayCases} 
            total={countryInfo.cases} 
          />

          <Infobox 
            title="Recovered" 
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered} 
          />

          <Infobox 
            title="Deaths" 
            cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths} 
          />

        </div> 

        <Map />    

      </div>
      
      <Card className="app__right">
        {/* Sidebar Right Content */}
        <CardContent>
          <h3>Live Cases by Country </h3>
          <Table countries={tableData} />

          <h3> Worldwide New Cases</h3>
            {/* Graph */}
          <LineGraph />

        </CardContent>
      </Card>
      {/* Map */}
    </div>
  );
}

export default App;
