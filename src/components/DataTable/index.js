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
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              <th key={column.id}>
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
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} key={cell.id}>
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
