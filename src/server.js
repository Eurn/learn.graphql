const { ApolloServer, gql } = require("apollo-server");
const { GraphQLScalarType, Kind } = require("graphql");
const lib = require("./bdd");

let posts = lib.posts;
let comments = lib.comments;
let users = lib.users;

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    password: String!
    firstName: String
    lastName: String
    pseudo: String
  }

  type Comment {
    id: Int!
    postId: Int!
    authorId: Int!
    content: String!
  }

  input CommentInput {
    authorId: Int!
    content: String!
  }

  type Post {
    id: Int!
    author: User!
    content: String!
    comments: [Comment]
  }

  type Query {
    getUsers: [User]
    getPosts: [Post]
    getCommentId(commentId: Int): Comment!
    getCommentOnPost(postId: Int): [Comment]!
    getPostId(postId: Int): Post!
  }

  type Mutation {
    createPost(authorId: Int, content: String): Post!
    createCommentPost(postId: Int, comments: [CommentInput]): Post!
    putPost(postId: Int, content: String): Post!
    putComment(commentId: Int, content: String): Comment!
    deletePost(postId: Int): Post!
    deleteComment(commentId: Int): Comment!
  }
`;

const resolvers = {
  Query: {
    getUsers: () => users,

    getPosts: () => posts,

    getPostId: (_, args) => {
      let post = posts.filter((tab) => tab.id == args.postId);
      if (post == -1) {
        let error = {
          id: 404,
          content: "No id for this post",
        };
        return error;
      }

      return post[0];
    },

    getCommentOnPost: (_, args) => {
      let post = posts.filter((tab) => tab.id == args.postId);
      let indexPost = posts.findIndex((tab) => tab.id == args.postId);
      if (post.length == 0) {
        let error = {
          id: 404,
          content: "No id for this post",
        };
        return error;
      }

      return posts[indexPost].comments;
    },

    getCommentId: (_, args) => {
      let comment = comments.filter((tab) => tab.id == args.commentId);
      let indexComment = comments.findIndex((tab) => tab.id == args.commentId);
      console.log(comment);
      if (indexComment == -1) {
        let error = {
          id: 404,
          content: "No comment for this id",
          postId: 404,
          authorId: 404,
        };
        return error;
      }

      return comments[indexComment];
    },
  },

  Mutation: {
    createPost: (_, args) => {
      let id = posts.length + 1;
      [author, content] = [args.authorId, args.content];
      let comment = [];
      const finalPost = { id, author, comment, content };
      posts.push(finalPost);
      console.log("postsUpdate", finalPost);
      return finalPost;
    },

    createCommentPost: (_, args) => {
      let id = posts.length + 1;
      let post = posts.filter((tab) => tab.id == args.postId);
      let indexPost = posts.findIndex((tab) => tab.id == args.postId);

      if (post.length == 0) {
        let error = {
          id: 404,
          content: "No id for this post",
        };
        return error;
      }
      [postId, authorId, content] = [
        args.postId,
        args.comments[0].authorId,
        args.comments[0].content,
      ];
      const finalComment = { id, postId, authorId, content };
      console.log(finalComment);

      if (posts[indexPost].comments == undefined) {
        posts[indexPost].comments = [];
      }

      posts[indexPost].comments.push(finalComment);

      return posts[indexPost];
    },

    putPost: (_, args) => {
      let post = posts.filter((tab) => tab.id == args.postId);
      let indexPost = posts.findIndex((tab) => tab.id == args.postId);
      console.log(indexPost);
      if (post.length == 0) {
        let error = {
          id: 404,
          postId: 404,
          authorId: 404,
          content: "No comment for this id",
        };
        return error;
      }
      posts[indexPost].content = args.content;

      return posts[indexPost];
    },

    putComment: (_, args) => {
      let comment = comments.filter((tab) => tab.id == args.commentId);
      let indexComment = comments.findIndex((tab) => tab.id == args.commentId);
      console.log(indexComment);
      if (comment.length == 0) {
        let error = {
          id: 404,
          postId: 404,
          authorId: 404,
          content: "No comment for this id",
        };
        return error;
      }

      comments[indexComment].content = args.content;
      console.log(comments[indexComment]);
      return comments[indexComment];
    },

    deletePost: (_, args) => {
      let post = posts.filter((tab) => tab.id == args.postId);
      let indexPost = posts.findIndex((tab) => tab.id == args.postId);
      if (post.length == 0) {
        let error = {
          id: 404,
          content: "No id for this post",
        };
        return error;
      }

      let stock_post = posts[indexPost];
      let newPosts = posts.filter((tab) => tab.id != args.postId);
      posts = newPosts;
      console.log(newPosts);

      return stock_post;
    },

    deleteComment: (_, args) => {
      let comment = comments.filter((tab) => tab.id == args.commentId);
      let indexComment = comments.findIndex((tab) => tab.id == args.commentId);
      if (comment.length == 0) {
        let error = {
          id: 404,
          postId: 404,
          authorId: 404,
          content: "No comment for this id",
        };
        return error;
      }

      let stock_comment = comments[indexComment];
      let newComments = comments.filter((tab) => tab.id != args.commentId);
      comments = newComments;
      console.log(newComments);

      return stock_comment;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
