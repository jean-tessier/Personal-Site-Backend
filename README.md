# Personal Site Backend

## Table of Contents

1. [Project Overview](#project-overview)
    1. [The Problem](#the-problem)
    1. [The Solution](#the-solution)
1. [Technical Overview](#technical-overview)
    1. [The Runtime](#the-runtime)
    1. [Language Choice](#language-choice)
    1. [Data Storage](#data-storage)
    1. [Web Application Framework](#web-application-framework)
    1. [API](#api)

## Project Overview

### The Problem

When I initially developed my website, it was entirely a frontend application: data was hosted in static `.json` files and parsed on the fly to populate each page.
This resulted in the following issues:

- Unnecessary overhead on the client-side
- Unsustainability of `.json` files: a database would allow for stricter control of the data formatting
- The website was a poor reflection of my skills as a full-stack developer

### The Solution

The implementation of this backend resolved the above issues:

- The overhead of collecting data for the frontend was placed on the backend; additionally, because I've taken advantage of the GraphQL query language for my API,
the client can now intelligently cache data utilizing the Apollo GraphQL framework
- The use of MongoDB takes the responsibility of maintaining my data; utilizing the mongoose library, I can more strictly enforce the structure of my stored data,
and I can avoid serving my data as static files from which to pull data; utilizing a MongoDB UI tool such as MongoDB Compass, I can easily manually inspect and
maintain my data, if necessary
- The website now better reflects my skills as a full-stack developer

## Technical Overview

### The Runtime

Node.js was selected as the runtime for this project for the simplicity with which it allows development of asynchronous, event-driven programs; between this fact
and the popularity of Node.js across the web development field, this selection eases my development load and enhances my skills from my professional experience.

As Node.js is a single-threaded, event-based environment, it can be unsuitable for handling CPU-intensive apps
(though it does allow one to spin off additional processes, which one could imagine could be cleverly distributed to
avoid some of this drawback); however, since my app is quite simple, Node.js is a perfectly reasonable selection.

### Language Choice

With Node.js as the selected runtime for this project, language choice is narrowed down to two choices:

- JavaScript
- TypeScript

I've selected TypeScript for this project as its compile-time static typing improvers maintainability and reduces
syntactic errors, streamlining my development process and helping document my code for other developers.

Admittedly, TypeScript can have some drawbacks -- as its typing is only applied at compile time, it is unable to typecheck
data from third-party APIs; however, since all of this project's interaction is planned to be self-contained, this is no
concern for this project.

Additionally, TypeScript can be argued to add overhead to development time in requiring the developer to annotate types for
each variable. Between type inferencing relaxing the number of necessary annotations and the debugging time reduced by
TypeScript's usefully configured errors and warnings, the advantages far outweight any of these inconveniences.

### Data Storage

MongoDB was selected for data storage as its BSON data storage format can be conveniently processed into JSON for use in the backend.

While NoSQL databases like MongoDB lose strict typing and classic relational interactions between collections (analogous to relational database tables), we can
take advantage of the Monoogse Object Data Modeling library for MongoDB and Nodejs to manage relationships between data, validate schemas, and translate between
objects in code and the representation of theose objects in MongoDB.

Given that, for the most part, relational representations between collections are unnecessary for this backend, MongoDB is the perfect data storage solution for
this project.

### Web Application Framework

As the most commonly used Nodejs web application framework, Express was a pretty clear choice for web application framework. Being minimalist and flexible provides
ultimate control over the backend server to the developer.

The biggest concern with Express is its single-threaded nature, which we've previously reviewed regarding Nodejs's single-threaded-ness. I won't repeat the points here,
but the drawbacks presented are manageable and do not present an issue with the project at hand.

### API

For this project, GraphQL was used to provide an API with which the frontend could communicate with the server.

While GraphQL certainly adds some level of overhead to the server's resolution of API requests, this overhead is well worth with respect to the benefits it
provides. Having the flexibility to select exactly the fields needed for a particular call and a centralized endpoint with which to interact greatly simplifies
API interaction protocols, and vastly decreases development time that would be required for the more traditional REST endpoints.

Additionally, GraphQL is a rather new and exciting query language for API calls that I thought would be interesting to learn more about.
