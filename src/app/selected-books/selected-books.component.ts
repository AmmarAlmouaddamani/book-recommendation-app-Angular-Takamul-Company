import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-selected-books',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  styleUrl: './selected-books.component.css',
  template: `
    <div class="selected-books mb-4">
      <h2 class="mb-3">Selected Books</h2>
      <!-- قائمة الكتب المختارة مع إمكانية السحب والإفلات -->
       <div class="book-list">
      <ul class="list-group p-3" cdkDropList (cdkDropListDropped)="drop($event)">
        <li *ngFor="let book of selectedBooks" class="list-group-item d-flex justify-content-between align-items-center selected-book" cdkDrag>
          {{ book.title }}
          <span class="fa fa-trash btn btn-danger btn-sm" (click)="onRemoveBook(book)"></span>
        </li>
      </ul>
      </div>
    </div>
  `
})
export class SelectedBooksComponent {
  @Input() selectedBooks: any[] = [];
  @Output() removeBook = new EventEmitter<any>();
  @Output() reorderBooks = new EventEmitter<any[]>();

  // دالة لمعالجة حدث السحب والإفلات
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedBooks, event.previousIndex, event.currentIndex);
    this.reorderBooks.emit(this.selectedBooks);
  }

  // دالة لإزالة كتاب من القائمة
  onRemoveBook(book: any) {
    this.removeBook.emit(book);
  }
}
