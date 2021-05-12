db.movies.aggregate([
  {
    $match:
    {
      "tomatoes.viewer.rating": { $gte: 3 },
      countries: { $in: ["USA"] },
      cast: { $exists: true },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [
            [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
            "$cast",
          ],
        },
      },
    },
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: { title: 1, _id: 0 },
  },
]);
