const books = [
  { id: 1, title: 'Book1', published: true, publisher: 'Pub1' },
  { id: 2, title: 'Book2', published: false, publisher: 'Pub2' },
  { id: 3, title: 'Book3', published: false, publisher: 'Pub3' },
]

export default function BooksPublishedSection() {
  const publishedBooks = books.filter((book) => book.published)

  return (
    <div className="playground-section--books">
      {publishedBooks.length > 0 && <h2>Published Books</h2>}
      {publishedBooks.length ? (
        <div className="playground-books">
          {publishedBooks.map((book) => (
            <article key={book.id} className="playground-books__card">
              <h3>{book.title}</h3>
              <p>{book.publisher}</p>
            </article>
          ))}
        </div>
      ) : (
        <p>게시된 책이 없습니다.</p>
      )}
    </div>
  )
}
