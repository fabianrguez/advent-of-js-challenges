const tableBody = document.querySelector('tbody');
const totalPageElement = document.querySelector('#totalPages');
const totalResultsElement = document.querySelector('.total-results');
const currentPageInput = document.querySelector('input[name=currentPage]');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const sortButtons = document.querySelectorAll('.sort');

let state = {
  actualPage: 1,
  totalPages: 0,
  limit: 10,
  offset: 0,
  orderBy: 'id',
  direction: 'ascending',
};

async function retrieveData({ limit = 10, offset = 0, orderBy = 'id', direction = 'asc' } = {}) {
  const response = await fetch('./data.json')
    .then((response) => response.json())
    .then((data) => data);
  const items = [...response]
    .sort((a, b) => {
      if (typeof a[orderBy] === 'string') {
        if (direction === 'ascending') {
          if (a[orderBy] > b[orderBy]) return 1;
          if (a[orderBy] < b[orderBy]) return -1;
          return 0;
        } else if (direction === 'descending') {
          if (a[orderBy] > b[orderBy]) return -1;
          if (a[orderBy] < b[orderBy]) return 1;
          return 0;
        }
        return 0;
      } else {
        if (direction === 'descending') {
          return b[orderBy] - a[orderBy];
        }
        // by default it will be ordered ascendant
        return a[orderBy] - b[orderBy];
      }
    })
    .splice(offset, limit);

  return { items, total: response.length, offset };
}

function populateTableData(data) {
  tableBody.innerHTML = data.items
    .map(
      ({ id, name, email, title }) => `
    <tr>
        <td>${id}</td>
        <td class="name">
            <input type="text" disabled="disabled" name="person-name-${id}" value="${name}" />
        </td>
        <td>
            <input type="text" disabled="disabled" name="person-email-${id}" value="${email}" />
        </td>
        <td>
            <input type="text" disabled="disabled" name="person-title-${id}" value="${title}" />
        </td>
        <td>
            <button class="update" name="person-update-${id}" id="personUpdate${id}">
                <img src="./images/update.svg" alt="Update" class="update" />
            </button>
            <button class="edit" name="person-edit-${id}" id="personEdit${id}">
                <img src="./images/edit.svg" alt="Edit" class="edit" />
            </button>
        </td>
    </tr>
    `
    )
    .join('');
}

function updateTableInfo(data) {
  populateTableData(data);
  updateTotalResults(data.total);
  updateActualPage(state.actualPage);
  state.offset = data.offset;
}

function updateTotalResults(total) {
  totalResultsElement.innerText = `${total} Results`;
}

function updateActualPage(page) {
  currentPageInput.value = page;
}

function updateTotalPages(total) {
  totalPageElement.innerText = total;
}

async function goToPage(pageNumber) {
  const offset = pageNumber * state.limit - state.limit;
  state.offset = offset;
  const data = await retrieveData({ offset, orderBy: state.orderBy, direction: state.direction });
  updateTableInfo(data);
}

async function handleNext() {
  if (state.actualPage >= 1 && state.actualPage < state.totalPages) {
    const nextPage = state.actualPage + 1;
    goToPage(nextPage);
    state.actualPage = nextPage;
  }
}

async function handlePrevious() {
  if (state.actualPage > 1 && state.actualPage <= state.totalPages) {
    const previousPage = state.actualPage - 1;
    goToPage(previousPage);
    state.actualPage = previousPage;
  }
}

async function handleModifyPage() {
  if (this.value && this.value >= 1 && this.value <= state.totalPages) {
    goToPage(this.value);
    state.actualPage = +this.value;
  } else {
    this.value = state.actualPage;
  }
}

async function handleSort() {
  sortButtons.forEach((button) => button.classList.remove(state.direction));
  const { orderBy } = this.dataset;
  const direction = state.direction === 'ascending' ? 'descending' : 'ascending';
  const data = await retrieveData({ offset: state.offset, orderBy, direction });
  updateTableInfo(data);
  state.direction = direction;
  state.orderBy = orderBy;
  this.classList.add(state.direction);
}

async function initTable() {
  const data = await retrieveData();
  state.totalPages = data.total / state.limit;

  updateTableInfo(data);
  updateTotalPages(state.totalPages);
}

document.addEventListener('DOMContentLoaded', initTable);
nextButton.addEventListener('click', handleNext);
previousButton.addEventListener('click', handlePrevious);
currentPageInput.addEventListener('change', handleModifyPage);
sortButtons.forEach((sortButton) => sortButton.addEventListener('click', handleSort));
