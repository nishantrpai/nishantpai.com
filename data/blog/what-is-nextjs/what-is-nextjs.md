---
title: What is Next.js and how you can build an AMP page with it?  
date: "2019-09-05"
summary: "Next.js is a framework for React.js apps, in this post we wanted to take a look at that and how you can build AMP pages with it?"
tags: ['next.js','react.js']
images: ["https://images.unsplash.com/photo-1465829235810-1f912537f253?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"]
---

![framework](https://images.unsplash.com/photo-1465829235810-1f912537f253?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80)

In this post, we wanted to take a look at one of the frameworks of React.js called **Next.js** and also **Accelerated Mobile Pages(AMP)** and how can build **AMP** using **Next.js**. Did you know that Marvels official [website](https://marvel.com) was built on Next.js, cool right?

## What is a Next.js?

> Next.js is a React.js framework.

![expand on that](https://media.giphy.com/media/8mhh8Ksp30jAimkp1p/source.gif)

*Everyone: But, what is a framework and what is different about React.js framework?*

A framework is a standard way to build and deploy applications. In other words, framework is a set of basic principles which are common across projects. When we say React.js framework, it's a set of principles & conventions for building React.js apps.

*Everyone: Why use a framework if we were building React.js without one?*

1. You don't need to define these set of principles each time you start a new project.

2. The design of frameworks is done so that you needn't spend a lot of time figuring out what the right way is and can get started immediately.

3. Consistency is key especially across large teams, where a framework reduces second guessing and not to mention reading, maintaining and developing code is much easier and quicker.

## How to use Next.js?

Now that we know that Next.js is a framework of React, let's dive into how to get started on this:

Similar to `create-react-app` there is one for `Next.js` called `create-next-app` .

1. Let's start our project, with this command: 

``` shell
    npx create-next-app nextjs-prj
```

2. Then we need to install Next.js, in our project

``` 
    npm install --save next react react-dom
```

3. Then you can start the application with

``` 
    npx next dev
```

4. There is already an existing welcome template in `pages/index.js` , but we will be replacing that to get an idea about what's going on:

``` javascript
function Home() {
    return <div > Welcome to Next.js! < /div>
}

export default Home
```

Something quite interesting if you didn't notice was, you needn't worry about `containers` and declaring the `routes` like the usual `React.js` apps, because you can add in `pages` for eg; `pages/home.js` would add a new route automatically for `/home` 😃.

5. Let's add some css!

``` javascript
function Home() {
  return ( 
    <div> 
      <p>Welcome to Next.js!</p> 
      <style jsx>{
      `
        p{
          color: white;
          font-size: 50px;
          text-align: center;
        }
      `
      }</style>
      <style global jsx>{
        `
        body {
          background: black;
        }
        `
      }
      </style>
    </div>
  )
}

export default Home
```

Now,

![confusion](https://media.giphy.com/media/SqmkZ5IdwzTP2/source.gif)

A few things might seem a bit different from the usual.  So let's break it one by one.

```javascript
      <style jsx>{
      `
        p{
          color: white;
          font-size: 50px;
          text-align: center;
        }
      `
      }
      </style>
```
*Everyone: what is this style element?*

Next.js is bundled with [styled-jsx](https://github.com/zeit/styled-jsx). Styled JSX is a package for supporting CSS for JSX, it allows you to write CSS with `<style jsx>` for the elements.

*Everyone: Is it similar to inline styling?*

Not really, it's writing styles for classes and elements in the same page, although it does look like inline styling, but it isn't.


*Everyone: What is the global prop and why is it separated?*

Global styles are for styling all across the page. In our examples we don't use the `body` tag as the framework has already declared it, but if we want to make any changes for the `body` element we would need the `global` prop.

6. Can we add components?

Yes, we can. Next.js allows you to make components in the `components/` directory. 

Seems like there is already a `Nav` element in the `components/` so we could reuse it.

```javascript
import Nav from '../components/nav' //imported the Nav element from components

function Home() {
  return (
    <div>
      <Nav/>
      <p>Welcome to Next.js</p>
      <a href='/home'>home page</a>
      <style jsx>{
        `
          p {
            color: white;
            font-size: 50px;
            text-align: center;
          }
          a {
            color: purple;
            font-size: 60px;
            text-decoration: none;
          }
        `
      }</style>
      <style global jsx>{
        `
          body {
            background: black;
          }
          `
      }
      </style>
    </div>
  )
}

export default Home
```

So similar to most React.js applications we use the `components`, in this case we imported `Nav` element and used it.

That's how Next.js works.

*Everyone: Ok, but why use Next.js when we already have React.js?*

## Why use Next.js?

In the above example we gave an example on how Next.js works, but why use Next.js?:

1. From the above example routing pages is definitely way easier. Just add it in the `pages` directory. For eg; `pages/home.js` would automatically add a page `/home` which would render from `pages/home.js`.

2. Something we didn't discuss was Next.js does server side rendering by default, if you use `create-react-app` it currently doesn't use server side rendering by default. 

*Everyone: What is server side rendering and why is it better?*

Server side rendering of the website is when, you host all of resources on the server. The other way is client side rendering, where the resources are requested through javascript. Server side rendering is usually preferable for static websites, because you don't want to request for a website then wait for the JS to render the HTML, but rather you'd want the HTML when you request the server.

3. Next.js has lazy loading for modules i.e., it has automatic code splitting which allows the pages to load faster.

From the above points, it seems Next.js may only be used for static websites, but it can be used for web apps as well.

*Now that we have a grasp on Next.js let's try to extend our project to be used as AMP pages*

## What are AMP pages?

AMP pages are Accelerated Mobile Pages. AMP pages are optimized for mobile use, slower websites have very high bounce rates with AMP you can serve visitors quicker. AMP is said to be a signal on Google mobile search index. If you google for any article or topic, you can see these AMP pages on the top of the search index.

![amp gif](/static/images/amp_google.gif)


*Everyone: How are AMP pages different from normal webpages?*


```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMP pages</title>
    <link rel="canonical" href="https://amp.dev/documentation/guides-and-tutorials/start/create/basic_markup/">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
```
Can check the example [here](https://amp.dev/documentation/guides-and-tutorials/start/create/basic_markup/?format=websites).


There are a few rules which make a page AMP page:

1. `<html amp>` identifies the page as AMP content.

2. `<script async src="https://cdn.ampproject.org/v0.js">` needs to be there inside the `<head>` tag.

3. You need a `<meta name="viewport" content="width=device-width,minimum-scale=1">` tag inside the `<head>` tag.

4. Page needs to start with `<!doctype html>`.

5. There needs to be a link to the actual page inside the `<head>` tag for eg; `<link rel="canonical" href="*actual page url*">`

6. The `amp-boilerplate` (AMP boilerplate code) needs to be in the `<head>` tag

From our above example:
```
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
```

`amp-boilerplate` is used for declaring CSS for the AMP.

## How to build AMP pages with Next.js?

Luckily, another cool feature which we forgot to mention was `Next.js` also supports AMP 😊.

Let's extend our example to be used as an AMP.

- `pages/index.js`

```javascript
import Nav from '../components/nav'
import { useAmp } from 'next/amp'

export const config = {
  amp: true
}

export default () => {  
  const isAmp = useAmp()
  return (
    <div>
      <Nav/>
      <p>Welcome to Next.js</p>
      <a href={isAmp ? '/home?amp=1' : '/home'}>home page</a>
      <style jsx>{
        `
          p {
            color: white;
            font-size: 50px;
            text-align: center;
          }
          a {
            color: purple;
            font-size: 60px;
            text-decoration: none;
          }
        `
      }</style>
      <style global jsx>{
        `
          body {
            background: black;
          }
          `
      }
      </style>
    </div>
  )
}
```
  
  The `useAmp` function from `next/amp` function helps to decide whether to use AMP or not.

  For our index page, we need to explicitly mention to use the page as an AMP, which is done through `config`. With `config` you can explicitly mention with `amp: true`. 
  
  ```js
  export const config = {
    amp: true
  }
  ```
   

- `pages/home.js`

```js
import { useAmp } from 'next/amp'

export const config = {
  amp: 'hybrid'
}

export default () => {
  const isAmp = useAmp()
  return (
    <div>
      <p>{isAmp ? 'Not AMP Home Page' : 'Home Page'}</p>
      <style jsx>{
        `
        p {
            color: white;
            font-size: 50px;
            text-align: center;
          }
          a {
            color: blue;
            font-size: 60px;
          }
        `
      }</style>
      <style global jsx>{
        `
        body {
          background: black;
        }
        `
      }
      </style>
    </div>
  )
}
```

In our `index` page, we explicity mentioned to use AMP with `amp: true`, but in the `home` page we are using `amp: hybrid`. We did it because, now AMP needs to be decided based on whether the homepage (index page) was an AMP or not.

If you check the `index` page as well, you can see here that

```js
      <a href={isAmp ? '/home?amp=1' : '/home'}>home page</a>
```

if the page `isAmp`, in the params we pass `amp=1`.

Cool! we extended our example to be used as an AMP too.

## Conclusion

1. Next.js is a very cool React.js framework, for quickly building websites. It has lot of interesting features, and getting started on `Next.js` is much easier instead of starting from scratch.

2. Next.js comes up bundled with styled-jsx. Styled-JSX allows you to write styles for the classes and elements inside the pages/components and also globally to `body` and encapsulating elements as well.🤘

3. AMP pages are optimized for mobile use, slower websites have very high bounce rates with AMP you can serve visitors quicker.

4. With the support that Next.js has provided for AMP, building AMP pages gets much easier.

5. If you want to check out the project, you check out the Next.js example that we worked on [here](https://github.com/nishantrpai/nextjs-prj), for the AMP Page example you can check it out [here](https://github.com/nishantrpai/nextjs-prj/tree/amp-pages) and the official Next.js examples [here](https://github.com/zeit/next.js/tree/canary/examples).

![bye](/static/images/bye.gif)