const express = require("express")
const { graphqlHTTP } = require("express-graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } = require("graphql");

const app = express();

var userList = [
    { name: "durai", id: "1", email: "durai@qcodesinfotech.com" },
    { name: "malar", id: "2", email: "malar@qcodesinfotech.com" },
    { name: "sulaiman", id: "3", email: "sulaiman@qcodesinfotech.com" },
]

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        //to get all Users
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return userList
            }
        },
        // to get user by id
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return userList.find((user) => user.id === args.id)
            }
        }
    }
});

const mutations = new GraphQLObjectType({
    name: "mutations",
    fields: {
        //add User
        addUser: {
            type: UserType,
            args: { name: { type: GraphQLString }, email: { type: GraphQLString } },
            resolve(parent, { name, email }) {
                const newUser = { name, email, id: Date.now().toString() };
                userList.push(newUser);
                return newUser;
            },
        },
        //update User
        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parent, { name, email, id }) {
                const user = userList.find(item => item.id === id);
                user.email = email;
                user.name = name;
                return user;
            }
        },
         //delete User
         deleteUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, { id }) {
                const userIndex = userList.findIndex(item => item.id === id);
                if (userIndex === -1) {
                    throw new Error('User not found');
                }
                const [deletedUser] = userList.splice(userIndex, 1);
                return deletedUser;
            }
        }
    }
})

const schema = new GraphQLSchema({ query: RootQuery, mutation: mutations })

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }))
app.listen(5000, () => {
    console.log("app listen 5000")
})