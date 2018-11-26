import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TypedRouteSnapshot } from '../../../projects/ngx-typed-router/src/lib/types';
import { ExampleTestRoutePath, ExampleTestRouteQuery, ExampleTestRouteData } from './example.routes';

export interface ExampleResponse {
  id: string;
  name: string;
}

export type ExampleResolveSnapshot = TypedRouteSnapshot<Partial<ExampleTestRouteData>, ExampleTestRoutePath, ExampleTestRouteQuery>;

@Injectable({
  providedIn: 'root'
})
export class ExampleResolveService implements Resolve<ExampleResponse> {

  constructor() { }

  resolve(snapshot: ExampleResolveSnapshot) {
    return {
      id: snapshot.params.id,
      name: snapshot.queryParams.param1,
    } as ExampleResponse;
  }

}
