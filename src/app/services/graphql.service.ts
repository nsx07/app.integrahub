import { Injectable } from '@angular/core';
import { QueryOptions } from '@apollo/client';
import { Apollo, Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  public get(query : Query | string | QueryOptions) {
    let options : QueryOptions = query as QueryOptions;

    if (typeof query === 'string') {
      options = { query: gql`${query}` }
    }

    if (query instanceof Query) {
      options = { query: query.document }
    }

    return this.apollo.query(options);
  }

}
