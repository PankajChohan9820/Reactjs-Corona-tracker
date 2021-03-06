import React, {useState, useEffect} from "react";
import { NativeSelect,FormControl } from "@material-ui/core";
// import { fetchCountries } from "../../api"
import styles from './CountryPicker.module.css'
import {fetchingcountries} from "../../api"


const CountryPicker = ({handleCountryChange}) =>{


    const [fetchedCountries, setfetchedCountries]= useState([]);
    useEffect(()=>{
        const fetchCountries = async ()=>{
            setfetchedCountries( await fetchingcountries());
        }
        fetchCountries();
    },[setfetchedCountries]);
 
    return(
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
                <option value="global">Global</option>
                {fetchedCountries.map((country, i)=><option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
export default CountryPicker;
