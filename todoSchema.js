const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const todoList = [
  { id: "3", todo: "gym", todoTime: "6am" },
  { id: "1", todo: "Cook", todoTime: "8am" },
  { id: "2", todo: "Wash", todoTime: "10am" },
];

const todoType = new GraphQLObjectType({
  name: "todo",
  fields: () => ({
    id: { type: GraphQLID },
    todo: { type: GraphQLString },
    todoTime: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "todos",
  fields: {
    allTodo: {
      type: new GraphQLList(todoType),
      resolve(parent, args) { 
        return todoList;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "add_todo",
  fields: {
    addTodo: {
      type: new GraphQLList(todoType),
      args: {
        id: { type: GraphQLID },
        todo: { type: GraphQLString },
        todoTime: { type: GraphQLString },
      },
      resolve(parent, args) {
        todoList.push(args);
        return todoList;
      },
    },
    delTodo: {
      type: new GraphQLList(todoType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return todoList.filter((val) => val.id != args.id);
      },
    },
    editTodo:{
        type: new GraphQLList(todoType),
        args:{
        id:{type: new GraphQLNonNull(GraphQLID)},
        todo:{type: new GraphQLNonNull (GraphQLString)},
        todoTime:{type: new GraphQLNonNull (GraphQLString)},
     },
     resolve(parent,args){
         todoList[parseInt(args.id)-1].todo=args.todo;
         return todoList
     }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});
// const Mutation = new GraphQLObjectType({
//     name:"add_new_infos",
//     fields:{
//         addBook:{
//             type:new GraphQLList (bookTypes),
//             args:{
//                 id:{type: new GraphQLNonNull(GraphQLID)},
//                 name:{type: new GraphQLNonNull (GraphQLString)},
//                 genre:{type: new GraphQLNonNull (GraphQLString)},
//                 authorId:{type: new GraphQLNonNull (GraphQLID)}
//             },
//             resolve(parent,args){
//                 bookList.push(args)
//                 return bookList
//             }
//         },
//         delBook:{
//             type: new GraphQLList (bookTypes),
//             args:{id:{type: GraphQLID}},
//             resolve(parent,args){
//                 return bookList.filter((val=>val.id!=args.id))
//             }
//         },
//         editBook:{
//             type: new GraphQLList (bookTypes),
//            
//         }
//     }
// })
