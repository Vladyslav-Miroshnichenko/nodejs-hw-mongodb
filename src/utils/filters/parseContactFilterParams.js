const parseNumber = (number) => {
  if (typeof number !== 'string') return;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) return;

  return parsedNumber;
};

export const parseContactFilterParams = ({
  minReleaseYear,
  maxReleaseYear,
}) => {
  const parsedMinReleaseYear = parseNumber(minReleaseYear);
  const parsedMaxReleaseYear = parseNumber(maxReleaseYear);

  return {
    minReleaseYear: parsedMinReleaseYear,
    maxReleaseYear: parsedMaxReleaseYear,
  };
};
