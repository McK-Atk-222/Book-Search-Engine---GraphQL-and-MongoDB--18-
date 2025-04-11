import  User  from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';

interface Book {
    bookId: string;
    title: string;
    authors: string[];
    description: string;
    image: string;
    link: string;
}

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    bookCount: number;
    savedBooks: Book[];
}

interface AddProfileArgs {
    input:{
      name: string;
      email: string;
      password: string;
    }
  }

interface AddBookArgs {
    _id: string;
    book: Book;
  }
  
interface RemoveBookArgs {
    bookId: string;
  }

interface Context {
    user?: User;
  }


const resolvers = {
Query: {
me: async (_parent: any, _args: any, context: Context): Promise<User| null> => {
        if (context.user) {
          return await User.findOne({ _id: context.user._id });
        }
        throw AuthenticationError;
      },
    },
Mutation: {
login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: User }> => {
    const user = await User.findOne({ email });
    if (!user) {
      throw AuthenticationError;
    }
    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      throw AuthenticationError;
    }
    const token = signToken(user.username, user.email, user._id);
    return { token, user };
},
createUser: async (_parent: any, { input }: AddProfileArgs): Promise<{ token: string; user: User }> => {
    const user = await User.create({ ...input });
    const token = signToken(user.username, user.email, user._id);
    return { token, user };
},
saveBook: async (_parent: any, { _id, book }: AddBookArgs, context: Context): Promise<User | null> => {
    if (context.user) {
      return await User.findOneAndUpdate(
        { _id: _id },
        {$addToSet: { savedBooks: book }},
        {new: true, runValidators: true,}
      );
    }
    throw AuthenticationError;
},
deleteBook: async (_parent: any, { bookId }: RemoveBookArgs, context: Context): Promise<User | null> => {
    if (context.user) {
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: bookId } },
        { new: true }
      );
    }
    throw AuthenticationError;
},
}};

export default resolvers;