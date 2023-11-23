// Función para cambiar al modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Obtener el botón y agregar un evento 'click' para activar el modo oscuro
document.getElementById('toggleTheme').addEventListener('click', toggleDarkMode);

// Función para obtener las banderas según la región seleccionada
function fetchFlags(region = null) {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            if (region) {
                data = data.filter(country => country.region === region);
            }
            displayFlags(data);
        })
        .catch(error => console.error('Error:', error));
}

// Función para mostrar las banderas en la página
function displayFlags(countries) {
    const flagGrid = document.querySelector('.flag-grid');
    flagGrid.innerHTML = ''; // Limpiar contenido anterior
    
    countries.forEach(country => {
        const flagCard = document.createElement('div');
        flagCard.classList.add('flag-card');
        flagCard.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h2>${country.name.common}</h2>
            <div class="details">
                <p>Population: ${country.population}</p>
                <p>Capital: ${country.capital}</p>
            </div>
            <p>Region: ${country.region}</p>
            <p>Subregion: ${country.subregion}</p>
            <p>Languages: ${Object.values(country.languages).join(", ")}</p>
        `;
        flagGrid.appendChild(flagCard);
    });
}

// Función para filtrar por región al seleccionar una opción del <select>
const regionSelect = document.getElementById('regionSelect');
regionSelect.addEventListener('change', function() {
    fetchFlags(this.value);
});

// Función para filtrar por país al ingresar texto en el campo de búsqueda
document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = this.value.trim().toLowerCase();
    const flags = document.querySelectorAll('.flag-card');

    flags.forEach(flag => {
        const countryName = flag.querySelector('h2').textContent.toLowerCase();
        if (countryName.includes(searchValue)) {
            flag.style.display = 'block';
        } else {
            flag.style.display = 'none';
        }
    });
});