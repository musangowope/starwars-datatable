import React from "react";

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render("Filter")}
    </div>
  );
};

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`search (${length}) ...`}
    />
  );
};

export const GenderColumnFilter = ({
  column: { filterValue, setFilter },
}) => {
  const selectRef = React.useRef();
  React.useEffect(() => {
    if (!filterValue) {
      //Make select first option (All) if filter value is undefined
      //This happens new movie is selected
      selectRef.current.selectedIndex = 0;
    }
  }, [filterValue]);

  // Known star wars genders
  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Unknown",
      value: "unknown",
    },
    {
      label: "Hermaphrodite",
      value: "hermaphrodite",
    },
    {
      label: "N/A",
      value: "n/a",
    },
  ];

  return (
    <select
      ref={selectRef}
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {genderOptions.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
