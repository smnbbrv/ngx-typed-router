# ngx-typed-router

The same Angular router with types for router configuration, resolvers, components and even unit tests.

Finally, the type-safe routes with IDE hints and refactoring support.

[![Build Status](https://img.shields.io/travis/smnbbrv/ngx-typed-router/master.svg)](https://travis-ci.org/smnbbrv/ngx-typed-router)
[![Coverage Status](https://img.shields.io/coveralls/github/smnbbrv/ngx-typed-router/master.svg)](https://coveralls.io/github/smnbbrv/ngx-typed-router?branch=master)

## Installation

```sh
npm i ngx-typed-router
```

## Usage

See the [example application](https://github.com/smnbbrv/ngx-typed-router/tree/master/src/app).

### Router config

```ts
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
```

### Component

```ts
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {

  constructor(
    @Inject(ActivatedRoute) public route: TypedRoute<ExampleTestRouteData, ExampleTestRoutePath, ExampleTestRouteQuery>,
    // or 
    // @Inject(ActivatedRoute) public route: TypedRoute<ExampleTestRouteData>,
    // all generic types are defaulting to angular standard types
  ) { }

}
```

so that is typed even in your template:

```html
<div>{{ route.snapshot.data.exampleResponse.id }}</div>
<div>{{ route.snapshot.data.exampleResponse.name }}</div>
```

and even in tests for this component: 

```ts
class ActivatedRouteMock implements TypedRouteMock<ExampleTestRouteData, ExampleTestRoutePath, ExampleTestRouteQuery> {
  snapshot = {
    queryParams: {
      param1: 'somename',
    },
    params: {
      id: '123',
    },
    data: {
      exampleResponse: {
        id: '123',
        name: 'somename',
      },
    },
  };

  queryParams = of(this.snapshot.queryParams);
  params = of(this.snapshot.params);
  data = of(this.snapshot.data);
}

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two divs containing id and name', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div:first-child').textContent).toContain('123');
    expect(compiled.querySelector('div:last-child').textContent).toContain('somename');
  });
});
```

### Resolver

```ts
export interface ExampleResponse {
  id: string;
  name: string;
}

export type ExampleResolveSnapshot = TypedRouteSnapshot<Partial<ExampleTestRouteData>, ExampleTestRoutePath, ExampleTestRouteQuery>;

@Injectable({
  providedIn: 'root'
})
export class ExampleResolveService implements Resolve<ExampleResponse> {

  resolve(snapshot: ExampleResolveSnapshot) {
    return {
      id: snapshot.params.id,
      name: snapshot.queryParams.param1,
    } as ExampleResponse;
  }

}
```

and tests for this service:

```ts
import { ExampleResolveService, ExampleResolveSnapshot } from './example-resolve.service';

describe('ExampleResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should resolve the data according to provided parameters', () => {
    const service: ExampleResolveService = TestBed.get(ExampleResolveService);
    const resolved = service.resolve({
      queryParams: {
        param1: 'somename',
      },
      params: {
        id: '123',
      },
      data: {},
    } as ExampleResolveSnapshot);

    expect(resolved).toEqual({
      id: '123',
      name: 'somename',
    });
  });
});
```

## License

MIT
