---
title: What is GraphQL and how to use with React.js (Part 2)? 
date: "2019-08-27"
summary: "In this blog we continue our discussion on what is GraphQL and how to use with React.js"
tags:  ['graphql','react.js']
images: ["https://images.unsplash.com/photo-1558131716-fe15c66cb56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"]
---

![intersections part 2](https://images.unsplash.com/photo-1558131716-fe15c66cb56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80)

Welcome back!

![we are back](https://media.giphy.com/media/ASd0Ukj0y3qMM/source.gif)

In our last [post](/blog/what-is-graphql-part-1/) we discussed on what is GraphQL and how it works. In this part, we will be looking at how to use GraphQL with API wrappers.

## How to use GraphQL with API wrappers?

GraphQL has two implementations for API wrappers as well:

1.**Server side**:

![server wrapper](/static/images/s_w.png)

*OC illustration to explain server side wrapper*👏

*Everyone: What does it mean to have a server side GraphQL API wrapper?*

Say you have a pre-existing REST API and you want to use server side wrapper for GraphQL, we would need another server (as in the illustration) which sits in between the client and REST server communication.

* The client would be accessing a GraphQL server, with no knowledge of the REST server

* The REST server would be communicating solely with the GraphQL server.

* The GraphQL server would be communicating the data from client to REST, and based on the `query` from the client would send the appropriate response.

*Everyone:* 🤔 *It's a bit confusing, how would that work?*

Let's try to setup and see how it would work.

In the last [post](/blog/what-is-graphql-part-1/), we discussed briefly about how GraphQL server (no wrapper) works

This was the example:

``` javascript
var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
    buildSchema
} = require('graphql');

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

The current implementation for server side wrapper is also going to be very similar to this.

We would be extending this to be our GraphQL server wrapper.

![here we go](https://media.giphy.com/media/dujg3dNjrf119zBXYD/source.gif)

1. For our REST API, we will be using https://jsonplaceholder.typicode.com/ which is an online fake REST API.

2. We need to setup our local GraphQL server, which would query the mock REST server.

3. So setup our `express-server` in `server.js` 

```javascript 
var express = require('express'); 
var graphqlHTTP = require('express-graphql'); 
var schema = require('./schema'); 
const app = express(); 

app.use(graphqlHTTP({

    schema,
    graphiql: true,
    
    

})); 
app.listen(4000); 

``` 

This time, our GraphQL server doesn't need a seperate endpoint so if you go to `localhost:4000` you would be able to interact with graphiql.

4. We need to define our `schema.js` 

In our previous example our schema was pretty much `hello: String` , but in this case we have `posts` and `post` which are an array and object respectively.

* For posts we could do:

```javascript
import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

const BASE_URL = 'https://jsonplaceholder.typicode.com/'

const QueryType = new GraphQLObjectType({
  name: 'Query'
  description: '...',
  fields: () => ({
    post: {
      type: PostType, //needs to be declared
    
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))), //array of posts
    }
  })
});

export default new GraphQLSchema({ //essentially our schema string from previous example
  query: QueryType,
});
```

* So, now that our overall schema has been set, we need to define `PostType` and also make our API calls (more importantly! 😅).

So let's get to that

``` javascript
import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql'

import fetch from 'node-fetch';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const QueryType = new GraphQLObjectType({
    name: 'Query'
    description: '...',
    fields: () => ({
        post: {
            type: PostType //needs to be declared
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: (root, args) =>
                fetch( `${BASE_URL}/posts/${id}` ) //API call for posts/1 say.
                .then(res => res.json())
        },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))), //array of posts
            resolve: (root, args) =>
                fetch( `${BASE_URL}/posts` ) //API call for all posts.
                .then(res => res.json())
        },
    })
});

export default new GraphQLSchema({ //essentially our schema string from previous example
    query: QueryType,
});
```

Now, that we have added our API calls. We need to finish it up by declaring our types.

``` javascript
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: '...',
    fields: () => ({
        title: {
            type: GraphQLString
        },
        body: {
            type: GraphQLString
        },
        id: {
            type: GraphQLString
        },
        user: {
            type: UserType, //need to declare the usertype
            args: {
                id: {
                    type: GraphQLString
                }
            }
            resolve: (post) => //pass the object that we received from the API call.
                fetch( `${BASE_URL}/users/${post.userId}` ) //API call for users/1 say.
                .then(res => res.json())
        }

    })
});
```

* We need to declare our `User` type now, since we have that in our `Post` 

``` javascript
const UserType = new GraphQLObjectType({
    name: 'User',
    description: '...',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }
    })
});
```

5. To summarize it, our `schema.js` should look like this 

``` javascript
import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql'

import fetch from 'node-fetch';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

function getPostById(id) {
    console.log(id);
    return fetch( `${BASE_URL}/posts/${id}` , {
            headers: {
                'Content-Type': 'application/json'
            }
        }) //API call for posts/1 say.
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        });
}

function getAllPosts() {
    return fetch( `${BASE_URL}/posts` ) //API call for posts/1 say.
        .then(res => res.json())
}

function getUser(id) {
    return fetch( `${BASE_URL}/users/${id}` ) //API call for posts/1 say.
        .then(res => res.json())
}

const UserType = new GraphQLObjectType({
    name: 'User',
    description: '...',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: '...',
    fields: () => ({
        title: {
            type: GraphQLString
        },
        body: {
            type: GraphQLString
        },
        id: {
            type: GraphQLString
        },
        user: {
            type: UserType, //need to declare the usertype
            resolve: (post) => getUser(post.userId)
        }
    })
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
        post: {
            type: PostType, //needs to be declared
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: (root, args) => getPostById(args.id),
        },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))), //array of posts
            resolve: () => getAllPosts()
        },
    })
});

module.exports = new GraphQLSchema({ //essentially our schema string from previous example
    query: QueryType,
});
```

*If there are any doubts/mistakes do let us know.*

6. Let's play with our graphql now.

-Listing all the post titles

![post titles](/static/images/posts.png)

-Listing the post details for `id:1` 

![post](/static/images/post.png)

That's a wrap on server side wrapper, you can check the repo [here](https://github.com/nishantrpai/graphql-server-wrapper) for server side wrapper. If you want to look at a more comprehensive example with loaders you can check out [GraphQL official documentation](https://graphql.org/blog/rest-api-graphql-wrapper/#a-server-side-rest-wrapper) for server side wrapper.

![its done](https://media.giphy.com/media/oxdVsTscIKUwg/giphy.gif)

Hopefully, you got an idea on how server side wrapper for GraphQL works.

2.**Client Side Wrapper** 

![server wrapper](/static/images/c_w.png)

*share this blog more such OC illustrations* 😅

As promised, we will be discussing on how to integrate with React.js here:

We are using [apollo-client](https://github.com/apollographql/apollo-client) and [create-react-app](https://github.com/facebook/create-react-app) for this.

*Note: It can get confusing which part of the code goes where* 😅*. Fear not, we got you covered...we have added a repo [here](https://github.com/nishantrpai/graphql-client-wrapper) for client side wrapper that you can use for reference.*

![Lets go](https://media.giphy.com/media/3o7TKUM3IgJBX2as9O/giphy.gif)

1. For this, we would be using `create-react-app` and `graphql-client-wrapper` .

2. We need to setup a few libraries in our project before we go forward.

Just run these commands locally, they should install the required libraries:

* `npm install --save apollo-client` 

* `npm install --save apollo-cache-inmemory` 

* `npm install --save apollo-link-rest apollo-link graphql graphql-anywhere qs` 

* `npm install --save graphql-tag` 

*You could also do `npm i --save *package name*` * 

2. Now we need to setup our client for interacting with the REST API

``` javascript
//setup the REST API
import {
    ApolloClient
} from 'apollo-client';
import {
    InMemoryCache
} from 'apollo-cache-inmemory';
import {
    RestLink
} from 'apollo-link-rest';
import gql from 'graphql-tag';
const restLink = new RestLink({
    uri: "https://jsonplaceholder.typicode.com/"
});

const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
});
```

3. We need to setup two routes in our `App.js` 

-Route for all our posts

-Rout for individual post with `:id` 

``` javascript
  < Router >
      <
      Route path = "/"
  exact component = {
      Posts
  }
  /> <
  Route path = "/posts/:id"
  component = {
      Post
  }
  /> < /
  Router >
```

4. We need to make a `query` for getting `Posts` through our `client` 

By the way, we forgot to mention previously that `query` is a GraphQL operation used for reading and fetching values, which is why we have been using `query` command to get our data.

``` javascript
export function getAllPosts() {
    return new Promise(function(resolve, reject) {
        const postsQuery = gql `
      query postsQuery {
        posts @rest(type: "[Post]", path: "/posts") {
          id
          title
        }
      }
    `
        client.query({
                query: postsQuery
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject([]);
            })
    });
}
```

5. Similarly, we need to make a query for getting the appropriate `Post` for the `id` 

``` javascript
export function getPost(id) {
    return new Promise(function(resolve, reject) {
        const postsQuery = gql `
      query postsQuery {
        post @rest(type: "[Post]", path: "/posts/${id}") {
          id
          userId @export(as: "id")
          title
          body
          user @rest(type: "User", path: "/users/{exportVariables.id}") { 
            # getting the user data from userId field.
            name
          }
        }
      }
    `
        client.query({
                query: postsQuery
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject([]);
            })
    });
}
```

6. Now, that our requests are set we need to define our `containers` for displaying all of our posts and individual post as we declared in our `Routes` previously.

``` javascript
import React from 'react';
import {
    getAllPosts
} from '../../services';

class Posts extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                posts: []
            }
        }

        componentDidMount() {
            getAllPosts().then(data => {
                    this.setState({
                        posts: data.posts
                    }));
            }

            render() {
                const {
                    posts
                } = this.state;
                console.log(posts, posts.length > 0);
                return ( <
                    div > {
                        posts.length > 0 && posts.map(post => < p > < a href = {
`/posts/${post.id}` 
                        } > {
                            post.title
                        } < /a></p > )
                    } <
                    /div>
                );
            }
        }
        export default Posts;
```

We make our API call on `componentDidMount` and set the state of `posts` from the received data. The GraphQL layer we built is being used as a service, so the containers are unaware of what is beneath. If you use redux, you could integrate the services with actions.

7. Similarly for `Post` , we did something like

``` javascript
import React from 'react';
import {
    getPost
} from '../../services';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                id: '',
                title: 'Loading...',
                body: '',
                user: {
                    name: ''
                }
            }
        }
    }
    componentDidMount() {
        getPost(this.props.match.params.id).then(data => this.setState({
            post: data.post
        }));
    }
    render() {
        return ( <
            div style = {
                {
                    maxWidth: '500px',
                    margin: 'auto'
                }
            } >
            <
            h1 > {
                this.state.post.title
            } < /h1> <
            h3 > {
                this.state.post.user.name
            } < /h3> <
            p > {
                this.state.post.body
            } < /p> < /
            div >

        );
    }
}
export default Post;
```

Similar to our approach for `Posts` we did it for `Post` .

This was very rudimentary setup to get going. We haven't added a lot of CSS, since our focus was on integrating GraphQL as a service with our containers.

One of the major drawbacks of using client side wrapper is that, the **payload remains the same**. While with server side wrapper, the client only receives as much as required (which is helpful for the  performance of web apps).

## Conclusion

* GraphQL can be used as client/server side wrapper over the REST API

* GraphQL lets you determine the structure of the response, without disturbing the entire backend.

* If you plan on migrating your existing APIs you could use libraries like `apollo-client` and `express-graphql` 😊, based on your approach to wrap.

* Here lies our [server-side wrapper](https://github.com/nishantrpai/graphql-server-wrapper) and here is our [client-side wrapper](https://github.com/nishantrpai/graphql-client-wrapper).

Let us know what you thought about this blog 🖖.

![party](https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif)

