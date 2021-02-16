import React from "react";
import PropTypes from "prop-types";
import { useTable, useSortBy, useFilters } from "react-table";
import { Filter, DefaultColumnFilter } from "./filters";
import styled from "styled-components";
import usePrevious from "../../custom-hooks/usePrevious";
import isArraysEqual from "../../util-functions/isArraysEqual.func";

const generateSortingIndicator = (column) => {
  return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
};

const DataTable = ({ columns, data, extraRowsDataFn }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setAllFilters,
  } = useTable(
    {
      columns,
      data,
      /**
       * if no specific filter component is set in
       * header, default filterer shows (You can specify not to show filter at in columns
       * with prop: disableFilters ).
       * Filters results by search input value
       **/
      defaultColumn: { Filter: DefaultColumnFilter },
    },
    useFilters,
    useSortBy
  );

  const prevData = usePrevious(data);
  const hasDataChanged = !isArraysEqual(prevData, data);

  React.useEffect(() => {
    if (hasDataChanged) {
      setAllFilters([]);
    }
  }, [hasDataChanged, setAllFilters]);

  const renderExtraRows = (currentRowData) => {
    const extraRows = extraRowsDataFn(currentRowData);
    return extraRows.map((row) => (
      <tr key={`extra_row_${row.id}`}>
        {row.map((cell, index) => (
          <td key={`extra_row_cell_${index}`}>{cell}</td>
        ))}
      </tr>
    ));
  };

  return (
    <S.Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, headerGroupIndex) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={`header_group_${headerGroupIndex}`}
          >
            {headerGroup.headers.map((column, headerIndex) => (
              <th key={`header_${headerIndex}_${headerGroupIndex}`}>
                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {generateSortingIndicator(column)}
                </div>
                <Filter column={column} />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={`row_${rowIndex}`}>
              {row.cells.map((cell, cellIndex) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={`cell_${cellIndex}_${rowIndex}`}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <S.ExtraRowsBody>{renderExtraRows(rows)}</S.ExtraRowsBody>
    </S.Table>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  extraRowsDataFn: PropTypes.func,
};

DataTable.defaultProps = {
  columns: [],
  data: [],
  extraRowsDataFn: () => [],
};

export default DataTable;

const S = {};

S.Table = styled.table`
  width: 100%;
  color: white;

  tr,
  td {
    padding: 10px;
  }
`;

S.ExtraRowsBody = styled.tbody`
  color: yellow;
`;
