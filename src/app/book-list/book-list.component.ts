import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl:'./book-list.component.css',
  template: `
    <div>
      <div class="input-group mb-3">
        <!-- حقل البحث عن الكتب -->
        <input type="text" class="form-control shadow-sm" [(ngModel)]="searchQuery"  placeholder="Search for a book ...">
      </div>
      <!-- قائمة الكتب التي تم العثور عليها -->
       <div class="book-list">
      <ul class="list-group">
        <li *ngFor="let book of filterBooks" class="list-group-item d-flex justify-content-between align-items-center">
          {{ book.title }}
          <button class="btn btn-primary btn-sm" (click)="selectBook(book)">Select</button>
        </li>
      </ul>
      </div>
      <!-- pagination -->
      <div class="pagination">
        <span class="pagination-point" (click)="getBooks(this.query,1)">1</span>
        <span class="pagination-point" (click)="getBooks(this.query,2)">2</span>
        <span class="pagination-point" (click)="loadMore()">+</span>
        <!-- <button (click)="onSelectNext()" class="btn btn-primary">Next</button> -->
      </div>
    </div>
  `
})

export class BookListComponent implements OnInit,OnDestroy{

  @Output() bookSelected = new EventEmitter<any>();

  query!: string; // لرابط ال API
  books: any[] = [];
  filterBooks: any[] = []; // للبحث فيها عن الكتب
  currentPage: number = 1;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks(this.query, this.currentPage);
  }

  booksSubscrip!: Subscription;
  ngOnDestroy(): void {
    this.booksSubscrip.unsubscribe();
  }


  // دالة جلب الكتب
  getBooks(query:string, currentPage:number){
    this.booksSubscrip = this.bookService.GetBooks(query, currentPage).subscribe(
      (data: any[]) => {
        this.books = data;
        this.filterBooks = this.books;
        console.log(this.filterBooks);
      }
    );
  }

  // دالة لتحميل المزيد من الكتب
  loadMore() {
    this.currentPage++;
    this.bookService.GetBooks(this.query, this.currentPage).subscribe(
      (data: any[]) => {
        this.books = [...this.books, ...data];
        this.filterBooks = this.books;
        console.log(this.filterBooks);
      }
    );
  }

  // دالة للبحث في الكتب القادمة من ال API
  _searchQuery: string = ''; // لحفظ قيمة الفلترة المدخلة من الواجهة من خلال ال input

  get searchQuery() : string {
    return this ._searchQuery;
  }

  set searchQuery(value : string) {
    this._searchQuery = value;

    this.filterBooks = this.books.filter((book: any) =>
      book.title.toLowerCase().includes(this._searchQuery.toLowerCase()) // includes: تعطي نتيجة من اجل كل تغير في دخلها حتى لو كان دخلها محرفا واحدا بعكس (==) التي ترجع اذا تحققت مطابقة كاملة فقط
    );
  }

  // دالة لاختيار كتاب وإضافته إلى القائمة المختارة
  selectBook(book: any) {
    this.bookSelected.emit(book);
  }

  onSelectNext(){

  }

}
