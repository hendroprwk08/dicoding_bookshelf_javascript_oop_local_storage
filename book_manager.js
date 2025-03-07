import { book } from './book.js';

export class BookManager {
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