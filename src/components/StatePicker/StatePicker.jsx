import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';

import styles from './StatePicker.module.css';

import { fetchIndianStateWiseData } from '../../api';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function StateSelect({ country, handleStateChange }) {
  const [fetchedStateData, setFetchedStateData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedStateData(await fetchIndianStateWiseData());
    };

    fetchAPI();

    console.log(fetchedStateData);
  }, [setFetchedStateData]);

  const classes = useStyles();

  const checkIndia = () => {
    // console.log(country);
    // console.log(typeof country);
    if (fetchedStateData && fetchedStateData.data) {
      //   console.log(fetchedStateData);
      let statesNew = Object.keys(fetchedStateData.data);
      //   console.log(statesNew);
      //   console.log(Array.isArray(statesNew));
      statesNew = statesNew.map((state) => {
        return { label: state };
      });
      //   console.log(statesNew);
      //   console.log(Array.isArray(statesNew));

      states = statesNew;
    }

    if (country && country.toUpperCase() === 'INDIA') {
      return false;
    }
    return true;
  };

  return (
    <FormControl>
      <Autocomplete
        id='country-select-demo'
        style={{ width: 300 }}
        options={states}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(option) => (
          <React.Fragment>{option.label}</React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Choose a state'
            variant='outlined'
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
        disabled={checkIndia()}
        onChange={(e) => handleStateChange(e.target.innerText)}
      />
    </FormControl>
  );
}

let states = [
  { label: 'Kerela' },
  { label: 'Odisha' },
  { label: 'Delhi' },
  { label: 'Maharashtra' },
  { label: 'Tamil Nadu' },
];
