import { ActivatedRoute, ActivatedRouteSnapshot, Data, Params, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

export interface TypedRouteSnapshot<D = Data, P = Params, Q = Params> extends ActivatedRouteSnapshot {
  params: P;
  queryParams: Q;
  data: D;
}

export interface TypedRoute<D = Data, P = Params, Q = Params> extends ActivatedRoute {
  params: Observable<P>;
  queryParams: Observable<Q>;
  data: Observable<D>;
  snapshot: TypedRouteSnapshot<D, P, Q>;
}

export type ResolveConfig<T> = {
  [P in keyof T]: {
    new (...args): Resolve<T[P]>;
  };
};
