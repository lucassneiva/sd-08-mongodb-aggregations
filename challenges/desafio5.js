db.movies.aggregate([
  {
    $addFields: {
      castingByFilter: {
        $setIntersection: [
          "$cast",
          ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
        ],
      },
    },
  },
  {
    $match: {
      $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
      ],
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      num_favs: {
        $cond: {
          if: { $isArray: "$castingByFilter" },
          then: { $size: "$castingByFilter" },
          else: null,
        },
      },
      countries: 1,
      "tomatoes.viewer.rating": 1,
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      title: 1,
    },
  },
]);
