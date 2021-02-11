function saveOnLocalStorage() {
  const inputEl = document.querySelector('.inputLocalStorage');

  localStorage.setItem('test_storage', inputEl.value);
  inputEl.value = '';
}

const rmOnLocalStorage = () => localStorage.removeItem('test_storage');

// Init
const saveOnLocalStorageEl = document.querySelector('.saveOnLocalStorage');
const rmFromLocalStorageEl = document.querySelector('.rmFromLocalStorage');


window.addEventListener('DOMContentLoaded', (e) => {
  console.log(localStorage.getItem('test_storage'));
});

saveOnLocalStorageEl.addEventListener('click', saveOnLocalStorage);
rmFromLocalStorageEl.addEventListener('click', rmOnLocalStorage);