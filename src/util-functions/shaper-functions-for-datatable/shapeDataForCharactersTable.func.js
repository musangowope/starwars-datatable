const shapeDataForCharactersTableFunc = (data = []) =>
  data.map((dataItem) => {
    if (dataItem.isError) {
      const errMessage = "Data could not be retrieved";
      return {
        name: errMessage,
        gender: errMessage,
        height: errMessage,
      };
    }
    return {
      name: dataItem.data.name,
      gender: dataItem.data.gender,
      height: dataItem.data.height,
    };
  });

export default shapeDataForCharactersTableFunc;
