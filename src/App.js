// import React, { Component, useEffect,useState } from "react";
// import {Cards,Charts, CountryPicker} from './components';
// import styles from './App.module.css';
// import { fetchData } from "./api";



// const App =()=>{
//     const [post, setPosts]= useState([])

//     useEffect(()=>{
//         const url='https://covid19.mathdro.id/api';
//         fetchData()
//         .then(resp=>setPosts(resp))
//     },[])


//     handleCountryChange = (country) =>{
//         console.log(country);
//     };


//     return (
//         <div className={styles.container}>
//             <Cards data={post} /> 
//             <CountryPicker  handleCountryChange={handleCountryChange}/>
//             <Charts/>
//         </div>
//     )
// }

// export default App;
import React from 'react';

import { Cards, CountryPicker, Charts } from './components';
import { fetchData } from './api/';
import styles from './App.module.css';

import image from './images/corona.png';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const data = await fetchData();
    console.log(data);
    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    console.log(data);

    this.setState({ data, country: country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} /> 
        {/* <Charts/> */}
      </div>
    );
  }
}

export default App;