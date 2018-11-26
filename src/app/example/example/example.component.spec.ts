import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';
import { TypedRoute } from '../../../../dist/ngx-typed-router/lib/types';
import { ExampleTestRouteData, ExampleTestRoutePath, ExampleTestRouteQuery } from '../example.routes';
import { ActivatedRoute } from '@angular/router';

const MockRoute = {
  snapshot: {
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
  }
} as TypedRoute<ExampleTestRouteData, ExampleTestRoutePath, ExampleTestRouteQuery>;

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      providers: [
        { provide: ActivatedRoute, useValue: MockRoute }
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
