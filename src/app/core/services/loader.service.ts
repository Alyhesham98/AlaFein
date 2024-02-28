import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();

  show() {    
    this.loadingSubject.next(true);
  }

  hideWithDelay(delay: number = 300) { // 300ms delay by default
    setTimeout(() => {
      this.loadingSubject.next(false);
    }, delay);
  }
}
