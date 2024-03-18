import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment.dev';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

const authHeader = `Bearer ${localStorage.getItem('token')}`;
const wsClient = new WebSocketLink({
  uri: environment.graphUrl,
  options: {
    reconnect: true,
  },
});

const httpUri = environment.apiUrl.replace("api", "graphql");
 
export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));
 
  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');
 
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: authHeader,
        },
      };
    }
  });  
 
  const link = ApolloLink.from([basic, auth, httpLink.create({ uri: httpUri }), wsClient]);
  const cache = new InMemoryCache();
 
  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
