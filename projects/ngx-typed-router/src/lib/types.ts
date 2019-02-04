import { ActivatedRoute, ActivatedRouteSnapshot, Data, Params, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

// credits to https://stackoverflow.com/a/51365037/1990451
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

export interface TypedRouteSnapshot<D extends Data = Data, P extends Params = Params, Q extends Params = Params>
  extends ActivatedRouteSnapshot {
  params: P;
  queryParams: Q;
  data: D;
}

export interface TypedRoute<D extends Data = Data, P extends Params = Params, Q extends Params = Params>
  extends ActivatedRoute {
  params: Observable<P>;
  queryParams: Observable<Q>;
  data: Observable<D>;
  snapshot: TypedRouteSnapshot<D, P, Q>;
}

export interface TypedRouteMock<D extends Data = Data, P extends Params = Params, Q extends Params = Params>
  extends RecursivePartial<TypedRoute<D, P, Q>> {
}

export type ResolveConfig<T> = {
  [P in keyof T]: {
    new(...args: any[]): Resolve<T[P]>;
  };
};
