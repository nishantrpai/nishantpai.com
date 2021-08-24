---
title: How to organize your React project?
date: '2019-08-21'
tags: ['React.js']
draft: false
summary:
images: []
---

![](https://cdn-images-1.medium.com/max/1600/1*F43BJmkZKR8QpDIzpE1qLg.jpeg)

A while back, I saw someone tweet that flat file structure is better than a nested folder structure.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🔥 Hot take: Most people create way too many folders in their projects. Introducing 5 levels of nested folder structure makes things harder to find, not easier.<br/><br/>&quot;Organizing&quot; things doesn&#39;t actually make your code better or make you more productive 👀</p>&mdash; Adam Wathan (@adamwathan) <a href="https://twitter.com/adamwathan/status/1145109572081860610?ref_src=twsrc%5Etfw">June 29, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Usually, I scroll to such tweets, but something was in the back of my mind saying

> Would flat-file structure really be better than nested file structure?

Every project I've done so far has been in components, containers and then putting the dumb repeating elements as components and the pages in containers. Does this hierarchy not matter?

Then Dan jumped into the thread as well saying

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">+1. Long names, flat folders. <a href="https://t.co/YlyHtNDZ9u">https://t.co/YlyHtNDZ9u</a></p>&mdash; Dan (@dan_abramov) <a href="https://twitter.com/dan_abramov/status/1145354949871767552?ref_src=twsrc%5Etfw">June 30, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

So, I decided to recheck the official [documentation](https://reactjs.org/docs/faq-structure.html) whether they had a recommended way to go about this.

> Is there a recommended way to structure React projects?

> React doesn't have opinions on how you put files into folders. That said there are a few common approaches popular in the ecosystem you may want to consider.

So, there is definitely no say on what a good code structure would be for React, but to my surprise, there is definitely a warning regarding [avoiding nesting](https://reactjs.org/docs/faq-structure.html#avoid-too-much-nesting.):

Now, I'm curious how do other companies/projects organize their React projects?

![](https://cdn-images-1.medium.com/max/800/1*u8wClGuVkciDqUoJd7kCyw.gif)

* * * * *

### Facebook

Apparently, this same thread also had the answer to what facebook uses

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">When I just joined FB, I thought names like AdsManagerCustomAudienceSelectorTypeaheadToken.js are ridiculous. Now I think they’re great. I know exactly what it is by its name alone, can find all references by global search, can jump to file from IDE. Don’t care for folders.</p>&mdash; Dan (@dan_abramov) <a href="https://twitter.com/dan_abramov/status/1145355874719977473?ref_src=twsrc%5Etfw">June 30, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I found this to be really interesting

1\. This approach definitely ensures that there is consistency across teams.

2\. There is no mention of this approach in the documentation

- [Grouping by features/routes](https://reactjs.org/docs/faq-structure.html#grouping-by-features-or-routes)

![](https://cdn-images-1.medium.com/max/800/1*jaoEibmv4ShdPA3ZoPD_TA.png)

The hierarchy in this is decided by routes and the dumb components would be in the common folder. Seems pretty straightforward.

- [Grouping by file type](https://reactjs.org/docs/faq-structure.html#grouping-by-file-type)

![](https://cdn-images-1.medium.com/max/800/1*wnkR7beoRl0xAiyRMguUkQ.png)

There are more children from the root in this case, where we divide into `api`, `components`. This is how most React [boilerplates](https://en.wikipedia.org/wiki/Boilerplate_code) are organized,

-   https://github.com/react-boilerplate/react-boilerplate/tree/master/app
-   https://github.com/facebook/create-react-app

This file structure seems to make sense in boilerplates as it's a general approach to any project.

### Airbnb

-   *Components*: These are root components, for instance, the`Button` component would be declared in the following manner`Button/index.js` (styles in the same folder)
-   *Higher-order components*: Just a different name for containers, but they have the same structure `Container/index.js`

So, Airbnb doesn't seem to follow the flat hierarchy as facebook does.

*PS: Do check out the style guide it has a good set of practices mentioned.*

[airbnb/javascript](https://github.com/airbnb/javascript/tree/master/react)

### Uber

There doesn't seem to be much documentation on what Uber seems to be used as a guide, but I was able to decipher a few things from their [Github](https://github.com/uber?utf8=%E2%9C%93&q=react&type=&language=) though:

-   [React Map-GL](https://github.com/uber/react-map-gl/tree/master/website):

[uber/react-map-gl](https://github.com/uber/react-map-gl)

![](https://cdn-images-1.medium.com/max/800/1*NQOSeeNcYr1pJyXCLx6DMw.png)

Folder structure for the react-map-gl website

Based on this project it seems that they too are using `components` although, there are no `containers` , the [app](https://github.com/uber/react-map-gl/blob/master/website/src/components/app.js) is located in the components

![](https://cdn-images-1.medium.com/max/800/1*wu54O2K3RZRPAfCkhM993g.png)

They seem to be following a *flat structure* for a project for components and containers and for other types for eg; `utils` , `actions` , `reducers` there are separate folders.

Uber doesn't seem to be having a style guide, but it does have a [package](https://github.com/uber/standard) for ensuring:

-   Enforce a consistent style with no configuration across the project.
-   Catch style error's before they are submitted as PR's.

* * * * *

### Does this affect the performance of the app?

Nope. The final build version of the app is not affected by the code structure thanks to [webpack](https://webpack.js.org/) which bundles based on the file type irrespective of how you structure your app. Phew!

![](https://cdn-images-1.medium.com/max/800/1*BWrrEo8AcucEQrMcMODlIQ.png)

### Does this affect code readability?

Definitely. A good organization of components and containers ensures a standard which can be followed across teams and it's easier to onboard new devs as well (Probably true for most projects). It's a plus if you have a documented style guide like Airbnb did which others in the community could also check on.

* * * * *

### Additional Links

-   https://redux.js.org/faq/code-structure
-   http://react-file-structure.surge.sh (pun intended)
-   https://css-tricks.com/react-code-style-guide
-   https://github.com/styleguidist/react-styleguidist

### Conclusion

1.  There is no right way on how to organize your React project. If you are not sure initially, you could use the boilerplate and work accordingly.
2.  The performance of the app is not affected by how you organize your code.
3.  A consistent style guide is always a plus for the existing team and for onboarding new developers.