import api from "./constants/api";
import shapeMovieOptions from "./util-functions/shaper-functions-select/shapeMovieOptions.func";
import shapeDataForCharactersTableFunc from "./util-functions/shaper-functions-for-datatable/shapeDataForCharactersTable.func";
import charactersTableColumns from "./constants/characterTableColumns";
import RequestedDataSelect from "./components/RequestedDataSelect";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import OpeningCrawl from "./components/OpeningCrawl";
import WrappedRequester from "./components/WrappedRequester";
import DataTable from "./components/DataTable";
import convertCmToInchesFunc from "./util-functions/convertCmToInches.func";
import convertCmToFeet from "./util-functions/convertCmToFt.func";
import styled from "styled-components";
import Loader from "./components/Loader";
import LogoSvg from "./assets/svgs/stars-wars-logo.svg";

const queryClient = new QueryClient();

function App() {
  const [filmState, setFilmState] = React.useState({
    title: "",
    character_urls: [],
    opening_crawl: "",
  });

  const handleSelectChange = ({
    label: title = "",
    value: { character_urls = [], opening_crawl = "" },
  }) =>
    setFilmState({
      character_urls,
      opening_crawl,
      title,
    });

  const generateTotalHeightString = (cm = 0) => {
    const inchesString = `${convertCmToInchesFunc(cm)}in`;
    const ftString = `${convertCmToFeet(cm)}ft`;
    return `${cm} cm (${ftString}/${inchesString})`;
  };

  const getTotalCmFromRowsData = (rows = []) => {
    const heightsArray = rows.map(({ cells = [] }) => {
      const value = parseFloat(
        cells.filter(({ column: { id } }) => id === "height")[0].value
      );
      return isNaN(value) ? 0 : value;
    });
    return heightsArray.reduce((acc, val) => acc + val, 0);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <S.AppWrapper>
        <S.FilmSelectWrapper>
          <RequestedDataSelect
            requestUrl={api.getFilmsUrl()}
            shapeResForSelectFn={shapeMovieOptions}
            onChange={handleSelectChange}
          />
        </S.FilmSelectWrapper>

        {filmState.title &&
        filmState.character_urls.length &&
        filmState.opening_crawl ? (
          <div>
            <S.FilmTitle>{filmState.title}</S.FilmTitle>

            <S.CrawlerWrapper>
              <OpeningCrawl text={filmState.opening_crawl} />
            </S.CrawlerWrapper>

            <WrappedRequester
              urls={filmState.character_urls}
              renderLoader={Loader}
            >
              {(data) => (
                <DataTable
                  data={shapeDataForCharactersTableFunc(data)}
                  columns={charactersTableColumns}
                  extraRowsDataFn={(currentRowsData) => {
                    const totalCm = getTotalCmFromRowsData(currentRowsData);
                    return [
                      [
                        <div>Total Characters {currentRowsData.length}</div>,
                        <div>
                          Total Height: {generateTotalHeightString(totalCm)}
                        </div>,
                      ],
                    ];
                  }}
                />
              )}
            </WrappedRequester>
          </div>
        ) : (
          <S.LoggerWrapper>
            <img src={LogoSvg} alt="star-wars-logo" />
          </S.LoggerWrapper>
        )}
      </S.AppWrapper>
    </QueryClientProvider>
  );
}

export default App;

const S = {};

S.AppWrapper = styled.div`
  padding: 40px;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
`;

S.FilmTitle = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

S.FilmSelectWrapper = styled.div`
  margin-bottom: 25px;
  color: black;
`;

S.CrawlerWrapper = styled.div`
  margin-bottom: 40px;
`;

S.LoggerWrapper = styled.div`
  text-align: center;
`;
