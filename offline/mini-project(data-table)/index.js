let pageInfo = {
  pageNumber: 1,
}

let books = [];

const fetchBooks = () => {
  let booksEndCount = pageInfo.pageNumber * 10;
  let booksStartCount = booksEndCount - 10;
  let onPageBooks = [];
  for (let i = 0; i < booksEndCount; i++) {
    if (i >= booksStartCount) {
      onPageBooks.push(booksData[i]);
    }
  }
  return onPageBooks;
}

const pageNationUIGen = (st_value = 0) => {
  let nums = 0;
  st_value = Number(st_value);
  if (st_value >= Math.floor(booksData.length / 10) - 8) return;
  else {
    if (st_value == 0) {
      nums = [1, 2, 3, 4, 5, 6, 7, 8];
    } else {
      nums = [st_value, st_value + 1, st_value + 2, st_value + 3, st_value + 4, st_value + 5, st_value + 6, st_value + 7];
    }

    let numsHTML = '';
    nums.forEach((num) => {
      numsHTML += `<span>${num}</span>`;
    });
    numsHTML += `<span>...</span>`;
    document.querySelector('.numbers').innerHTML = numsHTML;
  }
}

const generateTableUI = (sort = 0) => {
  pageNationUIGen(pageInfo.pageNumber);

  if (sort == 0) {
    books = fetchBooks();
  }

  let tableBodyHTML = '';
  books.forEach((book) => {
    let actualDate = new Date(book?.publishedDate?.$date);
    let date = `${actualDate.getDate()} - ${actualDate.getMonth() + 1} - ${actualDate.getFullYear()}`
    tableBodyHTML += `
      <tr>
        <td>
          ${book?.title ?? "Data Not Found!!"}
        </td>
        <td>
          ${book?.isbn ?? "Data Not Found!!"}
        </td>
        <td>
          ${book?.pageCount ?? "Data Not Found!!"}
        </td>
        <td>
          ${date.includes(NaN) ? 'No date provided' : date}
        </td>
        <td>
          ${book?.price ? "$" + book.price : "Data Not Found!!"}
        </td>
        <td>
          ${book?.discount ? "$" + book.discount : "Data Not Found!!"}
        </td>
        <td>
          ${book?.status ?? "Data Not Found!!"}
        </td>
        <td style="--after-content: '${book?.authors ?? "No Data"}'">
          ${book?.authors ?? "Data Not Found!!"}
        </td>
        <td style="--after-content: '${book?.categories ?? "No Data"}'">
          ${book?.categories ?? "Data Not Found!!"}
        </td>
        <td>
          <a href="${book?.thumbnailUrl}" target="_blank">click to view</a>
        </td>
        <td style="--after-content: '${book?.shortDescription ?? "No Data"}'">
          ${book?.shortDescription ?? "Data Not Found!!"}
        </td>
        <td style="--after-content: '${book?.longDescription ?? "No Data"}'">
          ${book?.longDescription ?? "Data Not Found!!"}
        </td>
      </tr>
    `;
  });
  document.querySelector('.page-number').textContent = `Page Number: ${pageInfo.pageNumber}`
  document.querySelector('tbody').innerHTML = '';
  document.querySelector('tbody').innerHTML = tableBodyHTML;
}

generateTableUI();

document.querySelector('.btn-next').addEventListener('click', () => {
  pageInfo.pageNumber++;
  if (pageInfo.pageNumber == 40) {
    document.querySelector('.btn-next').disabled = true;
  } else {
    document.querySelector('.btn-prev').disabled = false;
  }
  generateTableUI();
});

document.querySelector('.btn-prev').addEventListener('click', () => {
  pageInfo.pageNumber--;
  if (pageInfo.pageNumber == 1) {
    document.querySelector('.btn-prev').disabled = true;
  } else {
    document.querySelector('.btn-next').disabled = false;
  }
  generateTableUI();
});

document.querySelector('.numbers').addEventListener('click', (e) => {
  let num = e.target.textContent;
  let total_pages = Math.floor(booksData / 10)
  if (num == '...') return;
  if (booksData.length % 10) {
    total_pages++;
  }
  pageNationUIGen(num);
  if (num == 0) {
    document.querySelector('.btn-prev').disabled = true;
  } else {
    document.querySelector('.btn-next').disabled = false;
  }

  if (num == total_pages) {
    document.querySelector('.btn-next').disabled = true;
  } else {
    document.querySelector('.btn-prev').disabled = false;
  }

  pageInfo.pageNumber = num;
  generateTableUI();
});

// FOR SORTING

document.querySelector('thead').addEventListener('click', (e) => {
  let col = e.target.textContent.trim();

  // ['title', 'isbn', 'pageCount', 'publishedDate', 'thumbnailUrl',            'shortDescription', 'longDescription', 'status', 'authors', 'categories', 'price', 'currency', 'discount', 'discountUnits']

  books.sort((a, b) => {

    if (col === "ISBN") return a.isbn - b.isbn;
    if (col === "No.of Pages") return a.pageCount - b.pageCount;
    if (col === "Price") return a.price - b.price;
    if (col === "Discount") return a.discount - b.discount;

    if (col === "Published Date") {
      return new Date(a.publishedDate.$date) -
        new Date(b.publishedDate.$date);
    }

    if (col === "Authors") {
      return (a.authors?.join(", ") || "")
        .localeCompare(b.authors?.join(", ") || "");
    }

    if (col === "Categories") {
      return (a.categories?.join(", ") || "")
        .localeCompare(b.categories?.join(", ") || "");
    }

    if (col === "Title") {
      return a.title.localeCompare(b.title);
    }

    if (col === "Short Description") {
      return (a.shortDescription || "")
        .localeCompare(b.shortDescription || "");
    }

    if (col === "Long Description") {
      return (a.longDescription || "")
        .localeCompare(b.longDescription || "");
    }

  });



  generateTableUI(sort = 1);
});


// SEARCH FUNCTIONALITY

document.querySelector('.input-search').addEventListener('change', updateBooks)

const updateBooks = () => {{
  
}}