import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment.dev';
import { WebSocketLink } from '@apollo/client/link/ws';
 
const wsClient = new WebSocketLink({
  uri: environment.graphUrl,
  options: {
    reconnect: true,
  },
});

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
     link: wsClient,
    //link: httpLink.create({ uri: "http://localhost:5001/graphql" }),
    cache: new InMemoryCache(),
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
