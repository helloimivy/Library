"use strict";

const newBookButton = document.getElementById("newBookButton");
const container = document.getElementById("container");
const libraryTableBody = document.getElementById("libraryTableBody");
const bookDeleteButtons = document.querySelectorAll("#deleteButton");

newBookButton.addEventListener("click", () => {
  newBookButton.classList.toggle("hidden");
  const form = populateForm();
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    addBookToLibrary(data.title, data.author, data.pages);
    form.remove();

    newBookButton.classList.toggle("hidden");

    console.log(myLibrary);
    deleteRowsInLibrary();
    listLibraryBooks();
  });

  container.appendChild(form);
});

const myLibrary = [];

function Book(title, author, pages) {
  if (!new.target) {
    throw Error(
      "You must use the new keyword to create a new instance of this object",
    );
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
  this.read = false;
  this.info = function () {
    `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
  };
}

Book.prototype.haveRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages) {
  const newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
  // return false;
}

function populateForm() {
  const form = document.createElement("form");
  form.setAttribute("id", "form");
  const bookTitle = createInput("text", "title", "Enter title");
  const bookAuthor = createInput("text", "author", "Enter author");
  const bookPages = createInput("number", "pages", "Enter pages");
  const submitButton = createButton("Submit", "submit");
  // form.onsubmit = `return addBookToLibrary("does", "this", "work")`;
  form.appendChild(bookTitle);
  form.appendChild(bookAuthor);
  form.appendChild(bookPages);
  form.appendChild(submitButton);
  return form;
}

// Adding book in to start library with a book
addBookToLibrary("A Wrinkle In Time", "Author", 300);
console.log(myLibrary);

function listLibraryBooks() {
  myLibrary.forEach((book) => {
    const tr = document.createElement("tr");
    const title = createTd(book.title);
    const author = createTd(book.author);
    const pages = createTd(book.pages);
    const status = document.createElement("td");
    if (book.read) {
      status.textContent = "\u2713";
      status.style.color = "green";
    } else {
      status.textContent = "\u2716";
      status.style.color = "red";
    }
    const readStatus = document.createElement("td");
    const readStatusButton = createButton("change status");
    readStatusButton.addEventListener("click", (event) => {
      event.preventDefault();
      book.haveRead();
      deleteRowsInLibrary();
      listLibraryBooks();
    });
    readStatus.appendChild(readStatusButton);
    const deleteTd = document.createElement("td");
    const deleteButton = createButton("\u2716");
    deleteButton.style.color = "green";
    deleteButton.classList.add("deleteLibraryBook");
    deleteTd.appendChild(deleteButton);
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      tr.remove();
      const bookToRemove = myLibrary.findIndex(
        (element) => element.id === book.id,
      );
      myLibrary.splice(bookToRemove, 1);
    });
    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(pages);
    tr.appendChild(status);
    tr.appendChild(readStatus);
    tr.appendChild(deleteTd);
    libraryTableBody.appendChild(tr);
  });
}

function deleteRowsInLibrary() {
  libraryTableBody.innerHTML = "";
}

function createInput(type, name, placeholder) {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.required = "true";
  return input;
}

function createButton(text, type) {
  const button = document.createElement("button");
  button.type = type;
  button.textContent = text;
  return button;
}

function createTd(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

listLibraryBooks();

function listLibraryBooksII() {
  myLibrary.forEach((book) => {
    const title = createTd(book.title);
    const author = createTd(book.author);
    const pages = createTed(book.pages);
  });
}
