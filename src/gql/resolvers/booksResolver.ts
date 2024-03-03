import {
  MutationAddBookArgs,
  AddBookMutationResponse,
} from "../../__generated__/globalTypes";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export default {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: (
      parent: any,
      { title, author }: MutationAddBookArgs
    ): AddBookMutationResponse => {
      // Your own add logic
      // books.push({ title: `${title}`, author: `${author}` });

      return {
        book: books.pop(), // Your own return.
      };
    },
  },
};
