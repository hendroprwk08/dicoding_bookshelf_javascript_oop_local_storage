
class Book {
    constructor(id, title, author, year, isComplete) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.isComplete = isComplete;
    }
}

class BookManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.books = this.loadBooks();
    }

    loadBooks() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data).map(book => new Book(book.id, book.title, book.author, book.year, book.isComplete)) : [];
    }

    saveBooks() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.books));
    }

    generateId() {
        return Date.now().toString(); // Contoh sederhana, bisa disesuaikan
    }

    create(title, author, year, isComplete) {
        const newBook = new Book(this.generateId(), title, author, year, isComplete);
        this.books.push(newBook);
        this.saveBooks();
        return newBook;
    }

    read(id) {
        return this.books.find(book => book.id === id);
    }

    update(id, updatedBook) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = { ...this.books[index], ...updatedBook };
            this.saveBooks();
            return this.books[index];
        }
        return null;
    }

    delete(id) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
            this.saveBooks();
            return true;
        }
        return false;
    }

    getAllBooks() {
        return this.books;
    }

    getCompleteBooks() {
        return this.books.filter(book => book.isComplete);
    }

    getUncompleteBooks() {
        return this.books.filter(book => !book.isComplete);
    }
}

const manager = new BookManager('BOOKS_DATA');

const empty = () => {
    document.getElementById('bookFormTitle').value = '';
    document.getElementById('bookFormAuthor').value = '';
    document.getElementById('bookFormYear').value = '';
    document.getElementById('bookFormIsComplete').checked = false;
}

const showBooks = () => {
    let html = '';

    // Mendapatkan buku yang sudah selesai dibaca
    const completeBooks = manager.getCompleteBooks();
    completeBooks.forEach(book => {
        html += `<div data-bookid="${book.id}" data-testid="bookItem">`;
        html += `<h3 data-testid="bookItemTitle">${book.title}</h3>`;
        html += `<p data-testid="bookItemAuthor">Penulis: ${book.author}</p>`;
        html += `<p data-testid="bookItemYear">Tahun: ${book.year}</p><div>`;
        html += `<button data-testid="bookItemIsCompleteButton" data-id="${book.id}">Belum selesai dibaca</button>`;
        html += `<button data-testid="bookItemDeleteButton" data-id="${book.id}">Hapus Buku</button>`;
        html += `<button data-testid="bookItemEditButton">Edit Buku</button>`;
        html += `</div></div>`;
    });
    document.getElementById('completeBookList').innerHTML = html;

    html = '';
    const uncompleteBooks = manager.getUncompleteBooks();
    uncompleteBooks.forEach(book => {
        html += `<div data-bookid="${book.id}" data-testid="bookItem">`;
        html += `<h3 data-testid="bookItemTitle">${book.title}</h3>`;
        html += `<p data-testid="bookItemAuthor">Penulis: ${book.author}</p>`;
        html += `<p data-testid="bookItemYear">Tahun: ${book.year}</p><div>`;
        html += `<button data-testid="bookItemIsCompleteButton" data-id="${book.id}" >Selesai dibaca</button>`;
        html += `<button data-testid="bookItemDeleteButton" data-id="${book.id}">Hapus Buku</button>`;
        html += `<button data-testid="bookItemEditButton">Edit Buku</button>`;
        html += `</div></div>`;
    });

    document.getElementById('incompleteBookList').innerHTML = html;

    addMoveEventListener();
    addDeleteEventListeners();
}

const addMoveEventListener = () => {
    // Tambahkan event listener untuk tombol toggle-complete
    const moveButtons = document.querySelectorAll('[data-testid="bookItemIsCompleteButton"]');
    moveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            console.log(id);
            
            const book = manager.read(id);
            if (book) {
                manager.update(id, { isComplete: !book.isComplete });
                showBooks();
            }
        });
    });
}

const addDeleteEventListeners = () => {
    const deleteButtons = document.querySelectorAll('[data-testid="bookItemDeleteButton"]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            if (manager.delete(id)) {
                showBooks(); // Refresh daftar buku setelah penghapusan
            } else {
                alert('Buku tidak ditemukan.');
            }
        });
    });
}

document.getElementById('bookForm').onsubmit = (event) => {
    event.preventDefault();

    let title = document.getElementById('bookFormTitle').value;
    let author = document.getElementById('bookFormAuthor').value;
    let year = document.getElementById('bookFormYear').value;
    let isComplete = document.getElementById('bookFormIsComplete').checked;

    const newBook = manager.create(
        title,
        author,
        parseInt(year),
        isComplete);

    console.log('Buku baru:', newBook);

    empty();
    showBooks();
};

document.getElementById('clear').onclick = () => {
    localStorage.clear();
    document.getElementById('completeBookList').innerHTML = '';
    document.getElementById('incompleteBookList').innerHTML = '';
}

showBooks();