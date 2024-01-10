const list = document.querySelector('.main__list')

const searchInput = document.querySelector('.header__input')

let timId

const getGiphyApi = (searchValue) => {
    const apiKey = '3CXKGF878f5RnkaeBBOoiNNXOZGrbT8c';
    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchValue}&api_key=${apiKey}&limit=10`;

    list.innerHTML = '';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.data) {
                let arrData = data.data;

                arrData.forEach(item => {
                    let li = document.createElement('li');
                    li.classList.add('item');
                    let img = document.createElement('img');
                    img.classList.add('item__img');

                    const imageUrl = item.images.downsized.url;
                    img.src = imageUrl;

                    li.appendChild(img);
                    list.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
};

 timId;

searchInput.addEventListener('input', () => {
    clearTimeout(timId);
    const inputValue = searchInput.value.trim();

    if (inputValue.length >= 3) {
        timId = setTimeout(() => {
            getGiphyApi(searchInput.value);
        }, 800);
    }
});




