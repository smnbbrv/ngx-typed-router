import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypedRoute } from '../../../../projects/ngx-typed-router/src/lib/types';
import { ExampleTestRouteData, ExampleTestRoutePath, ExampleTestRouteQuery } from '../example.routes';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {

  constructor(
    @Inject(ActivatedRoute) public route: TypedRoute<ExampleTestRouteData, ExampleTestRoutePath, ExampleTestRouteQuery>,
  ) { }

}
