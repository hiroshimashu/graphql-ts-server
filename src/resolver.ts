import * as bcrypt from "bcryptjs";
import { ResolverMap } from "./types/graphql-util";
import { User } from './entity/User';
export const resolvers: ResolverMap = {
    Query: {
      hello: (_: any, { name }: GQL.IHelloOnQueryArguments) => `Hello ${name || 'World'}`,
    },
    Mutation: {
        register: async (_, { email, password }: GQL.IRegisterOnMutationArguments) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = User.create({
                email, 
                password: hashedPassword
            })
            console.log(user);
            await user.save();
            return true;
        }
    }
  }

  
  