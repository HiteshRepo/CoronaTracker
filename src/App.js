import React from 'react';

import { Cards, Chart, CountryPicker, StatePicker } from './components';
import styles from './App.module.css';
import { fetchData, fetchIndianStateWiseData } from './api';

import coronaImage from './images/image.png';

class App extends React.Component {
  state = {
    data: {},
    stateData: {},
    country: '',
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

    this.setState({ data: dataByState });

    // console.log(
    //   Object.values(this.state.stateData.data[state].districtData).reduce(
    //     (a, b) => Number(a['confirmed']) + Number(b['confirmed'])
    //   )
    // );
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt='COVID-19' />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <StatePicker
          handleStateChange={this.handleStateChange}
          country={country}
        />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
