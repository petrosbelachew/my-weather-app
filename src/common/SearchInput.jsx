import { useState } from "react";

import viteLogo from "/vite.svg";

import "./SearchInput.css";

function SearchInput() {
  return (
    <>
      <form action="" method="get">
        <div className="input-form">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              placeholder="Enter your city "
              type="text"
              name="city"
              id="city"
            />
          </div>
          <div className="form-group">
            <button type="submit">Search</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchInput;
