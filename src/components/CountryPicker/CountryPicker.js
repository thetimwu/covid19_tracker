import React from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import * as styles from "./CountryPicker.module.css";

const CountryPicker = ({ data: { countries }, setCountry }) => {
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect onChange={(e) => setCountry(e.target.value)}>
        <option value="">Select a country</option>
        <option value="globe">Globe</option>
        {countries.map((country, i) => (
          <option key={i} value={country.name}>
            {country.name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
