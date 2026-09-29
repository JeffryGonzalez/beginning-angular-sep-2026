import { TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-trails-trail-card',
  imports: [TitleCasePipe],
  template: `
    <div class="card-body">
      <h2 class="card-title text-secondary">{{ name() }}</h2>
      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <div class="stat">
          <div class="stat-title">Miles</div>
          <div class="stat-value">{{ miles() }}</div>
        </div>

        <div class="stat">
          <div class="stat-title">Level</div>

          <div class="stat-value">
            <span
              [class.text-success]="difficulty() === 'easy'"
              [class.text-info]="difficulty() === 'moderate'"
              [class.text-warning]="difficulty() === 'hard'"
              [class.text-error]="difficulty() === 'extreme'"
              [class.font-bold]="difficulty() === 'hard' || difficulty() === 'extreme'"
              >{{ difficulty() | titlecase }}</span
            >
          </div>
        </div>
      </div>
      <div class="card-actions justify-end">
        <label class="label" [class.text-success]="favorite()">
          {{ favorite() ? 'Favorite!' : 'Mark as Favorite' }}
          <input
            type="checkbox"
            [checked]="favorite()"
            (change)="favorite.update((f) => !f)"
            class="toggle toggle-sm"
          />
        </label>
      </div>
    </div>
  `,
  styleUrl: './trail-card.css',
  host: {
    '[class.ring-4]': 'favorite()',
    '[class.ring-success]': 'favorite()',
  },
})
export class TrailCard {
  protected readonly name = signal('Woodpecker Way Loop');
  protected readonly miles = signal(1.8);
  protected readonly difficulty = signal<'easy' | 'moderate' | 'hard' | 'extreme'>('moderate');
  protected readonly favorite = signal(false);
}
