import { fakeAsync, tick } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { AsynchronousService } from './asynchronous';

describe('async tests', () => {
  it('can handle synchronous observable', () => {
    const service = new AsynchronousService();
    let value: string;
    service.getSynchronousObservable().pipe(take(1))
      .subscribe(result =>
        value = result
      );

    expect(value).toBe('this happened synchronously');
  });

  it('can use fakeAsync to pass time', fakeAsync(() => {
    const service = new AsynchronousService();
    let value: string;
    service.getTimedObservable().pipe(take(1))
      .subscribe(result =>
        value = result
      );

    tick(1000);

    expect(value).toBe('this happened asynchronously');
  }));

  it('can handle promises with fakeAsync', fakeAsync(() => {
    const service = new AsynchronousService();
    let value: string;
    service.getSomePromise().then(result => value = result);

    tick(1000);

    expect(value).toBe('this happened asynchronously');
  }));
});
