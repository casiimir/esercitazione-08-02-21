const getFullPath = (path) => (`${path}movie/popular?api_key=${state.config.keyAPI}`);

const addToLocalStorage = (obj) => localStorage.setItem('movieDB', JSON.stringify(obj));

async function getSessionID() {
  const actualDate = actualDateToUTC();
  const parsedLocalStor = JSON.parse(localStorage.getItem('movieDB'));

  if (!state.config.sessionID) {
    try {
      const result = await fetch(`${state.config.baseURL}authentication/guest_session/new?api_key=${state.config.keyAPI}`);
      if (!result.ok) {
        throw {
          name: 'invalidURL',
          message: 'Invalid URL path, please fix it.'
        };
      }      
      if ((parsedLocalStor) && (actualDate < parsedLocalStor.expiresDate)) {
        throw {
          name: 'expiresDate',
          message: 'The session ID is already present here.'
        };
      }

      const data = await result.json();
      state.config.sessionID = data.guest_session_id;
      state.config.expiresDate = data.expires_at;

      addToLocalStorage(state.config);

    } catch (error) {
      if (error.name === 'expiresDate') console.warn(error.message);
      if (error.name === 'invalidURL') console.error(error.message);
    }
  }
}

async function getPopMovies() {
  const path = getFullPath(state.config.baseURL);
  try {
    const result = await fetch(path);
    if (!result.ok) throw new Error();

    const data = await result.json();
    state.movies.data = data.results;

    console.log(state.movies.data);
    
  } catch (e) {
    const bannerEl = document.querySelector('.banner');
    bannerEl.classList.remove('invisibleBanner');
  }
}

function actualDateToUTC() {
  const date = new Date();
  const yyyy = date.getUTCFullYear();

  const mm = date.getMonth().toString().length === 1 ?
    `0${date.getMonth()+1}` :
    date.getMonth()+1;

  const dd = date.getUTCDate().toString().length === 1 ?
    `0${date.getUTCDate()}` :
    date.getUTCDate();

  const hh = date.getUTCHours();
  const mn = date.getUTCMinutes();
  const se = date.getUTCSeconds();

  return `${yyyy}-${mm}-${dd} ${hh}:${mn}:${se} UTC`;
}

// Init
const state = {
  config: {
    baseURL: 'https://api.themoviedb.org/3/',
    keyAPI: '3e097ab0145d7f55f3ad142f59498fb7',
    sessionID: null,
  },
  movies: {
    language: 'en-US',
    page: 1,
    data: null,
    expiresDate: null,
  }
}

window.addEventListener('DOMContentLoaded', getSessionID(), getPopMovies());