import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { EvenOrOdd } from './even-or-odd';
import { CounterButtonDirective } from '../ui-widgets/counter-button';
import { CounterStore } from './counter-store';

@Component({
  selector: 'app-counter',
  imports: [CounterButtonDirective],
  providers: [],
  template: `
    <button (click)="store.decrement()" appCounterButton="decrement">-</button>
    <p>Currently at {{ store.current() }}</p>
    <button (click)="store.increment()" appCounterButton="increment">+</button>
  `,
  styles: ``,
})
export class Counter {
  store = inject(CounterStore);
}
