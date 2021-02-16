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
    filter: "equals",
    disableSortBy: true,
  },
  {
    Header: "Height(cm)",
    accessor: "height",
    disableFilters: true,

  },
];

export default charactersTableColumns;
