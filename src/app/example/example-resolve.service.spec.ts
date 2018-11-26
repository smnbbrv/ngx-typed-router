import { TestBed } from '@angular/core/testing';
import { ExampleResolveService, ExampleResolveSnapshot } from './example-resolve.service';

describe('ExampleResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExampleResolveService = TestBed.get(ExampleResolveService);
    expect(service).toBeTruthy();
  });

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
