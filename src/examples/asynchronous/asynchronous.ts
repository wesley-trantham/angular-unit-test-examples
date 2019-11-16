import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export class AsynchronousService {

  getSynchronousObservable(): Observable<string> {
    return of('this happened synchronously');
  }

  getTimedObservable(): Observable<string> {
    return timer(1000).pipe(
      map(x => 'this happened asynchronously')
    );
  }

  getSomePromise(): Promise<string> {
    return this.getTimedObservable().toPromise();
  }
}
