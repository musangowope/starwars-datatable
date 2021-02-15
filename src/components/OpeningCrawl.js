import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const OpeningCrawl = ({ text }) => {
  return (
    <S.Marquee behavior="scroll" direction="up">
      {text}
    </S.Marquee>
  );
};

OpeningCrawl.propTypes = {
  text: PropTypes.string,
};
OpeningCrawl.defaultProps = {
  text: "",
};

export default OpeningCrawl;

const S = {};
S.Marquee = styled.marquee`
  height: 100px;
`;
