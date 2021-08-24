---
title: How to Dockerize your React app?  
date: "2019-09-06"
summary: "Dockerize means to wrap your app in a docker container, but what is docker and how do you use it with React?"
tags: ['docker','react.js']
images: ["https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1368&q=80"]
---

![cover](https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1368&q=80)

> Note: Docker is used for deploying apps in general, for this post we are sticking to how you can deploy a React app using docker.

## What is dockerizing?

Dockerizing an application is the process of converting an application to run within a Docker container.

![container](https://media.giphy.com/media/6AFldi5xJQYIo/source.gif)

For people who don't know about docker that may be a bit vague.

Containers are similar to virtual machines, they provide an isolated environment for your application.

A good example of how dockers are helpful is say you are using Windows for building your app, but the server where you would be deploying is Linux, in such cases docker is really helpful. You don't need to write any deployment specific commands and then change them back while building, with docker you can use a fixed dependency both for building and deploying and save time worrying about your environment ✨.

*Everyone: How does this magic happen?*

This is how the magic happens, 

![docker](/static/images/docker_overview.png)

This may seem a bit confusing, so let's break it

* _Docker_: Docker provides a platform to run containers over any Host OS.

* _Container_: Every application runs inside the container. Our container includes all the dependencies that we need for the app and we deploy the container with the included dependencies to run our app.

* _Base Image_: Each container has a base image for eg; Ubuntu, CentOS are an example of base image. Docker has over 100, 000 images and we are going to use on to build a container. Base image includes all the dependencies we need for our app.

* _Image_: The base image and the app together are called an Image. Hence the color difference 😁.

## How does docker work?

![curious](https://media.giphy.com/media/itOuxcFvgYjWE/source.gif)

We know what problem docker solves, and we have a rough idea on how docker works.

Let's jump into dockerizing a React app and see how docker really works. Since our main focus for this post is to dockerize, we are going to use the Next.js project from our previous [post](/blog/what-is-nextjs) to save time 🤘.

## Installing docker

Different operating systems have different docker installation processes.
You can check out the official docs for installing below, also they are pretty lengthy and specific to OS versions (not to mention we are too lazy 😅).

* [Mac](https://docs.docker.com/docker-for-mac/install/)
* [Windows](https://docs.docker.com/docker-for-windows/install/)
* [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)
* [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
* [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [Binaries](https://docs.docker.com/install/linux/docker-ce/binaries/)

Once you are done installing, you can try out this command to see if docker is working

```
docker run hello-world
```

and you should see this

```

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

that means you have successfully installed docker. Good work! 👏👏.


## Dockerizing our app

Now, we need a docker container in which we will be running our application.

*Everyone: How do we make a docker container?*

![confused](https://media.giphy.com/media/mvoxdYnpyk23u/source.gif)


1. Docker uses a `Dockerfile` (in the same directory as your project) to build the container.

Let's create a `Dockerfile` .

_We brushed briefly over how docker works, but while making this Dockerfile we get to see how a docker container really works and how to make one._

Like a good cooking show, we already have our `Dockerfile` ready 😆. Let's get into what it is.


``` docker
# base image
FROM node:10.16.3-jessie

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install --save next react react-dom               

# start app
CMD ["next", "dev"]
```

### Base Image

Every container has a base image. A base image is something which includes all the dependencies needed to execute the code.

*Everyone: Where does this image come from and how does it work?*

Docker provides a really amazing service called [Docker Hub](https://hub.docker.com/), which has more than 100,000 container images.

For our project, we need a docker image to primarily run Node. So, we define our base image to be:

``` docker
# base image
FROM node:10.16.3-jessie
```

You could use an Ubuntu base image,

```docker
# base image
FROM ubuntu:16.04-xenial
```

but it wouldn't have node dependencies, which we need (duh!).


### Installing App dependencies 

Now that we have chosen our base image, we want to create and use a particular directory for our app in our container. So, we have the command:

``` docker
WORKDIR /app
```

Once we setup our working directory, we need to install our packages. We could install, through these commands:

``` docker
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install --save next react react-dom
```

### Running the app

Finally, we need to run the app, so we have the command

``` docker
# start app
CMD ["next", "dev"]
```

<br/>

2. We installed the packages in the container, we don't want our local dependencies from `node_modules` being used.

Docker has another file to ignore in such cases called `.dockerignore` 

``` docker
node_modules
```

With this, our local dependencies will be skipped from sending to the container. If you have ever used [Git](https://git-scm.com/) this is similar to `.gitignore` .

3. Now that we are done setting up our container configuration, we need to **build** our container.

We will be running the following command (in our console)

``` 
docker build .
```

This will build our container from the local project files, except for `node_modules` (since it's in `.dockerignore`).

4. Once our container is built, in the last line we get a message which looks like

``` 
Successfully built edbdf759cd55
```
(hash may differ)

in the end.

5. Now, we need to **run** the app so we use the command

``` 
docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm edbdf759cd55
```
_(since the app is in our container)_

Now, if you now connect to `localhost:3000` you won't be able to. 

That is because, the app is running inside the container on port `3000`, but with this option

``` 
-p 3001:3000
```

while running our container, our host connects via the port `3001`. If you go to `localhost:3001` you can connect to the app 😊.


5. If you want to stop the app, you need to run the command 

``` 
docker ps
```

With this, docker will enlist all the containerized applications.

``` 
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
39adcb9b4f0f        edbdf759cd55        "docker-entrypoint.s…"   5 minutes ago       Up 5 minutes        0.0.0.0:3001->3000/tcp   awesome_wilson
```

We know our docker image id to be `edbdf759cd55` , we need to use the `CONTAINER ID` for stopping the container.

``` 
docker stop 39adcb9b4f0f
```

The container stops running and the app is inaccessible.

*Everyone: What if you want to start the app again?*

You just need to run the command

``` 
docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm edbdf759cd55
```

## Docker Compose

_Is there any other way to run containers?_

![better way](https://media.giphy.com/media/TPl5N4Ci49ZQY/source.gif)

Indeed there is a way to run the docker container in the background with the services mentioned, thanks to [Docker Compose](https://docs.docker.com/compose/).

1. You can configure your application's services with `docker-compose.yml` .

``` docker
version: '3.7'
services:
  nextjsprj:
    container_name: nextjsprj
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - '.:/app'
      - '/app/node_modules
    ports:
      - '3001:3000'
```

2. If you want the give the container a spin, you need to run

``` 
docker-compose up
```

and if you run 

``` 
docker ps
```

you can check our container to be running

``` 
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                    NAMES
9ba9bd01ed07        nextjs-prj_nextjsprj   "docker-entrypoint.s…"   15 hours ago        Up 14 minutes       0.0.0.0:3001->3000/tcp   nextjsprj

```

3. To stop the container you just need to do the following

``` 
docker-compose stop
```

With docker compose, you can run multiple containers without checking which container to run or to stop.

## Deploying

![deploy](https://media.giphy.com/media/67rfI3AQcbHPO0qK8m/source.gif)

We were able to build and run a docker image so far, but we discussed about using docker to deploy our app.

*How do we deploy using docker image?*

While building our image we discussed about [Docker Hub](https://hub.docker.com/). We can use docker hub to deploy our images as well 😍.

1. We tagged our image with our `quicklyreact1/nextjsprj` (`username/project`), 

``` 
docker tag nextjs-prj_nextjsprj quicklyreact1/nextjsprj
```

This tag doesn't affect our local image, but if we push our image

``` 
docker push quicklyreact1/nextjsprj
```

If you haven't logged in, you may need to sign up to [Docker Hub](https://hub.docker.com/)

```
docker login
```

Once you deploy, you can find the image for our project [here](https://hub.docker.com/r/quicklyreact1/nextjsprj).

2. If you want to pull this image on your server 

``` 
docker pull quicklyreact1/nextjsprj
```

and run it with 

``` 
docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm quicklyreact/nextjsprj 
```

Woah! we got to run, build and deploy our app 🎉🎉🎉


## References:


* [Docker terminology](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/container-docker-introduction/docker-terminology)
* [Dockerfile Reference](https://docs.docker.com/engine/reference/builder)
* [Docker Docs](https://docs.docker.com/)
* [Dockerized App](https://github.com/nishantrpai/nextjs-prj/tree/dockerize) 

## Conclusion

1. Dockerizing your app gives you the freedom to not worry about any Host OS dependencies.

2. Docker Hub provides an amazing resource with more 100,000 containers to check out from.

3. Docker Compose allows you to control the services of your application and with a single command allows you to run and stop your container.

4. Docker Hub can also be used for deploying your image, which you could then use on the server with a single command.