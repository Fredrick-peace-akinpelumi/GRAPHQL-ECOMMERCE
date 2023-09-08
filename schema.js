const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt}=require('graphql');

const goodsList=[
    {id:"1",name:"Laptop",price:"1000",quantity:10},
    {id:"2",name:"Mobile",price:"1000",quantity:10},
    {id:"3",name:"Phone",price:"1000",quantity:10},
    {id:"4",name:"Fax",price:"1000",quantity:10},
]

const sellerList = [
    {id:"1",name:"pisco", age:20, goodId:"1"},
    {id:"2",name:"akin", age:21, goodId:"2"},
    {id:"3",name:"albert", age:22, goodId:"3"},
    {id:"4",name:"posi", age:23, goodId:"4"},
]

const sellerType=new GraphQLObjectType({
    name:"seller",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        goodId:{type:GraphQLID},

        goods_details:{
            type: new GraphQLList (goodsTypes),
            resolve(parent,args){
                return goodsList.filter((val)=>val.id==parent.goodId)
            }
        }
    })
})

const goodsTypes= new GraphQLObjectType({
    name:"good",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        price:{type:GraphQLString},
        quantity:{type:GraphQLInt}
    })
})

const RootQuery= new GraphQLObjectType({
    name:"goods",
    fields:()=>({
        allGood:{
            type:new GraphQLList (goodsTypes),
            resolve(parent,args){
                return goodsList
            }
        },
        getSingleGood:{
            type:goodsTypes,
            args:{name:{type:GraphQLString}},
            resolve(parent,args){
                return goodsList.find((good)=>good.name===args.name)
            }
        },
        allSellers:{
            type: new GraphQLList (sellerType),
            resolve(parent,args){
                return sellerList
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query:RootQuery,
})