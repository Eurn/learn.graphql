let users = [
  {
    id: 1,
    email: "bonjour@gmail.com",
    password: "mot de passe",
    firstName: "Marc",
    lastName: "Dupont",
    pseudo: "MD",
  },
  {
    id: 2,
    email: "Suspicious@gmail.com",
    password: "mdp",
    firstName: "Sarada",
    lastName: "Soupe",
    pseudo: "SaS",
  },
];

let posts = [
  {
    id: 1,
    author: {
      id: 1,
      email: "bonjour@gmail.com",
      password: "mot de passe",
      firstName: "Marc",
      lastName: "Dupont",
      pseudo: "MD",
    },
    content: "Voici mon permier post",
    comments: [
      {
        id: 1,
        postId: 1,
        authorId: 1,
        content: "ceci est un commentaire",
      },
      {
        id: 2,
        postId: 1,
        authorId: 1,
        content: "ceci est un autre commentaire ",
      },
    ],
  },
  {
    id: 2,
    author: {
      id: 2,
      email: "Suspicious@gmail.com",
      password: "mdp",
      firstName: "Sarada",
      lastName: "Soupe",
      pseudo: "SaS",
    },
    content: "WAAAAAAAAAAAAAAAAAAAAA",
    comments: [],
  },
];

let comments = [
  {
    id: 1,
    postId: 1,
    authorId: 1,
    content: "ceci est un commentaire",
  },
  {
    id: 2,
    postId: 1,
    authorId: 1,
    content: "ceci est un autre commentaire ",
  },
];

module.exports = { users, posts, comments };
