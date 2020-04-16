import React from 'react';

import {
  Cards,
  Chart,
  CountryPicker,
  StatePicker,
  DistrictPicker,
} from './components';
import styles from './App.module.css';
import { fetchData, fetchIndianStateWiseData } from './api';

import coronaImage from './images/image.png';

class App extends React.Component {
  state = {
    data: {},
    stateData: {},
    country: '',
    state: '',
    districts: [],
    district: '',
  };

  sum(obj) {
    var sum = 0;
    for (var dist in obj) {
      for (var el in dist) {
        sum += parseFloat(el);
      }
    }
    return sum;
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  handleStateChange = async (state) => {
    const fetchedStateData = await fetchIndianStateWiseData();
    this.setState({ stateData: fetchedStateData });

    const confirmed = this.sum(this.state.stateData.data[state].districtData);

    const dataByState = {
      confirmed: { value: confirmed },
      recovered: { value: 0 },
      deaths: { value: 0 },
      lastUpdate: this.state.data.lastUpdate,
    };

    this.setState({ data: dataByState, state: state });

    let districts = Object.keys(this.state.stateData.data[state].districtData);
    districts = districts.map((district) => {
      return { label: district };
    });

    this.setState({ districts: districts });
  };

  handleDistrictChange = async (district) => {
    const stateData = this.state.stateData;
    const confirmed = this.state.stateData.data[this.state.state].districtData[
      district
    ].confirmed;

    const dataByDistrict = {
      confirmed: { value: confirmed },
      recovered: { value: 0 },
      deaths: { value: 0 },
      lastUpdate: this.state.data.lastUpdate,
    };

    this.setState({ data: dataByDistrict, district: district });
  };

  render() {
    const { data, country, state, districts } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt='COVID-19' />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <StatePicker
          handleStateChange={this.handleStateChange}
          country={country}
        />
        <DistrictPicker
          state={state}
          districts={districts}
          handleDistrictChange={this.handleDistrictChange}
        />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
