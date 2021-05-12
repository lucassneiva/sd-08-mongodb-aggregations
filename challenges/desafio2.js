// Desafio 2
// A escolha do filme da noite foi um sucesso,
// mas infelizmente ficamos com nossa banda de internet quase esgotada,
// e ainda precisamos de uma nova recomendação de filme. Para diminuir o volume de dados trafegados:

// Utilizando o mesmo pipeline anterior, retorne apenas os campos
// title, rated, imdb.rating, imdb.votes e year,
// modificando seus nomes para titulo, avaliado, notaIMDB, votosIMDB e ano, respectivamente.

db.movies.aggregate([{ $match: { $and: [{ "imdb.rating": { $gte: 7 } }, { genres: { $nin: ["Crime", "Horror"] } }, { rated: { $in: ["PG", "G"] } }, { languages: { $all: ["English", "Spanish"] } }] } }, { $project: { titulo: "$title", avaliado: "$rated", notaIMDB: "$imdb.rating", votosIMDB: "$imdb.votes", ano: "$year", _id: 0 } }]);

// O resultado da sua query deve ter o seguinte formato:
// { "titulo" : "A Streetcar Named Desire",
//  "avaliado" : "PG", "notaIMDB" : 8.1, "votosIMDB" : 72364, "ano" : 1951 }
// Demais documentos
// Ok!!
