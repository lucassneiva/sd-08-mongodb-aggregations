const atoreList = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];
const aggregation = [
  {
    $match:
      { $and:
        [
          { "tomatoes.viewer.rating": { $gte: 3 } },
          { countries: "USA" },
          { cast: { $in: atoreList } },
        ],
      },
  },
  {
    $addFields: {
      num_favs: { $size: { $setIntersection: [atoreList, "$cast"] } },
    },
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
];
db.movies.aggregate(aggregation);
