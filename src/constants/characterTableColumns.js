import { GenderColumnFilter } from "../components/DataTable/filters";

const charactersTableColumns = [
  {
    Header: "Name",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "Gender",
    accessor: "gender",
    Filter: GenderColumnFilter,
    filter: "equals", // by default, filter: 'text', but in our case we don't want to filter options like text, we want to find exact match of selected option.
    disableSortBy: true,
  },
  {
    Header: "Height(cm)",
    accessor: "height",
    disableFilters: true,

  },
];

export default charactersTableColumns;
