---
title: What is GraphQL (Part 1)? 
date: "2019-08-25"
summary: "In this blog we discuss on what is GraphQL, how it works and watch an awesome documentary 😀"
tags: ['graphql','react.js']
images: ["https://images.unsplash.com/photo-1465447142348-e9952c393450?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"]
---

![intersections](https://images.unsplash.com/photo-1465447142348-e9952c393450?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80)

In our last [post](/blog/what-is-gatsbyjs/) we were exploring GatsbyJS and something we overlooked was how GatsbyJS was using GraphQL. 

We felt, GraphQL deserved it's own blog - i.e., more content! 🤟.

## What is GraphQL?

![here we go](https://media.giphy.com/media/xThtaaVMcDRLZXEy9W/source.gif)

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.

GraphQL has a good phrase to explain this:

> Ask for what you need, 
> get exactly that

*Everyone: Umm, that isn't very clear on what GraphQL does and where it is used?*

Fair enough 😓. 

Let's say you want to build a blog. You would be needing two pages:

* A page for listing all the posts.

* A page for showing and individual post and it's contents.

Our API output structures would look something like this:

1. For getting a single post.

```javascript 
{
    id: string,
    title: string,
    body: string
}
```

2. For Listing for all the posts

```javascript
{
    posts: [Post] // a array of all the posts
}
```

*Things are about to get a little interesting now.*

Now, if you see for listing `Posts` , our query structure sends in everything about each `Post` , including the body for each `Post` which we don't want to list and it just increases the payload.

*GraphQL has entered the chat*

With GraphQL, it's much easier to take care of this. You can specify the appropriate query structure to get what you want. Now, posts would look something like this:

```javascript
{
    posts: [
      {
        id: string,
        title: string
      }
      ...
    ]
}
```

*Everyone: Where did GraphQL come from and save the day?*

![suspicious](https://media.giphy.com/media/4YWtPFasSBZMFrs7ML/giphy.gif)

Now, so far it's not a very clear picture on how GraphQL came in and solved this issue. But, what GraphQL does must be getting a bit clearer by now.

## How does GraphQL save the day?

GraphQL saves the day in two ways:

1. **Server side**:  GraphQL can be used from the server side. 

*Note: There are various implementation, but since we our core is javascript. We choose to use [express](https://expressjs.com/) (web framework for Node.js)*

So, say you have a web app and want to integrate GraphQL from backend you can use [express-graphql](https://github.com/graphql/express-graphql). 

Picking from [docs](https://graphql.org/graphql-js/running-an-express-graphql-server/) , a simple setup would be:

```javascript
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
```

If you run this locally, you could check ` http://localhost:4000/graphql ` 

![graphql](https://graphql.org/img/hello.png)

*Everyone: So, does that mean we don't need REST anymore?*

A lot of pieces are still missing, but spoilers: **yes** you could switch from REST to GraphQL. Although, currently most of the implementations that are happening are more of a wrapper for GraphQL around REST.

Which leads us to...

2. **API wrapper**

GraphQL is relatively very new (was open sourced in 2015) compared to other methodologies for eg; REST(was released in 1999). Currently the approach that the industry has started to embrace is that of using a API wrapper for GraphQL over existing methodologies, so it doesn't matter whether it's REST or SOAP.

We will be exploring that in part 2 (in progress) in which we will also discuss on how to integrate with React.js.

![all about](https://media.giphy.com/media/fxQZDPoO58TyBhhkwg/source.gif)


## Why are we embracing GraphQL as a new standard ?

One of the core things that GraphQL gives power is that the frontend can request for the exact data that it wants.

*Everyone: Why does that matter, is the flat structure of RESTful API not enough?*

This is probably one of those questions that we don't really understand until we really get to the origins of why and how GraphQL came to be.

We thought of writing about it, but there is a very good <a href="https://www.youtube.com/watch?v=783ccP__No8" target="_blank" rel="noopener noreferrer">documentary</a> 😍 that we would like to leave you with. They have traced the entire origin of GraphQL and how companies like Facebook, Github and Twitter etc., are adopting it.


The overall goal with this blog was to discuss how GraphQL works and give a brief overview into how the magic happens.

*Check out the part 2 [here](/blog/what-is-graphql-part-2/).*

![bye](https://media.giphy.com/media/k4ta29T68xlfi/giphy.gif)
