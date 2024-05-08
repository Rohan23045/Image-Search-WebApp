 const searchButton = document.querySelector('#searchBtn');
    const resultDiv = document.querySelector('#result');

    searchButton.addEventListener('click', async () => {
        const searchInput = document.querySelector('#searchInput').value.trim(); 

        if (searchInput === "") {
            alert("Please enter a search term."); 
            return;
        }

        const data = JSON.stringify({
            text: searchInput,
            safesearch: 'off',
            region: 'wt-wt',
            color: '',
            size: '',
            type_image: '',
            layout: '',
            max_results: 100
        });

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                const response = JSON.parse(this.responseText);
                displayResults(response);
            }
        });

        xhr.open('POST', 'https://google-api31.p.rapidapi.com/imagesearch');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.setRequestHeader('X-RapidAPI-Key', 'a590a8c668msh1f014f0a107d654p1afc8fjsn0632add82335');
        xhr.setRequestHeader('X-RapidAPI-Host', 'google-api31.p.rapidapi.com');

        xhr.send(data);
    });

    function displayResults(response) {
        resultDiv.innerHTML = ""; 

        if (response && response.result) {
            response.result.forEach(item => {
                const imageElement = document.createElement('img');
                imageElement.src = item.image;
                imageElement.alt = item.title;
                resultDiv.appendChild(imageElement);
            });
        } else {
            resultDiv.textContent = "No results found.";
        }
    }
