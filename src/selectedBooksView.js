class SelectedBooksView {
 
    displayBooks(books){
      books.forEach((book) => {
        const newElement = document.createElement('div');
        newElement.className = 'books';
        newElement.className = "subtitle";
        newElement.className = "column";
        newElement.innerText = book;
        document.querySelector('#main-container').append(newElement);
      })
    }

}

module.exports = SelectedBooksView;
