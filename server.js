const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const goodsSchema = require('./schema') 
const todoSchema =  require('./todoSchema')
app.use(cors({
    origin: "*"
}))
app.listen(8001,(req,res)=>{
    console.log("App running");
})
let  graphiql=true;

app.use("/graphql", graphqlHTTP({
    schema:todoSchema,
    graphiql
}))
