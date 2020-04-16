import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';

import styles from './DistrictPicker.module.css';

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

export default function DistrictSelect({
  state,
  districts,
  handleDistrictChange,
}) {
  const [fetchedStateData, setFetchedStateData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedStateData(await fetchIndianStateWiseData());
    };

    fetchAPI();

    console.log(fetchedStateData);
  }, [setFetchedStateData]);

  const classes = useStyles();

  const checkState = () => {
    if (state) {
      return false;
    }
    return true;
  };

  return (
    <FormControl>
      <Autocomplete
        id='state-select-demo'
        style={{ width: 300 }}
        options={districts}
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
            label='Choose a district'
            variant='outlined'
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
        disabled={checkState()}
        onChange={(e) => handleDistrictChange(e.target.innerText)}
      />
    </FormControl>
  );
}
