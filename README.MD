# Apollo Node Simple Example

This project is my attempt at following the simple example [found here](https://github.com/apollostack/frontpage-server) by adding my own twist.

What I hope to get working:
* Simple schema with basic Query and Mutation
* Simple Pub/Sub using Apollo's Subscriptions

Bonuses:
* A simple client that can actually read/write to the server
* Schema in a separate *.graphql file
* A slightly-less simply client that could subscribe to changes in the data

To start the app, simply install all the dependencies via npm:

```bash
npm install
```

Then run the application via npm:

```bash
npm start
```

The application will start two servers on two separate ports: the GraphQL ([localhost:3000/graphql](http://localhost:3000/graphql)) and GraphiQL ([localhost:3000/graphiql](http://localhost:3000/graphiql)) handlers on port 3000 and the WebSockets server ([localhost:8090](http://localhost:8090)) to handle the pub/sub on port 8090.
