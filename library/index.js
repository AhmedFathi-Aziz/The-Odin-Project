'use strict';

let header = document.querySelector('header');
let loginButton = document.querySelector('#loginButton');
let githubButton = document.querySelector('#githubButton');
let themain = document.querySelector('#themain');
let addBook = document.querySelector('#addBook');
let theform = document.querySelector('#theform');
let libraryContent = document.querySelector('#libraryContent');

let library;
if (localStorage.book != null)
    library = JSON.parse(localStorage.book);
else
    library = [];
display();
addBook.addEventListener('click', function() {
    themain.style.display = 'block';
    changetheBackground('#787778', '#787778');
});
function theBook(title, author, pages, read, flag) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.flag = flag;
}

function changetheBackground(color, alternate) {
    document.body.style.backgroundColor = color;
    header.style.backgroundColor = alternate;
    loginButton.style.backgroundColor = color;
    githubButton.style.backgroundColor = color;
}

function display() {
    libraryContent.textContent = '';
    for (let i = 0; i < library.length; i++) {
        let div = document.createElement('div');
        let title = document.createElement('p');
        let author = document.createElement('p');
        let pages = document.createElement('p');
        let read = document.createElement('button');
        let remove = document.createElement('button');
        div.classList.add('book');
        read.classList.add('read');
        remove.classList.add('remove');
        title.textContent = library[i].title;
        author.textContent = library[i].author;
        pages.textContent = library[i].pages;
        remove.textContent = 'Remove';
        if (library[i].read == 'yes') {
            read.textContent = 'Read';
            read.style.backgroundColor = '#9FFF9C';
        }
        else {
            read.textContent = 'Not Read';
            read.style.backgroundColor = '#FF9C9C';
        }
        read.addEventListener('click', function() {
            if (library[i].read == 'yes') {
                read.textContent = 'Not Read';
                read.style.backgroundColor = '#FF9C9C';
                library[i].read = null;
                localStorage.book = JSON.stringify(library);
            }
            else {
                read.textContent = 'Read';
                read.style.backgroundColor = '#9FFF9C';
                library[i].read = 'yes';
                localStorage.book = JSON.stringify(library);
            }
        });
        remove.addEventListener('click', function() {
            library.splice(i, 1);
            localStorage.book = JSON.stringify(library);
            display();
        });
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(read);
        div.appendChild(remove);
        libraryContent.appendChild(div);
    }
}

function deleteBook(i) {
    console.log(i);
}

function addBookTothelibrary() {
    const ourdata = new FormData(theform);
    const title = ourdata.get('title');
    const author = ourdata.get('author');
    const pages = ourdata.get('pages');
    const read = ourdata.get('read');

    const book = new theBook(title, author, pages, read, false);
    library.push(book);
    localStorage.setItem('book', JSON.stringify(library));
    display();
}
theform.addEventListener('submit', function(event) {
    event.preventDefault()
    addBookTothelibrary();
    themain.style.display = 'none';
    changetheBackground('#F0EEF1', 'white');
});
