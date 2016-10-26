import express from 'express';
import bodyParser from 'body-parser';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import cors from 'cors';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { printSchema } from 'graphql/utilities/schemaPrinter';

import { subscriptionManager } from './data/subscriptions';
import schema from './data/schema';

const GRAPHQL_PORT = 3000;
const WS_PORT = 8090;

const graphQLServer = express().use('*', cors());

// Responds to GraphQL requests on /graphql
graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
  schema,
  context: {},
}));

// Provides GraphiQL, an in-browser graphical interactive GraphQL IDE on /graphiql
graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// Prints the schema back to the requestor
graphQLServer.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

// Set the GraphQL server instance to listen for traffic
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Starts the Websocket server
websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));

// eslint-disable-next-line
new SubscriptionServer(
  {
    subscriptionManager,
  },
  websocketServer
);
