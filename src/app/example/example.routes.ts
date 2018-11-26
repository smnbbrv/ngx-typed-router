import { Params, Routes } from '@angular/router';
import { ResolveConfig } from '../../../projects/ngx-typed-router/src/lib/types';
import { ExampleResolveService, ExampleResponse } from './example-resolve.service';
import { ExampleComponent } from './example/example.component';

export const ExampleRoutes: Routes = [
  {
    path: 'test/:id',
    component: ExampleComponent,
    resolve: {
      exampleResponse: ExampleResolveService,
    } as ResolveConfig<ExampleTestRouteData>,
  },
];

export interface ExampleTestRouteQuery {
  param1: string;
}

export interface ExampleTestRoutePath {
  id: string;
}

export interface ExampleTestRouteData {
  exampleResponse: ExampleResponse;
}
