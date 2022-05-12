class SelectedBooksView {
 
    displayBooks(books){
      books.forEach((book) => {
        const newElement = document.createElement('div');
        newElement.className = 'books';
        newElement.innerText = book;
        document.querySelector('#main-container').append(newElement);
      })
    }

}

module.exports = SelectedBooksView;
