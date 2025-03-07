import { BookManager as Manager } from './book_manager.js';

// Do your work here...
console.log('Hello, world!');

// catatan
// Inisialisasi BookManager
const manager = new Manager('BOOKS_DATA');

// Contoh penggunaan
const newBook = manager.create('Harry Potter', 'J.K. Rowling', 1997, false);
console.log('Buku baru:', newBook);

const book = manager.read(newBook.id);
console.log('Buku dengan ID:', book);

const updatedBook = manager.update(newBook.id, { isComplete: true });
console.log('Buku setelah update:', updatedBook);

manager.delete(newBook.id);
console.log('Buku setelah dihapus:', manager.getAllBooks());

// Mendapatkan semua buku
const allBooks = manager.getAllBooks();
console.log('Semua buku:', allBooks);

// Mendapatkan buku yang sudah selesai dibaca
const completeBooks = manager.getCompleteBooks();
console.log('Buku yang sudah selesai dibaca:', completeBooks);

// Mendapatkan buku yang belum selesai dibaca
const uncompleteBooks = manager.getUncompleteBooks();
console.log('Buku yang belum selesai dibaca:', uncompleteBooks);
