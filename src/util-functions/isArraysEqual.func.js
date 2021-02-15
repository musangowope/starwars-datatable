const isArraysEqual = (arrayOne = [], arrayTwo = []) =>
  JSON.stringify(arrayOne) === JSON.stringify(arrayTwo);

export default isArraysEqual;
