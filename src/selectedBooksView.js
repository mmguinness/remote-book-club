class SelectedBooksView {
 
    displayBooks(books){
      books.forEach((book) => {
        const newElement = document.createElement('div');
        newElement.className = 'books';
        newElement.className = "subtitle";
        newElement.className = "column is-2";
        // newElement.className = "button is-danger is-small";
        // newElement.className = "button";
        newElement.innerText = book;
        document.querySelector('#main-container').append(newElement);
      })
    }

}

module.exports = SelectedBooksView;
