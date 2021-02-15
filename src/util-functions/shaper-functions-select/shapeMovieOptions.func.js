const shapeMovieOptions = (data = []) => {
  const { results = [] } = data;
  return results.map((result) => ({
    value: {
      opening_crawl: result.opening_crawl,
      character_urls: result.characters,
    },
    label: result.title,
  }));
};

export default shapeMovieOptions;
