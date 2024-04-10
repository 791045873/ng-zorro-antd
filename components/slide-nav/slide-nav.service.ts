import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class QqslSlideNavService {
  private itemCLickEvent$ = new Subject<string>();

  emitItemClick(key: string): void {
    this.itemCLickEvent$.next(key);
  }

  listenItemClick(): Observable<string> {
    return this.itemCLickEvent$.asObservable();
  }
}
