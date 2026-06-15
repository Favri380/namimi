// 1. Explicación del proyecto

function mostrarMensajeEspecial() {
    Swal.fire({
        title: '¿Por qué hice esto? 💜',
        html: `
            <div class="info-proyecto-container">
                <p>Hice este rincón porque quería que tuvieras un lugar bonito solo para vos, 
                   donde está lo que te gusta (BTS, Kirby, Spoidermon, Fotitos, Florcitas jiji) 
                   en un solo lugar. <br> (También hay autitos jeje)</p>
                
                <p class="texto-resaltado">Es un regalo hecho con mucho amor, mucha paciencia, ejem mucha IA, y muchas ganas de verte feliz jeje ✨</p>
            </div>
        `,
        confirmButtonText: 'Borahae 💜',
        showCloseButton: true,
        width: '800px', // Lo hacemos más extenso
        background: 'transparent', 
        customClass: { 
            popup: 'especial-popup',
            title: 'especial-title',
            htmlContainer: 'especial-text',
            confirmButton: 'especial-button-confirm'
        }
    });
}
function mostrarFlorEspecial() {
    Swal.fire({
        title: 'Spawneando girasol jeje... 🌻',
        html: `
            <div class="destellos-wrapper">
                <span style="left: 10%; top: 20%; font-size: 18px; animation-delay: 0s;">✨</span>
                <span style="right: 15%; top: 10%; font-size: 26px; animation-delay: 1s;">🌟</span>
                <span style="left: 20%; bottom: 20%; font-size: 15px; animation-delay: 2s;">✨</span>
                <span style="right: 10%; bottom: 15%; font-size: 22px; animation-delay: 2.8s;">🌟</span>
            </div>

            <div class="flower-app-container">
                <div class="flower-vivida">
                    <div class="seeds-vivida"></div>
                    <div class="petals-vivida">
                        ${Array(24).fill(0).map(() => `<div class="petal-vivida"></div>`).join('')}
                    </div>
                </div>
                <div class="stem-vivida">
                    <div class="leaves-vivida">
                        <div class="leaf-vivida"></div>
                        <div class="leaf-vivida"></div>
                    </div>
                </div>
                <div class="soil-vivida"></div>
            </div>

            <p id="flower-msg" style="opacity:0; margin-top:25px; color:#ffea00; font-style:italic; font-family: 'Rajdhani', sans-serif; font-size: 1.4rem; text-shadow: 0 0 10px rgba(255,234,0,0.6);">
                "Una flor, para una flor de linda 😳"
            </p>
        `,
        background: 'transparent', // Para que se vea el gradiente del CSS
        showConfirmButton: false,
        showCloseButton: true,
        width: '450px',
        customClass: {
            popup: 'flower-popup-frame'
        },
        didOpen: () => {
            const flower = document.querySelector('.flower-vivida');
            const petals = document.querySelectorAll('.petal-vivida');
            
            // Animación del crecimiento
            setTimeout(() => {
                if(flower) flower.classList.add('animated');
            }, 500);

            // Animación de los pétalos y el mensaje
            setTimeout(() => {
                petals.forEach(p => p.classList.add('animated'));
                const msg = document.getElementById('flower-msg');
                if(msg) { 
                    msg.style.opacity = '1'; 
                    msg.style.transition = '1.5s'; 
                }
            }, 2500);
        }
    });
}

function mostrarRinconSuga() {
    Swal.fire({
        title: '🐱 El Rincón de Yoongi 🐱',
        html: `
            <div class="suga-gallery">
                <div class="suga-item"><img src="https://i.pinimg.com/736x/24/31/ce/2431cec49c975997956a38a5aa1d96f5.jpg" alt="Suga 1"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/736x/90/df/2a/90df2a384c8fb764df8d71ebf51648d1.jpg" alt="Suga 2"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/1200x/7f/b8/a9/7fb8a92a86758673a1c619133bda2982.jpg" alt="Suga 3"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/1200x/25/44/fc/2544fc5c7c6c1d5858f480c40bf93b39.jpg" alt="Suga 4"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/736x/ac/eb/54/aceb54dad40aff48612e035bb8f3c328.jpg" alt="Suga 5"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/1200x/2b/68/58/2b6858d428b68a183c2e0b8460602409.jpg" alt="Suga 6"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/736x/be/7d/0c/be7d0ccc0fcad7b90c3fd0d5bce87c8c.jpg" alt="Suga 7"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/736x/8b/2b/20/8b2b2039f82ee1bc9c176b76e2d635e8.jpg" alt="Suga 8"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/736x/a2/87/40/a28740eeded07120c303bf3abfc5720b.jpg" alt="Suga 9"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/1200x/3f/85/9d/3f859d9b565bbf21898960fb2fd084b5.jpg" alt="Suga 10"></div>

                <div class="suga-item"><img src="https://i.pinimg.com/736x/1a/c5/32/1ac532b551b0373334de8b08a1b5bf43.jpg" alt="Suga 11"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/736x/32/49/33/324933ef7b04962b1d0d74ebc3eef3b6.jpg" alt="Suga 12"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/736x/d2/df/b3/d2dfb3d338014dcb6db97ee7b19e5371.jpg" alt="Suga 13"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/736x/bd/06/d5/bd06d55e581387b076e41bf662878aeb.jpg" alt="Suga 14"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/1200x/9b/8c/95/9b8c9554a0c1d14e4bc2da84ba15e440.jpg" alt="Suga 15"></div>
                <div class="suga-item"><img src="https://i.pinimg.com/736x/7c/2b/af/7c2bafd6dce32e1c8d68c4a6dfc16079.jpg" alt="Suga 16"></div>
            </div>
            <p style="color: #62f8bf; margin-top: 15px; font-family: 'Rajdhani', sans-serif;">
                "Future's gonna be okay" — D-Day
            </p>
        `,
        width: '1300px',
        background: '#05050a',
        color: '#fff',
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
            popup: 'suga-popup-custom'
        }
    });
}

function mostrarKirbyRandom() {
    const modelos = ['comun', 'link', 'mario', 'sleepy', 'spiderman'];
    const elegido = modelos[Math.floor(Math.random() * modelos.length)];
    
    let titulo = '';
    let accesoriosHTML = '';

    if (elegido === 'spiderman') {
       titulo = '🕸️ ¡Spider-Kirby! 🕸️';
        accesoriosHTML = `
            <div class="aranita-pecho"></div>
            
            <div class="spider-web"></div>
        `;
    } else
    if (elegido === 'sleepy') {
        titulo = '💤 ¡Sleepy Kirby! 💤';
        accesoriosHTML = `
            <style>
                @keyframes volarZ {
                    0% { transform: translate(0,0) scale(0.5); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translate(40px, -80px) scale(1.5); opacity: 0; }
                }
                .zzz-wrapper { position: absolute; top: -10px; right: 20px; z-index: 999; display: flex; flex-direction: column; pointer-events: none; }
                .zzz-wrapper span { 
                    color: #4dd0e1 !important; 
                    font-family: 'Arial Black', sans-serif; 
                    font-weight: bold; 
                    text-shadow: 2px 2px 5px rgba(0,0,0,0.8);
                    animation: volarZ 3s infinite;
                    display: block;
                }
            </style>
            <div class="kirby-gorro-sleepy"><div class="pompon"></div></div>
            <div class="zzz-wrapper">
                <span style="font-size: 14px; animation-delay: 0s;">z</span>
                <span style="font-size: 22px; animation-delay: 0.8s;">Z</span>
                <span style="font-size: 32px; animation-delay: 1.6s;">Z</span>
            </div>
        `;
    } else if (elegido === 'link') {
        titulo = '⚔️ ¡Link Kirby! ⚔️';
        accesoriosHTML = `<div class="kirby-gorro-link"></div><div class="kirby-espada"><div class="hoja"></div><div class="mango"></div></div>`;
    } else if (elegido === 'mario') {
        titulo = '🍄 ¡Mario Kirby! 🍄';
        accesoriosHTML = `<div class="kirby-gorra-mario"><div class="logo-m">M</div></div>`;
    } else {
        titulo = '💖 Kirby Clásico 💖';
    }

    Swal.fire({
        title: titulo,
        html: `
            <div class="kirby-contenedor ${elegido}">
                ${accesoriosHTML}
                <div class="kirby-pie izq"></div><div class="kirby-pie der"></div>
                <div class="kirby-mano izq"></div><div class="kirby-mano der"></div>
                <div class="kirby-cuerpo"></div>
                <div class="kirby-cara">
                    <div class="kirby-ojo izq"></div><div class="kirby-ojo der"></div>
                    <div class="kirby-mejilla izq"></div><div class="kirby-mejilla der"></div>
                    <div class="kirby-boca"></div>
                </div>
            </div>
        `,
        background: '#0a0e17',
        showConfirmButton: false,
        showCloseButton: true,
        customClass: { popup: 'kirby-popup-estilo' }
    });
}

function mostrarRinconKirby() {
    // 1. Lista de tus fotos (agregá todas las que quieras acá)
    const fotosKirby = [
        'https://i.pinimg.com/736x/21/71/9a/21719a8a0de040807e07f3846fc75ede.jpg',
        'https://i.pinimg.com/736x/b4/49/95/b4499501668dba127143a6e68a7c9196.jpg',
        'https://i.pinimg.com/1200x/e6/72/eb/e672ebb2089b0c9989bc7a50eccf34e8.jpg', 
        'https://i.pinimg.com/736x/50/a7/90/50a790150977dec00c1273885cfac0ce.jpg', 
        'https://i.pinimg.com/736x/ed/a4/b0/eda4b0a21a2912881133fc486ec3b374.jpg', 
        'https://i.pinimg.com/736x/28/92/ff/2892ffb4f1783c181ced3edea5d1eb03.jpg', 
        'https://i.pinimg.com/736x/2e/8b/64/2e8b643da92a33f3b422ce2312ab0358.jpg', 
        'https://i.pinimg.com/736x/4a/f1/13/4af113e01efadbd8a27c68c3b17a3b4a.jpg', 
        'https://i.pinimg.com/736x/69/bb/38/69bb38442d0b3a310cd7b656dcdedacc.jpg', 
        'https://i.pinimg.com/736x/d0/29/e3/d029e344f7872bb23420e22e44cb1173.jpg', 
        'https://i.pinimg.com/736x/b2/51/c6/b251c6e0e6a172aaa473404fbc4bb62a.jpg', 
'https://i.pinimg.com/736x/81/cc/06/81cc06db1ce944584bd0d92247d745ab.jpg',
'https://i.pinimg.com/736x/4c/90/10/4c901030e16832fb13b7e18fdaadabd1.jpg',
'https://i.pinimg.com/736x/7a/95/b7/7a95b76bb42c63d2a425e3e31cf37ef7.jpg',
'https://i.pinimg.com/736x/3a/ea/c6/3aeac692b3e0fd06f73831d172ec26e9.jpg',
        'https://i.pinimg.com/736x/9f/bd/92/9fbd9264f8854f557e68a84295eea852.jpg', 
        'https://i.pinimg.com/736x/d2/e3/55/d2e355fc9d79f4671de08bffe365244f.jpg', 
        'https://i.pinimg.com/736x/d1/62/b2/d162b2b6f80303fcb55c8a32ed639369.jpg', 
        'https://i.pinimg.com/736x/6e/1f/5b/6e1f5b9b7a8a518c15a7c3686ba1a485.jpg', 
        'https://i.pinimg.com/736x/e0/3d/fb/e03dfb30bf504bb7e267ff04fbb0942c.jpg', 
        'https://i.pinimg.com/736x/2e/6e/bb/2e6ebb48cc5833dae60886fbf284708e.jpg', 
        'https://i.pinimg.com/736x/70/e0/2a/70e02a3b01628ef16e4c6b10e666da64.jpg', 
        'https://i.pinimg.com/736x/39/01/3a/39013a72e0bff01cdd554d8c6791e4b8.jpg', 
        'https://i.pinimg.com/736x/af/b3/1f/afb31fcbcd3171e8b3971a3cfd8c9dd1.jpg', 
        'https://i.pinimg.com/1200x/7e/9b/65/7e9b658898fa51efd54e47bfc14809f5.jpg', 
        'https://i.pinimg.com/736x/f9/26/0b/f9260b0d6a2c12ccd63b70b274a32166.jpg', 
        'https://i.pinimg.com/736x/ef/a9/0f/efa90f224fc687db808f153d7fca4899.jpg', 
        'https://i.pinimg.com/736x/ab/06/d1/ab06d18e855c32d464a5bd93b4fd982a.jpg', 
        'https://i.pinimg.com/736x/4b/ca/d8/4bcad84aaa71a34470b068f98f1a242e.jpg', 
        'https://i.pinimg.com/736x/37/12/c4/3712c441fc226ef253f254362bca9db6.jpg'
    ];

    // 2. Generamos el HTML de las fotos automáticamente
    const galeriaHTML = fotosKirby.map(foto => `
        <div class="kirby-item">
            <img src="${foto}" alt="Kirby" loading="lazy">
        </div>
    `).join('');

    // 3. Lanzamos el SweetAlert
    Swal.fire({
        title: '⭐ El Mundo de Kirby ⭐',
        html: `
            <div class="kirby-gallery">
                ${galeriaHTML}
            </div>
            <p style="color: #ffb7c5; margin-top: 15px; font-family: 'Rajdhani', sans-serif;">
                "Poyo! Poyo!" — Kirby
            </p>
        `,
        width: '1300px',
        background: '#05050a',
        color: '#fff',
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
            popup: 'kirby-popup-custom'
        }
    });
}

// ==========================================
// SISTEMA DE TEMAS DINÁMICOS
// ==========================================
let temaActual = 0;

// Configuración centralizada de temas
const configuracionTemas = [
    { id: 'theme-space',     nombre: 'Espacial',      icon: '✨', video: 'assets/videos/espacio.mp4' },
    { id: 'theme-spiderman', nombre: 'Spider-Man',    icon: '🕷️', video: 'assets/videos/spiderman.mp4' },
    { id: 'theme-forest',    nombre: 'Bosque Mágico', icon: '🌲', video: 'assets/videos/bosque.mp4' }
];

function seleccionarTema(index) {
    if (index === temaActual && document.body.classList.contains(configuracionTemas[index].id)) return;

    // 1. Removemos el tema actual
    document.body.classList.remove(configuracionTemas[temaActual].id);
    
    // 2. Actualizamos el índice
    temaActual = index;
    
    const nuevoTema = configuracionTemas[temaActual];

    // 3. Aplicamos el nuevo tema y actualizamos el video
    document.body.classList.add(nuevoTema.id);
    
    // 4. Actualizamos el estado visual de los botones
    document.querySelectorAll('.theme-btn-vivida').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });

    const bgVideo = document.getElementById('bg-video-tema');
    if (bgVideo) {
        bgVideo.style.opacity = '0';
        setTimeout(() => {
            bgVideo.src = nuevoTema.video;
            bgVideo.onloadeddata = () => bgVideo.style.opacity = '1';
            bgVideo.play();
        }, 400);
    }
}

// ==========================================
// INYECTOR AUTOMÁTICO DEL BOTÓN DE TEMAS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const themeDock = document.createElement('div');
    themeDock.className = 'theme-dock-vivida';
    
    configuracionTemas.forEach((tema, index) => {
        const btn = document.createElement('div');
        btn.className = `theme-btn-vivida ${index === temaActual ? 'active' : ''}`;
        btn.innerHTML = tema.icon;
        btn.title = `Cambiar a tema ${tema.nombre}`;
        btn.onclick = () => seleccionarTema(index);
        themeDock.appendChild(btn);
    });
    
    document.body.appendChild(themeDock);

    // Creamos el elemento de video de fondo (Estilo Wallpaper Engine)
    const videoBg = document.createElement('video');
    videoBg.id = 'bg-video-tema';
    videoBg.autoplay = true;
    videoBg.muted = true;
    videoBg.loop = true;
    videoBg.className = 'wallpaper-engine-bg';
    videoBg.src = configuracionTemas[temaActual].video;
    document.body.prepend(videoBg);

    // Activamos el tema inicial apenas carga la página
    document.body.classList.add(configuracionTemas[temaActual].id);
});