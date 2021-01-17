import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from '@apollo/client'
import {apolloClient} from "./apollo";
import EventList from "./components/event-list";

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={apolloClient}>
          <h1>All Events</h1>
          <EventList/>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

