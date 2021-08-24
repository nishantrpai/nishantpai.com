---
title: Speed up your react development
date: '2018-03-26'
tags: ['React.js']
draft: false
summary:
images: []
---

### Speed up your react development

### Introduction

If you are a react developer, I feel your pain. All the troubles of code repetition and backtracking especially as you want to scale your application. If you are starting out as an enthusiast *insert some lines about how useful this is*. Setting up components folders, structuring everything, adding redux and routing from scratch can be tedious reminds me about the sloth from zootopia (his name was flash).

![](https://cdn-images-1.medium.com/max/800/0*qvW4Kygl8746qo6D.)

Arsenal

No! not the team arsenal, I meant your arsenal for react development needed a bit of new tools to help you speed-up again (if you feel you know these tools, then stick along for gifs) if you are new just tag along and keep your questions to yourself, they might not get answered 😂.

1.  [Create-react-app](https://github.com/facebook/create-react-app)

*hearing all react developers say, "I know this one"* Welp, this is a great tool for you to get started on react. To quote their own lines,

*"You* *don't* *need to install or configure tools like Webpack or Babel.*

*They are preconfigured and hidden so that you can focus on the code."*

If you are asking how does it work? great!

Installation

Luckily this is a gift from facebook and has a good community support etc., so all you gotta do is

`npm install create-react-app`

Usage

Usage you ask? It's pretty simple hope you have a name for your app.

```
create-react-app *insert your app name*

cd *your app name*
```

Cool! You have setup react * everyone: that's the whole blog?

Me: yeah the rest of the blog is gifs*.

So, now that you have setup react how do you run it?

*me: I like how you are asking the questions I can answer*

`npm start`

![](https://cdn-images-1.medium.com/max/800/0*4SnuDCuiD4KrA2QG.)

2\. [Prettier](https://github.com/prettier/prettier)

These kind of names do half my job, well prettier is a code formatter. The best part I felt is probably is that it can run on save, as a pre-commit hook or in CI environments *wow*.

* The new react developers asking "What's the use of it?"

Me: "shhhh...." *.

An example I love in their documentation is how they formatted this code

```
foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());
```

The output would be something like this

```
foo(
 reallyLongArg(),
 omgSoManyParameters(),
 IShouldRefactorThis(),
 isThereSeriouslyAnotherOne()
);
```

Pretty cool? *yeah it is* 👏

3\. Folder structure

Things are going to get serious from here *but, the jokes will continue*.

I hope you made an app using create-react-app *people getting started I am looking at you, if you haven't, go back and try create-react-app and laugh at those jokes again*

Everything in react is a component and here is where developers usually struggle, what happens is everything in react is a component so for eg; Header is a component, footer is a component etc., and if you want to use the header component you will have to do something like this in your `src/App.js`

```
<div className="App">
 <Header/>
</div>
```

![](https://cdn-images-1.medium.com/max/800/0*VYxH3NmO1b-xZToS.)

I see that exclamation on your face about what's happening..

Probably the people starting out in react may not have understood what I was trying to explain. So, react has something called "Components", components let you split the UI into independent, reusable pieces and work on them in isolation. Now if you try to read that explanation I was trying to give above, you'll understand.

So there are a few approaches you can make these components in your react app, lemme discuss the one which people usually follow.

![](https://cdn-images-1.medium.com/max/800/0*zja19_JT7FGQphhj.)

Your src/App.js imports may look something like.

```
import React, { Component } from 'react';
import './App.css';
import { Header } from './Header';
import { Footer } from './Footer';
```

And *bam* this is how you shouldn't do. *everyone: wait why?*

1.  If you knew the better way I wouldn't be writing so let me explain.

This is how chaos happens you start thinking there is nothing in writing a few import statements and it gets worse when you want to style the header etc, and then you find yourself writing multiple imports which slows down the webpack performance and personally I think it's a very crude way to code. *inserting chaos gif...*

![](https://cdn-images-1.medium.com/max/800/0*GwmuU60KKyrN7ZLY.)

2\. Now I was dialing up all along to explain what a good approach aka my way

Now this is just an explanation for components, but along the way I will be using the structure I am about to describe or you may have to go through all my puns again.

i) Use a folder called "components"

Yeah nothing original, just make a folder in src called components.

Then what you ask ? good question. You could make more folders for each component and import in index.js and then again import in the App.js and do it.

![](https://cdn-images-1.medium.com/max/800/0*koJb4sO9nVSxWteP.)

Ok, I see my way may have gotten a bit complicated, but wait I told you I would give you new tools for your arsenal right ? it's time to share one of them.

So I am sure you were there with me until the point I said make a folder called components in src.

Now here is a shell script I wrote for making this components the way you want and not worry so much about imports, feel free to hack it and change it the way you want to. Let's try to make a component called header. I call it

[makecomponent.sh](https://gist.github.com/nishantrpai/bdec3f6e1192137bc848eccf979c9002)

All you gotta do is

cd *your app name*/src/components\
sh *path of makecomponent.sh* Header

You might want to add sh *path of makecomponent.sh* as an alias in .bashrc. If you are a windows user...*rip*.

I am just considering that we are still making the header component so I wrote Header, if you want to make a footer component then you should do Footer duh!

Once you do that then your folder should look something like this

And your imports would look something like this.

```
import React, { Component } from 'react';
import './App.css';
import { Header } from './components';
```

You can style the header in Header/style.css also add this line in your App.css

```
@import './components/index.css';
```

probably you might still need to install a few packages for redux. 💔

Now suppose you want to make a footer *yes I don't want to think a lot on any other component*

Folder structure:

![](https://cdn-images-1.medium.com/max/800/0*Eb1Su269II4DUiow.)

And your imports would be

```
import React, { Component } from 'react';
import './App.css';
import { Header, Footer } from './components';
```

*everyone: all of this just for importing components easily?

Me: yeah well, it's a thankless job*

I'll probably cut short here and ask what you think about the tools I told you, do you have any better ones...can't wait to see how my tools help you 😅.