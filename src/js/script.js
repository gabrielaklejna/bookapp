/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
 'use strict';
 
 const select = {
    templateOf: {
        bookList: '#template-book',
    },
    bookList: {
        clickable: '.books-list', 
    },
 }
 const templates = {
    bookList: Handlebars.compile(document.querySelector(select.templateOf.bookList).innerHTML),
 }
}

