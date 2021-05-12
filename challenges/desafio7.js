db.movies.aggregate([
  { $match: { countries: { $eq: "USA" } } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    numeroFilmes: { $sum: 1 },
    mediaIMDB: { $avg: "$imdb.rating" },
  } },
  { $project: { _id: 1, numeroFilmes: 1, mediaIMDB: { $round: ["$mediaIMDB", 1] } } },
  { $sort: { cast: -1, numeroFilmes: -1 } },
]);
