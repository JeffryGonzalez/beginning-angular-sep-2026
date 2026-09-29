import { Component, computed, input, signal } from '@angular/core';
import { EvenOrOdd } from './even-or-odd';

@Component({
  selector: 'app-counter',
  imports: [EvenOrOdd],
  template: `
    <h1 class="text-2xl font-bold">{{ message() }}</h1>
    <div class="flex flex-row gap-4 py-4">
      <button (click)="decrement()" class="btn btn-error btn-sm btn-circle">-</button>
      <span>{{ current() }}</span>
      <button (click)="increment()" class="btn btn-success btn-sm btn-circle">+</button>

      <div class="join">
        @for (num of countByValues(); track num) {
          <button
            (click)="countingBy.set(num)"
            [disabled]="countingBy() === num"
            class="btn join-item"
          >
            {{ num }}
          </button>
        }
      </div>
      <button (click)="toggleSort()" class="btn btn-sm btn-info">Switch Order</button>
      <app-even-or-odd
        (theyClicked)="this.current.set(0)"
        [isCurrentlyEven]="isEven()"
        evenMessage="SUPER! YOU WIN"
        [oddMessage]="getOddMessage()"
      />
    </div>
  `,
  styles: ``,
})
export class Counter {
  message = input('Counter');
  current = signal(0);
  countingBy = signal<1 | 3 | 5>(1);
  private nums = [1, 3, 5] as const;
  myName = signal('Sam');
  isEven = computed(() => this.current() % 2 === 0);
  increment() {
    this.current.set(this.current() + this.countingBy());
  }

  getOddMessage = computed(() => (this.isEven() === false ? `${this.current()} is Odd` : ''));

  toggleSort() {
    if (this.sortOrder() === 'ascending') {
      this.sortOrder.set('descending');
    } else {
      this.sortOrder.set('ascending');
    }
  }
  decrement() {
    this.current.update((currentValue) => currentValue - this.countingBy());
  }

  sortOrder = signal<'ascending' | 'descending'>('ascending');

  countByValues = computed(() => {
    const order = this.sortOrder();

    if (order === 'ascending') {
      return this.nums.toSorted((a: number, b: number) => (a === b ? 0 : a < b ? -1 : 1));
    } else {
      return this.nums.toSorted((a: number, b: number) => (a === b ? 0 : a > b ? -1 : 1));
    }
  });
}
