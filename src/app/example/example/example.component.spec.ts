import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TypedRouteMock } from '../../../../projects/ngx-typed-router/src/public_api';
import { ExampleTestRouteData, ExampleTestRoutePath, ExampleTestRouteQuery } from '../example.routes';
import { ExampleComponent } from './example.component';

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
