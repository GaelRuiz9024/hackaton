// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", async function() {
    try {
        let url = "http://localhost:9000/materiales";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        // Selecciona los contenedores de indicadores y slides
        const indicatorsContainer = document.getElementById('carousel-indicators');
        const slidesContainer = document.getElementById('carousel-inner');

        // Itera sobre cada dato y crea los elementos de slide e indicador
        data.forEach((slideData, index) => {
            // Crear el elemento indicador
            const indicator = document.createElement('li');
            indicator.setAttribute('data-slide-to', index);
            indicator.setAttribute('data-bs-slide-to', index);
            indicator.setAttribute('data-target', '#ud1IOdwcO1');
            indicator.setAttribute('data-bs-target', '#ud1IOdwcO1');
            if (index === 0) {
                indicator.classList.add('active');
            }
            indicatorsContainer.appendChild(indicator);

            // Crear el elemento slide
            const slide = document.createElement('div');
            slide.classList.add('carousel-item', 'slider-image', 'item');
            if (index === 0) {
                slide.classList.add('active');
            }

            slide.innerHTML = `
                <div class="item-wrapper">
                    <img class="d-block w-100" src="assets/images/background18-h_lwaishlx.jpg" alt="Slide image">
                    <div class="carousel-caption">
                        <h5 class="mbr-section-subtitle mbr-fonts-style mb-3 display-5">
                            <strong>${slideData.tema}</strong>
                        </h5>
                        <p class="mbr-section-text mbr-fonts-style mb-4 display-7">${slideData.materia}</p>
                        <div class="mbr-section-btn mb-5">
                            <a class="btn btn-primary display-7" href="${slideData.enlace}">Descargar video</a>
                        </div>
                    </div>
                </div>
            `;
            slidesContainer.appendChild(slide);
        });
    } catch (error) {
        console.error('Error al enviar la información:', error);
    }
});
