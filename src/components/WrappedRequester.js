import React from "react";
import PropTypes from "prop-types";
import { useQueries } from "react-query";
import axios from "axios";
import styled from "styled-components";

const getData = async (url = "") => {
  const { data } = await axios.get(url);
  return data;
};

const WrappedRequester = ({
  urls,
  queryKey,
  children: childRenderer,
  renderLoader,
}) => {
  const results = useQueries(
    urls.map((url, index) => {
      return {
        queryKey: [queryKey, `${queryKey}_${index}`],
        queryFn: () => getData(url),
      };
    })
  );

  const isLoading = results.some((result) => result.isLoading);
  if (isLoading) {
    return <S.LoaderWrapper>{renderLoader()}</S.LoaderWrapper>;
  }

  return childRenderer(results);
};

WrappedRequester.propTypes = {
  urls: PropTypes.array,
  queryKey: PropTypes.string,
  children: PropTypes.func,
  renderLoader: PropTypes.func,
};
WrappedRequester.defaultProps = {
  urls: [],
  queryKey: "",
  children: () => null,
  renderLoader: () => null,
};

export default WrappedRequester;

const S = {};
S.LoaderWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
`;
