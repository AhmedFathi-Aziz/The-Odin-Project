'use strict';

let addBook = document.querySelector('#addBook');
addBook.addEventListener('click', function() {
    
});

let library = [];

function theBook(title, author, pages, isitRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isitRead = isitRead;
}

