import { Injectable } from '@angular/core';
import { QueryOptions } from '@apollo/client';
import { Apollo, Query, gql } from 'apollo-angular';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo, private loader: LoaderService) { }

  public get(query : Query | string | QueryOptions) {
    let options : QueryOptions = query as QueryOptions;

    if (typeof query === 'string') {
      options = { query: gql`${query}` }
    }

    if (query instanceof Query) {
      options = { query: query.document }
    }

    this.loader.show();
    return this.apollo.query(options).pipe(finalize(() => this.loader.hide()));
  }

}
