import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  styleUrl:'./book-card.component.css',
  template: `
    <!-- البطاقة النهائية لعرض الكتب المختارة -->
    <h2 class="mb-3">List preview</h2>
    <div class="card book-list" [style.backgroundColor]="backgroundColor">
      <div class="card-body">
        <h5 class="card-title">Discover new worlds and ideas with our curated selection of suggested reads!</h5>
        <ul class="list-group list-group-flush">
          <li *ngFor="let book of selectedBooks" class="list-group-item preview-book text-center" [style.backgroundColor]="backgroundColor">
            {{ book.title }}
          </li>
        </ul>
      </div>
    </div>
  `
})

export class BookCardComponent {
  @Input() selectedBooks: any[] = [];
  @Input() backgroundColor: string = '';
}
