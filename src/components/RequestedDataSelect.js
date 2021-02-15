import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import axios from "axios";

const RequestedDataSelect = ({ requestUrl, shapeResForSelectFn, onChange }) => {
  const [isError, setIsError] = React.useState(false);

  const getPlaceholderText = () =>
    isError ? "Error! Could not load data" : "Select a movie";

  const getOptions = async () => {
    try {
      const { data } = await axios.get(requestUrl);
      return shapeResForSelectFn(data);
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={getOptions}
      defaultOptions
      onChange={onChange}
      placeholder={getPlaceholderText()}
    />
  );
};

RequestedDataSelect.propTypes = {
  requestUrl: PropTypes.string,
  shapeResForSelectFn: PropTypes.func,
  onChange: PropTypes.func,
};
RequestedDataSelect.defaultProps = {
  requestUrl: "",
  shapeResForSelectFn: (data) => data,
  onChange: () => false,
};

export default RequestedDataSelect;
