/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
   
  const select = {
    templateOf: {
      book: '#template-book',
    },
    booksList: {
      container: '.books-list', 
    },
    filters: '.filters'
  };
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  
  class BooksList {
  
    constructor() {
      const thisBooksList = this;
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
      thisBooksList.initActions();
    }
  
    getElements() {
      const thisBooksList = this;
  
      thisBooksList.dom = {};
      thisBooksList.dom.wrapper = document.querySelector(select.booksList.container);
      thisBooksList.dom.filters = document.querySelector(select.filters);
    }
  
    render() {
      const thisBooksList = this;
  
      for(const book of dataSource.books) {
        const bookView = templates.book(book);
        const bookElem = utils.createDOMFromHTML(bookView);
        thisBooksList.dom.wrapper.appendChild(bookElem);
      }
    }
  
    initActions() {
      const thisBooksList = this;
        
      thisBooksList.dom.wrapper.addEventListener('dblclick', function(event) {
        event.preventDefault();
  
        if(event.target.tagName === 'IMG') {
          const bookCover = event.target.offsetParent;
          const dataId = parseInt(bookCover.getAttribute('data-id'));
  
          if(thisBooksList.favoriteBooks.includes(dataId)) {
            bookCover.classList.remove('favorite');
            const index = thisBooksList.favoriteBooks.indexOf(dataId);
            thisBooksList.favoriteBooks.splice(index, 1);
          } else {
            bookCover.classList.add('favorite');
            thisBooksList.favoriteBooks.push(dataId);
          }
            
          console.log(thisBooksList.favoriteBooks);
        }
      });
  
      thisBooksList.dom.filters.addEventListener('change', function(event) {
        event.preventDefault();
          
        if(event.target.tagName === 'INPUT') {
          const value = event.target.value;
          if(thisBooksList.filters.includes(value)) {
            const index = thisBooksList.filters.indexOf(value);
            thisBooksList.filters.splice(index, 1);
          } else {
            thisBooksList.filters.push(value);
          }
          thisBooksList.filterBooks();
        }
      });
    }
  
    filterBooks() {
      const thisBooksList = this;
  
      for(const book of dataSource.books) {
        const bookElem = thisBooksList.dom.wrapper.querySelector('[data-id="' + book.id + '"]');
        bookElem.classList.remove('hidden');
  
        for(const filter of thisBooksList.filters) {
          if(book.details[filter] === false) {
            bookElem.classList.add('hidden');
            break;
          }
        }
      }
    }
  
  }
  
  new BooksList();
}
  