function abrirGaleria() {
    const album = [];

    /**
     * FUNCIÓN AYUDANTE PARA FABRI:
     * nombreBase: El nombre que le pusiste en Windows (ej: "foto")
     * cantidad: Cuántas fotos hay en esa carpeta
     * carpeta: El nombre de la carpeta (nosotros, animalitus, etc)
     * frase: El texto que querés que aparezca al pasar el mouse
     */
    const cargarCarpeta = (nombreBase, cantidad, carpeta, frase, defaultExtension = '.jpg', videoIndex = -1, videoExtension = '.mp4') => {
        for (let i = 1; i <= cantidad; i++) {
            let currentExtension = defaultExtension;
            let currentType = 'image';

            if (i === videoIndex) {
                currentExtension = videoExtension;
                currentType = 'video';
            }

            album.push({
                // IMPORTANTE: Windows pone espacios y paréntesis: "foto (1).jpg"
                url: `assets/fotos/${carpeta}/${nombreBase} (${i})${currentExtension}`,
                titulo: frase,
                cat: carpeta,
                type: currentType
            });
        }
    };

    // --- CONFIGURACIÓN DE TUS FOTOS ---
    // Cambiá el número (ej: 5, 8, 3) por la cantidad real de fotos que tengas en cada carpeta
    cargarCarpeta('us', 25, 'nosotros', 'La envidia del resto jeje', '.jpg'); // Actualizado a 25
    cargarCarpeta('animalitos', 66, 'animalitus', 'jeje bonitus...', '.jpg');
    cargarCarpeta('que', 6, 'quebrados', 'Foto de unos quebraditos', '.jpg', 6, '.mp4'); // Actualizado para el video
    cargarCarpeta('sal', 24, 'saliditas', 'Momentos bonitos juntitos', '.jpg');
    cargarCarpeta('reg', 9, 'regalitus', 'Regalitosss', '.jpg');
    cargarCarpeta('ojitu', 7, 'ojitus', 'Ojitosssss', '.jpg');
    cargarCarpeta('luna', 5, 'lunas', 'Fotitos de la lunaaa', '.jpg');
    // ----------------------------------

    const titulosCategorias = {
        nosotros: "La envidia del resto jeje",
        animalitus: "jeje bonitus...",
        quebrados: "Foto de unos quebraditos (no encontré mas mias)",
        saliditas: "Momentos bonitos juntitos",
        regalitus: "Regalitus",
        ojitus: "Ojitoss",
        lunas: "Fotitos de la lunaa aaaaa"
    };

    // Agrupamos las fotos por categoría para crear las "carpetas" visuales
    let galeriaHTML = '';
    Object.keys(titulosCategorias).forEach(cat => {
        const fotosDeCat = album.filter(f => f.cat === cat);
        if (fotosDeCat.length > 0) {
            galeriaHTML += `
                <div class="vivida-category-section" data-category="${cat}">
                    <h2 class="category-folder-title">${titulosCategorias[cat]}</h2>
                    <div class="gallery-grid-cinematic">
                        ${fotosDeCat.map(foto => `
                            <div class="vivida-photo-item" ${foto.type === 'image' ? `onclick="verFotoGaleria('${foto.url}')" style="cursor: zoom-in;"` : ''}>
                                ${foto.type === 'video' ?
                                    `<video src="${foto.url}" alt="${foto.titulo}" loading="lazy" autoplay loop muted playsinline class="vivida-video-item"></video>` :
                                    `<img src="${foto.url}" alt="${foto.titulo}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x250?text=Error+al+cargar+imagen';this.style.filter='none';this.style.opacity='1';">`
                                }
                                <div class="vivida-photo-overlay">
                                    <div class="overlay-content">
                                        <p class="photo-title">${foto.titulo}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });

    Swal.fire({
        title: '',
        html: `
            <div class="vivida-gallery-container">
                <div class="gallery-nav-bar">
                    <h1 class="gallery-main-title">Galería de <span>Recuerdos</span></h1>
                    <div class="gallery-filters">
                        <button class="filter-link active" onclick="filtrarGaleria('todos')">Todo</button>
                        <button class="filter-link" onclick="filtrarGaleria('nosotros')">Nosotros</button>
                        <button class="filter-link" onclick="filtrarGaleria('animalitus')">Animalitus</button>
                        <button class="filter-link" onclick="filtrarGaleria('saliditas')">Saliditas</button>
                        <button class="filter-link" onclick="filtrarGaleria('quebrados')">Quebrados</button>
                        <button class="filter-link" onclick="filtrarGaleria('regalitus')">Regalitus</button>
                        <button class="filter-link" onclick="filtrarGaleria('ojitus')">Ojitus</button>
                        <button class="filter-link" onclick="filtrarGaleria('lunas')">Lunas</button>
                    </div>
                    <button class="gallery-exit-btn" onclick="Swal.close()">❌ Salir</button>
                </div>
                <div class="vivida-gallery-scroll-area">
                    ${galeriaHTML}
                </div>
            </div>
        `,
        width: '95%',
        background: 'rgba(10, 10, 20, 0.95)',
        showConfirmButton: false,
        showCloseButton: false,
        customClass: { 
            popup: 'vivida-gallery-popup'
        },
        showClass: { popup: 'animate__animated animate__zoomIn' }
    });
}

window.filtrarGaleria = function(categoria) {
    const sections = document.querySelectorAll('.vivida-category-section');
    const buttons = document.querySelectorAll('.filter-link');

    // Actualizar botones
    buttons.forEach(btn => {
        const btnText = btn.innerText.toLowerCase();
        btn.classList.toggle('active', btnText.includes(categoria) || (categoria === 'todos' && btnText === 'todo'));
    });

    // Filtrar secciones (carpetas)
    sections.forEach(section => {
        if (categoria === 'todos' || section.getAttribute('data-category') === categoria) {
            section.style.display = 'block';
            section.classList.add('animate__animated', 'animate__fadeIn');
        } else {
            section.style.display = 'none';
        }
    });
};

// --- NUEVA FUNCIÓN: Visor de fotos en pantalla completa ---
window.verFotoGaleria = function(url) {
    // Creamos el contenedor oscuro que irá por encima de todo
    const overlay = document.createElement('div');
    overlay.id = 'visor-foto-fullscreen';
    Object.assign(overlay.style, {
        position: 'fixed', top: '0', left: '0',
        width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.92)',
        zIndex: '999999', display: 'flex', // El z-index altísimo nos asegura que pase a SweetAlert
        justifyContent: 'center', alignItems: 'center',
        cursor: 'zoom-out', opacity: '0', transition: 'opacity 0.3s ease'
    });

    // Creamos la imagen
    const img = document.createElement('img');
    img.src = url;
    Object.assign(img.style, {
        maxWidth: '95%', maxHeight: '95%', objectFit: 'contain',
        borderRadius: '10px', boxShadow: '0 0 30px rgba(0,0,0,0.8)',
        transform: 'scale(0.9)', transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    // Animamos la entrada (Fade-in + Pequeño Zoom)
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });

    // Si hace click de nuevo, animamos la salida y lo borramos
    overlay.onclick = function() {
        overlay.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        setTimeout(() => document.body.removeChild(overlay), 300);
    };
};