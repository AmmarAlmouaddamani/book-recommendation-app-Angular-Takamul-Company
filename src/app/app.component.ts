import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookListComponent } from './book-list/book-list.component';
import { SelectedBooksComponent } from './selected-books/selected-books.component';
import { BookCardComponent } from './book-card/book-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, BookListComponent, SelectedBooksComponent, BookCardComponent],
  template: `
    <div class="container mt-4">
      <h1 class="text-center mb-4">Book Recommendation App</h1>
      <div class="row">

        <div class="col-md-4">
          <!-- مكون قائمة الكتب للبحث واختيار الكتب -->
          <app-book-list (bookSelected)="addSelectedBook($event)"></app-book-list>
        </div>

        <div class="col-md-4">
          <!-- مكون الكتب المختارة مع إمكانية الحذف وإعادة الترتيب -->
          <app-selected-books
            [selectedBooks]="selectedBooks"
            (removeBook)="removeSelectedBook($event)"
            (reorderBooks)="reorderBooks($event)">
          </app-selected-books>
          </div>

          <div class="col-md-4">
            <!-- عرض البطاقة النهائية مع الكتب المختارة -->
            <app-book-card [selectedBooks]="selectedBooks" [backgroundColor]="cardBackgroundColor"></app-book-card>

            <!-- اختيار لون خلفية البطاقة -->
            <div class="mt-3">
              <input type="color" class="form-control form-control-color border-2" id="backgroundColor" [(ngModel)]="cardBackgroundColor">
            </div>
          </div>

      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  // مصفوفة لتخزين الكتب المختارة
  selectedBooks: any[] = [];
  // لون خلفية البطاقة، الافتراضي هو الأبيض
  cardBackgroundColor: string = '#eecca0';

  // إضافة كتاب إلى قائمة الكتب المختارة
  addSelectedBook(book: any) {
    if (!this.selectedBooks.some(b => b.key === book.key)) { // اذا لم يكن مضافا مسبقا
      this.selectedBooks.push(book);
    }
  }

  // إزالة كتاب من قائمة الكتب المختارة
  removeSelectedBook(book: any) {
    this.selectedBooks = this.selectedBooks.filter(b => b.key !== book.key);
  }

  // إعادة ترتيب الكتب المختارة
  reorderBooks(books: any[]) {
    this.selectedBooks = books;
  }
}
