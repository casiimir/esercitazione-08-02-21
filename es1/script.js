async function getCityFrom(url) {
  const bannerEl = document.querySelector('.banner');

  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (!res.ok) throw new Error();

    console.log(data);    
  } catch (error) {
    bannerEl.classList.remove('invisibleBanner');
  }
}

getCityFrom('https://api.musement.com/api/v3/cities');