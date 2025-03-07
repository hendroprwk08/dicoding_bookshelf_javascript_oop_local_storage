// Do your work here...
console.log('Hello, world!');

// catatan
// Inisialisasi BookManager
const bookManager = new BookManager('BOOKS_DATA');

// Contoh penggunaan
const newBook = bookManager.create('Harry Potter', 'J.K. Rowling', 1997, false);
console.log('Buku baru:', newBook);

const book = bookManager.read(newBook.id);
console.log('Buku dengan ID:', book);

const updatedBook = bookManager.update(newBook.id, { isComplete: true });
console.log('Buku setelah update:', updatedBook);

bookManager.delete(newBook.id);
console.log('Buku setelah dihapus:', bookManager.getAllBooks());

// Mendapatkan semua buku
const allBooks = bookManager.getAllBooks();
console.log('Semua buku:', allBooks);

// Mendapatkan buku yang sudah selesai dibaca
const completeBooks = bookManager.getCompleteBooks();
console.log('Buku yang sudah selesai dibaca:', completeBooks);

// Mendapatkan buku yang belum selesai dibaca
const uncompleteBooks = bookManager.getUncompleteBooks();
console.log('Buku yang belum selesai dibaca:', uncompleteBooks);
