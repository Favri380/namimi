// ==========================================
// 1. VARIABLES DE ESTADO Y CONFIGURACIÓN
// ==========================================
const gameState = { score: 0, lives: 3, currentQuestion: 0, streak: 0 };
let indicePregunta = 0;
let preguntasActuales = []; 
let blurTimer;
const FABRI_SCORE = 18000; // Tu puntaje base para el leaderboard
let currentBlur = 30;

// Lógica de procesamiento de puntos
function procesarResultado(esCorrecto, puntosBase) {
    if (esCorrecto) {
        gameState.streak++;
        // Multiplicador: 1.0, 1.1, 1.2... según la racha
        const multiplicador = 1 + (gameState.streak - 1) * 0.1;
        gameState.score += Math.round(puntosBase * multiplicador);
    } else {
        gameState.streak = 0;
        gameState.lives--;
    }
}

function manejarHighScore() {
    const record = localStorage.getItem('bangtanHighScore') || 0;
    if (gameState.score > record) {
        localStorage.setItem('bangtanHighScore', gameState.score);
    }
}

// ==========================================
// 2. BASES DE DATOS
// ==========================================
const triviaBTS = {
    facil: [
        { pregunta: "¿Cuál es el personaje de J-Hope en BT21?", opciones: ["Koya", "Mang", "Chimmy", "Cooky"], correcta: "Mang" },
        { pregunta: "¿Quién es el líder de BTS?", opciones: ["Jin", "Suga", "RM", "Jungkook"], correcta: "RM" },
        { pregunta: "¿Cuál es la canción debut oficial de BTS?", opciones: ["No More Dream", "Boy In Luv", "Danger", "Dope"], correcta: "No More Dream" }
    ],
    medio: [
        { pregunta: "Bangtan Sonyeondan se traduce como...", opciones: ["Chicos más allá de la escena", "Boy Scouts a prueba de balas", "Jóvenes para siempre", "Guerreros del sonido"], correcta: "Boy Scouts a prueba de balas" },
        { pregunta: "¿Cuál es la fecha exacta del debut de BTS?", opciones: ["12 de Junio 2013", "13 de Junio 2013", "13 de Junio 2014", "15 de Mayo 2013"], correcta: "13 de Junio 2013" },
        { pregunta: "Además de bailarín, ¿en qué se destaca J-Hope?", opciones: ["Vocalista", "Rapero", "Visual", "Actor"], correcta: "Rapero" }
    ],
    dificil: [
        { pregunta: "¿A qué animal le tiene fobia o miedo Jimin?", opciones: ["Gatos", "Perros", "Mariposas", "Serpientes"], correcta: "Mariposas" },
        { pregunta: "¿Qué significa el acrónimo ARMY?", opciones: ["Adorable Representative M.C. for Youth", "Amazing Real Music for Youth", "Adorable Rebels Music Young", "Always Ready Military Young"], correcta: "Adorable Representative M.C. for Youth" },
        { pregunta: "¿Quién fue el primero en entrar a la banda?", opciones: ["Suga", "Namjoon (RM)", "Jin", "V"], correcta: "Namjoon (RM)" },
        { pregunta: "¿Quién es considerada la 'chica oficial' de BTS?", opciones: ["IU", "Halsey", "Becky G", "Sia"], correcta: "Halsey" },
        { pregunta: "¿Cuántos premios Billboard (BBMAs) tienen?", opciones: ["2", "4", "6", "10"], correcta: "4" }
    ]
};

const preguntasBT21 = [
    { mascota: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkA3d_ol34uvl6AteRLO2NE0g9goFgGBUkxQ&s", opciones: ["RM", "Jin", "Suga", "V"], correcta: "RM" },
    { mascota: "https://fbi.cults3d.com/uploaders/25612027/illustration-file/5a6a5e31-7473-4b04-8c11-22c7805cd538/Cookie_img.jpg", opciones: ["Jimin", "J-Hope", "Jungkook", "V"], correcta: "Jungkook" },
    { mascota: "https://http2.mlstatic.com/D_NQ_NP_976686-MLA69512320272_052023-O.webp", opciones: ["Suga", "V", "RM", "J-Hope"], correcta: "V" },
    { mascota: "https://fbi.cults3d.com/uploaders/16465862/illustration-file/5c4b5ecf-04c9-4256-95b6-de86ebb53e7f/b04648add292f0dd3aa0665d03ecbb88.jpg", opciones: ["RM", "Jimin", "Suga", "Jin"], correcta: "Jin" },
    { mascota: "https://i.pinimg.com/474x/6e/55/a8/6e55a80ce634693ecd893be60ce30dad.jpg", opciones: ["Jin", "J-Hope", "Suga", "V"], correcta: "Suga" },
    { mascota: "https://ih1.redbubble.net/image.6041995696.5470/pp,504x498-pad,600x600,f8f8f8.jpg", opciones: ["J-Hope", "Jungkook", "Jin", "Jimin"], correcta: "J-Hope" },
    { mascota: "https://http2.mlstatic.com/D_NQ_NP_930033-MLA69511425492_052023-O.webp", opciones: ["Jin", "Jimin", "Jungkook", "J-Hope"], correcta: "Jimin" }
];

const preguntasBlurry = [
    { foto: "https://www.musicmundial.com/wp-content/uploads/2023/11/Jungkook-de-BTS-es-oficialmente-el-solista-kpop-mas-exitoso.jpg",opciones: ["Jimin", "V", "Jungkook", "Jin"], correcta: "Jungkook" },
    { foto: "https://images.saymedia-content.com/.image/t_share/MTc2MjkyODI1MzU5NTkwNTcz/bts-v-and-his-4d-personality.jpg",opciones: ["J-Hope", "V", "Jimin", "RM"], correcta: "V"},
    { foto: "https://www.telehit.com/_next/image?url=https%3A%2F%2Fst1.uvnimg.com%2Fc7%2F89%2F43d31abbffae26ba033554aa052c%2Fjimin.jpg&w=1280&q=75",opciones: ["Jungkook", "Suga", "Jimin", "Jin"], correcta: "Jimin"},
    { foto: "https://nw-cdn.sfo3.cdn.digitaloceanspaces.com/uploads/2025/06/WhatsApp-Image-2025-06-24-at-10.11.50-AM-e1750781748570.jpeg",opciones: ["RM", "Suga", "J-Hope", "V"], correcta: "Suga"},
    { foto: "https://media.glamour.mx/photos/639a6df75bd41f7054e567a1/16:9/w_2560%2Cc_limit/servivio_militar_jin_de_bts.jpg",opciones: ["Jin", "RM", "Jungkook", "Jimin"], correcta: "Jin"},
    { foto: "https://imgmedia.larepublica.pe/1000x590/larepublica/original/2023/05/05/6455cee2f1f5d87a7d249a02.webp",opciones: ["Suga", "J-Hope", "RM", "V"], correcta: "RM"},
    { foto: "https://i0.wp.com/celebriteen.com.mx/wp-content/uploads/2024/02/JHOPE-disco-documental-2024.jpg?resize=840%2C560&ssl=1", opciones: ["J-Hope", "Jungkook", "Jin", "Suga"], correcta: "J-Hope"}
];

const preguntasAutos = [
    { foto: "https://centurionlifestyle.com/wp-content/uploads/2022/12/Mercedes-AMG-G-Class-G-63-Rental-Miami-00010-e1672141706152.jpg", opciones: ["Mercedes GT63s", "BMW M5", "Audi RS7", "Porsche Panamera"], correcta: "Mercedes GT63s" },
    { foto: "https://imageio.forbes.com/blogs-images/markewing/files/2018/02/photo-17-1200x880.jpg?format=jpg&height=600&width=1200&fit=bounds",opciones: ["Ferrari F8", "Lamborghini Aventador", "McLaren 720S", "Bugatti Chiron"], correcta: "Lamborghini Aventador" },
    { foto: "https://images.cars.com/cldstatic/wp-content/uploads/hyundai-palisade-calligraphy-awd-2023-01-exterior-front-angle-scaled.jpg", opciones: ["Kia Telluride", "Hyundai Palisade", "Toyota Land Cruiser", "Ford Explorer"], correcta: "Hyundai Palisade" },
    { foto: "https://di-uploads-pod18.dealerinspire.com/competitionautogroup/uploads/2024/08/24-genesis-gv80-ext1.jpg", opciones: ["Lexus LS", "Genesis GV80", "Mercedes S-Class", "BMW 7 Series"], correcta: "Genesis GV80" }
];

const preguntasAlbumes = [
    { foto: "https://akamai.sscdn.co/uploadfile/letras/albuns/6/b/a/0/654281570223551.jpg", opciones: ["LY: Answer", "LY: Tear", "LY: Her", "Face Yourself"], correcta: "LY: Answer"  },
    { foto: "https://http2.mlstatic.com/D_NQ_NP_2X_646792-MLA43334951896_092020-T.webp", opciones: ["Proof", "MOTS: 7", "Butter", "BE"], correcta: "MOTS: 7"  },
    { foto: "https://akamai.sscdn.co/uploadfile/letras/albuns/5/5/d/b/538891571682276.jpg",opciones: ["Dark & Wild", "Wings", "You Never Walk Alone", "Skool Luv Affair"],  correcta: "Wings" },
    { foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/BTS_-_Arirang.jpg/250px-BTS_-_Arirang.jpg",  opciones: ["Butter", "Proof", "Arirang", "Dynamite"],  correcta: "Arirang"  },
    { foto: "https://akamai.sscdn.co/letras/360x360/albuns/4/5/a/6/502651569607894.jpg", opciones: ["Young Forever", "In the Mood for Love Pt.1", "Pt.2", "Wake Up"], correcta: "Young Forever"  },
    { foto: "https://akamai.sscdn.co/uploadfile/letras/albuns/7/5/3/b/314091516194818.jpg", opciones: ["BE", "O!RUL8,2", "Arirang", "Wake Up"], correcta: "O!RUL8,2"  },
    { foto: "https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/dd215769752729.5b8cd50216ea1.png", opciones: ["2 Cool 4 Skool", "Wake Up", "The most beautiful moment in life", "Skool Luv Affair"], correcta: "2 Cool 4 Skool" },
    { foto: "https://static.wikia.nocookie.net/bangtan/images/3/33/Tear_cover.jpg/revision/latest?cb=20180514022556&path-prefix=es", opciones: ["2 Cool 4 Skool", "LY: Tear", "The most beautiful moment in life", "Skool Luv Affair"], correcta: "LY: Tear" },
    { foto: "https://akamai.sscdn.co/uploadfile/letras/albuns/2/9/f/2/987261605868411.jpg", opciones: ["Wake Up", "LY: Answer", "Wings", "BE"], correcta: "BE" },
    { foto: "https://static.qobuz.com/images/covers/wb/g8/rhhn7zg91g8wb_600.jpg", opciones: ["Young Forever", "Butter", "Face Yourself", "MOTS"], correcta: "Butter" },
    { foto: "https://upload.wikimedia.org/wikipedia/en/6/62/Ly-her.jpg", opciones: ["BE", "Wake Up", "LY: Her", "Skool Luv Affair"], correcta: "LY: Her" }
];

const preguntasLyrics = [
    { frase: "Smooth like _____, like a criminal undercover", opciones: ["Sugar", "Butter", "Honey", "Water"], correcta: "Butter"  },
    { frase: "Shining through the city with a little funk and _____", opciones: ["Glow", "Soul", "Light", "Gold"], correcta: "Soul" },
    { frase: "Cause I, I, I'm in the stars tonight. So watch me bring the fire and set the _____ alight", opciones: ["World", "Sky", "Night", "City"], correcta: "Night"  },
    { frase: "I'm the one I should _____, in this world", opciones: ["Trust", "Know", "Love", "Save"], correcta: "Love"},
    { frase: "Life goes on... Like an _____ in the forest", opciones: ["Eagle", "Echo", "Arrow", "Island"], correcta: "Echo"  },
    { frase: "Take my hands now, you are the _____ of my life", opciones: ["Light", "Answer", "Cause", "Home"], correcta: "Cause"  },
    { frase: "Side step, right, left to my _____. High like the moon, rock with me, baby", opciones: ["Flow", "Beat", "Song", "Sound"], correcta: "Beat"  },
    { frase: "You can't stop me _____ myself!", opciones: ["Loving", "Hating", "Saving", "Knowing"], correcta: "Loving" },
    { frase: "We don't need _____ to dance!", opciones: ["Music", "Rhythm", "Permission", "Tickets"], correcta: "Permission" }
];

const detectorBTS = {
    microfonos: [
        { foto: "https://i.pinimg.com/736x/79/bb/7f/79bb7f39149196a97cdf91375c8588a0.jpg", opciones: ["Jimin", "Jin", "Jungkook", "V"], correcta: "Jin" },
        { foto: "https://i.pinimg.com/1200x/ca/9b/a9/ca9ba9b436f84bc4b3970ac6cc3e7880.jpg", opciones: ["RM", "Suga", "V", "J-Hope"], correcta: "V" },
        { foto: "https://i.pinimg.com/736x/66/7f/52/667f5232360b3ae11e94db4f1aeba5d8.jpg", opciones: ["J-Hope", "Jungkook", "Suga", "Jin"], correcta: "J-Hope" },
        { foto: "https://i.pinimg.com/736x/c8/54/65/c854656127645c2f9d5c8c9c4dec8beb.jpg", opciones: ["RM", "Suga", "Jungkook", "V"], correcta: "RM"  },
        { foto: "https://i.pinimg.com/736x/00/2a/a3/002aa3ea85dc0a001a0555168069a478.jpg", opciones: ["Jimin", "Suga", "RM", "V"], correcta: "Suga" },
        { foto: "https://i.pinimg.com/736x/5e/59/57/5e5957316661c8d1583205b9ee0562af.jpg", opciones: ["Jungkook", "Jimin", "V", "Jin"], correcta: "Jimin" },
        { foto: "https://i.pinimg.com/1200x/ac/83/13/ac83137c9e8d21cece60b4a0cb58d6a6.jpg", opciones: ["Jungkook", "Jin", "V", "J-Hope"], correcta: "Jungkook" }
    ],
    tatuajes: [
        { foto: "tattoos/RM.png", opciones: ["RM", "Jin", "Suga", "V"], correcta: "RM" },
        { foto: "tattoos/JIN.png", opciones: ["Jimin", "Jin", "Jungkook", "RM"], correcta: "Jin" },
        { foto: "tattoos/SUGA.png", opciones: ["Suga", "J-Hope", "V", "Jimin"], correcta: "Suga" },
        { foto: "tattoos/jhope.png", opciones: ["RM", "J-Hope", "Jungkook", "Jin"], correcta: "J-Hope" },
        { foto: "tattoos/jimin.png", opciones: ["Jimin", "V", "Suga", "Jungkook"], correcta: "Jimin" },
        { foto: "tattoos/V.png", opciones: ["Jin", "RM", "V", "J-Hope"], correcta: "V" },
        { foto: "tattoos/jk.png", opciones: ["Jungkook", "Suga", "Jimin", "V"], correcta: "Jungkook" }
    ],
    firmas: [
        { foto: "https://i.pinimg.com/1200x/25/5c/d5/255cd575b06e622e4d6f3aaa7594e16a.jpg", opciones: ["RM", "Suga", "J-Hope", "V"], correcta: "RM" },
        { foto: "tattoos/jinF.png", opciones: ["Jimin", "Jin", "Jungkook", "V"], correcta: "Jin" },
        { foto: "https://i.pinimg.com/736x/f1/05/56/f10556374d4b9c2a42024631f60953e3.jpg", opciones: ["RM", "Suga", "J-Hope", "V"], correcta: "Suga" },
        { foto: "https://i.pinimg.com/1200x/1d/98/9b/1d989b0275f82514cf2a016547517e59.jpg", opciones: ["J-Hope", "Jungkook", "Suga", "Jin"], correcta: "J-Hope" },
        { foto: "tattoos/jiminF.png", opciones: ["Jungkook", "Jimin", "V", "Jin"], correcta: "Jimin" },
        { foto: "https://i.pinimg.com/1200x/bd/fe/ce/bdfece937fd15b227ad4eda94ac6b3f2.jpg", opciones: ["RM", "Suga", "V", "J-Hope"], correcta: "V" },
        { foto: "https://i.pinimg.com/1200x/99/35/ed/9935edbd4824191fe5e4bfdd2b593b9b.jpg", opciones: ["Jungkook", "Jin", "V", "J-Hope"], correcta: "Jungkook" }
    ]
};

const preguntasEmoji = [
    { emojis: "🧨 🔥 🌟", opciones: ["Dynamite", "Fire", "Stay Gold", "Butter"], correcta: "Dynamite" },
    { emojis: "🩸 💧 🌓", opciones: ["Black Swan", "Blood Sweat & Tears", "Moon", "Blue & Grey"], correcta: "Blood Sweat & Tears" },
    { emojis: "👟 🍦 🥞", opciones: ["Permission to Dance", "Boy With Luv", "Butter", "Dynamite"], correcta: "Butter" },
    { emojis: " 🎤 🕴️ ⬇", opciones: ["Idol", "Mic Drop", "Dionysus", "Not Today"], correcta: "Mic Drop" },
    { emojis: "🧸 💤 ❄️", opciones: ["Winter Bear", "Snow Flower", "Sweet Night", "Inner Child"], correcta: "Winter Bear" },
    { emojis: "🐋 🌊 💜", opciones: ["Sea", "Whalien 52", "Heartbeat", "Mikrokosmos"], correcta: "Whalien 52" },
    { emojis: "🌤️ 🌈 ☁️", opciones: ["Daydream", "Blue Side", "Hope World", "Airplane"], correcta: "Daydream" },
    { emojis: "🎭 🥀 🌑", opciones: ["Singularity", "Fake Love", "The Truth Untold", "Stigma"], correcta: "Singularity" }
];

// ==========================================
// 3. MENÚS DE JUEGO
// ==========================================
async function abrirMenuJuegos() {
    await Swal.fire({
        background: '#05050a',
        showConfirmButton: false,
        showCloseButton: true,
        width: '98%',
        customClass: { 
            popup: 'garage-popup-immersive vivida-xl', 
            closeButton: 'garage-close-btn' 
        },
        // Usamos este evento que SwAl dispara cuando el HTML ya está listo en el DOM
        didRender: () => {
            const triggerG = document.getElementById('easter-egg-trigger');
            
            if (triggerG) {
                console.log("Easter Egg detectado y listo!"); // Esto es para que veas en la consola (F12) si cargó
                
                triggerG.addEventListener('click', (e) => {
                    e.preventDefault(); // Evita cualquier comportamiento raro
                    
                    // --- LLUVIA DE CORAZONES ---
                    const duration = 5 * 1000;
                    const animationEnd = Date.now() + duration;
                    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
                    const randomInRange = (min, max) => Math.random() * (max - min) + min;

                    const interval = setInterval(function() {
                        const timeLeft = animationEnd - Date.now();
                        if (timeLeft <= 0) return clearInterval(interval);
                        const particleCount = 150 * (timeLeft / duration);
                        
                        confetti({
                            ...defaults, particleCount,
                            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                            colors: ['#8a2be2', '#bd00ff', '#4b0082']
                        });
                        confetti({
                            ...defaults, particleCount,
                            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                            colors: ['#d8b4fe', '#a855f7', '#7e22ce']
                        });
                    }, 250);

                    // Pequeño aviso visual
                    Swal.fire({
    title: '💜 I PURPLE YOU FOREVER 💜',
    html: '<p style="color: #ffea00; font-weight: bold; font-size: 1.2rem;">Encontraste el mensaje secreto</p>',
    background: 'rgba(0,0,0,0)', // Transparente para que se vean los corazones atrás
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    backdrop: `
        rgba(138, 43, 226, 0.2)
    `,
    customClass: {
        title: 'easter-egg-title-vivida'
    },
    showClass: {
        popup: 'animate__animated animate__zoomIn' // Si usas Animate.css, si no, entra suave igual
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOut'
    }
});
                });
            }
        },
        html: `
            <div class="arcade-container immersive-layout">
                <h1 class="arcade-title">
                    BAN<span id="easter-egg-trigger" style="cursor:pointer; transition: 0.3s; color:#ffea00; display:inline-block;">G</span>TAN ARCADE
                </h1>
                <p class="arcade-subtitle">SELECCIONÁ TU SIGUIENTE OBJETIVO... VÍVIDA</p>
                
                <div class="immersive-list-wrapper">
                    <div class="mode-item neon-aqua" onclick="iniciarBT21Match()">
                        <div class="item-bg-vivida" style="background-image: url('https://i.pinimg.com/736x/f4/37/75/f43775968b0cc0ebbcd8209d7eaaec04.jpg')"></div>
                        <div class="item-content-wrapper">
                            <div class="mode-icon-mini">🐾</div>
                            <div class="text-group">
                                <h3 class="mode-name-vivida">BT21 Dueños</h3>
                                <p class="mode-desc-vivida">Reconocé a los padres de los BT21.</p>
                            </div>
                        </div>
                    </div>

                    <div class="mode-item neon-aqua" onclick="iniciarBlurryMatch()">
                        <div class="item-bg-vivida" style="background-image: url('https://i.pinimg.com/1200x/c0/69/3f/c0693fe881eacff525f810c979a7bfa4.jpg')"></div>
                        <div class="item-content-wrapper">
                            <div class="mode-icon-mini">🕵️‍♀️</div>
                            <div class="text-group">
                                <h3 class="mode-name-vivida">Adivinar el BTS</h3>
                                <p class="mode-desc-vivida">¿Sabés quién es el miembro borroso?</p>
                            </div>
                        </div>
                    </div>

                    <div class="mode-item neon-purple" onclick="iniciarLyricsMatch()">
                        <div class="item-bg-vivida" style="background-image: url('https://i.pinimg.com/736x/35/ef/93/35ef937722145ddc1f780d77c526a149.jpg')"></div>
                        <div class="item-content-wrapper">
                            <div class="mode-icon-mini">🎤</div>
                            <div class="text-group">
                                <h3 class="mode-name-vivida">Completar Canción</h3>
                                <p class="mode-desc-vivida">Completá la letra faltante de la canción.</p>
                            </div>
                        </div>
                    </div>

                    <div class="mode-item neon-purple" onclick="iniciarAutosMatch()">
                        <div class="item-bg-vivida" style="background-image: url('https://i.pinimg.com/736x/d9/ee/86/d9ee867bc29747a701e30c8cd23d40f2.jpg')"></div>
                        <div class="item-content-wrapper">
                            <div class="mode-icon-mini">🏎️</div>
                            <div class="text-group">
                                <h3 class="mode-name-vivida">Bangtan Garage</h3>
                                <p class="mode-desc-vivida">Adiviná qué auto es.</p>
                            </div>
                        </div>
                    </div>

                    <div class="mode-item neon-magenta" onclick="iniciarAlbumMatch()">
                        <div class="item-bg-vivida" style="background-image: url('https://i.pinimg.com/1200x/15/2e/74/152e74f6b533bd35ae0b43fd3fe41513.jpg')"></div>
                        <div class="item-content-wrapper">
                            <div class="mode-icon-mini">💿</div>
                            <div class="text-group">
                                <h3 class="mode-name-vivida">Album Cover</h3>
                                <p class="mode-desc-vivida">Reconocé sus albumes con el paso del tiempo.</p>
                            </div>
                        </div>
                    </div>

                    <div class="mode-item neon-magenta" onclick="abrirMenuTrivia()">
                        <div class="item-bg-vivida" style="background-image: url('https://i.pinimg.com/736x/be/35/2c/be352c17d7e40180dbf9258c9d974067.jpg')"></div>
                        <div class="item-content-wrapper">
                            <div class="mode-icon-mini">🧠</div>
                            <div class="text-group">
                                <h3 class="mode-name-vivida">Bangtan Trivia</h3>
                                <p class="mode-desc-vivida">Demostrá cuánto sabés sobre ellos </p>
                            </div>
                        </div>
                    </div>

                    <div class="mode-item neon-gold" onclick="abrirMenuBias()">
                        <div class="item-bg-vivida" style="background-image: url('https://i.pinimg.com/1200x/a4/c3/f4/a4c3f496daca660546c16bbbdbb902b8.jpg')"></div>
                        <div class="item-content-wrapper">
                            <div class="mode-icon-mini">💍</div>
                            <div class="text-group">
                                <h3 class="mode-name-vivida">Bias Detector</h3>
                                <p class="mode-desc-vivida">Adiviná de quién es el accesorio.</p>
                            </div>
                        </div>
                    </div>

                    <div class="mode-item neon-gold" onclick="iniciarEmojiMatch()">
                        <div class="item-bg-vivida" style="background-image: url('https://i.pinimg.com/736x/b9/8b/89/b98b89f49c067be173880e708c81a6b6.jpg')"></div>
                        <div class="item-content-wrapper">
                            <div class="mode-icon-mini">🧩</div>
                            <div class="text-group">
                                <h3 class="mode-name-vivida">Emoji Song</h3>
                                <p class="mode-desc-vivida">¿Podes reconocer la cancion por los emojis?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
}

function abrirMenuBias() {
    Swal.fire({
        background: '#0a0a12',
        showConfirmButton: false,
        showCloseButton: true,
        width: '500px',
        customClass: { popup: 'trivia-cyber-popup', closeButton: 'garage-close-btn' },
        didOpen: () => {
            const cards = document.querySelectorAll('.btn-bias-select');
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    const modo = card.getAttribute('data-modo');
                    Swal.close();
                    iniciarJuegoBias(modo);
                });
            });
        },
        html: `
            <div class="trivia-wrapper">
                <h2 class="trivia-main-title">BIAS <span>DETECTOR</span></h2>
                <div class="difficulty-list">
                    <div class="btn-bias-select easy" data-modo="microfonos">
                        <div class="card-bg-image"></div>
                        <div class="card-content">
                            <span class="card-emoji">🎤</span>
                            <div class="card-texts"><strong>MICRÓFONOS</strong><p>Nivel Trainee</p></div>
                        </div>
                    </div>
                    <div class="btn-bias-select medium" data-modo="tatuajes">
                        <div class="card-bg-image"></div>
                        <div class="card-content">
                            <span class="card-emoji">💉</span>
                            <div class="card-texts"><strong>TATUAJES</strong><p>Nivel Vívida</p></div>
                        </div>
                    </div>
                    <div class="btn-bias-select hard" data-modo="firmas">
                        <div class="card-bg-image"></div>
                        <div class="card-content">
                            <span class="card-emoji">✍️</span>
                            <div class="card-texts"><strong>FIRMAS</strong><p>Nivel Experta</p></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
}

function abrirMenuTrivia() {
    Swal.fire({
        background: '#0a0a12',
        showConfirmButton: false,
        showCloseButton: true,
        width: '500px',
        customClass: { popup: 'trivia-cyber-popup', closeButton: 'garage-close-btn' },
        didOpen: () => {
            const cards = document.querySelectorAll('.btn-trivia-select');
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    const nivel = card.getAttribute('data-nivel');
                    Swal.close();
                    iniciarTriviaGeneral(nivel);
                });
            });
        },
        html: `
            <div class="trivia-wrapper">
                <h2 class="trivia-main-title">BAN<span>G</span>TAN TRIVIA</h2>
                <div class="difficulty-list">
                    <div class="btn-trivia-select easy" data-nivel="facil">
                        <div class="card-bg-image"></div>
                        <div class="card-content">
                            <span class="card-emoji">🐥</span>
                            <div class="card-texts"><strong>MODO TRAINEE</strong><p>Para empezar el camino</p></div>
                        </div>
                    </div>
                    <div class="btn-trivia-select medium" data-nivel="medio">
                        <div class="card-bg-image"></div>
                        <div class="card-content">
                            <span class="card-emoji">👑</span>
                            <div class="card-texts"><strong>MODO IDOL</strong><p>Ya sos parte del fandom</p></div>
                        </div>
                    </div>
                    <div class="btn-trivia-select hard" data-nivel="dificil">
                        <div class="card-bg-image"></div>
                        <div class="card-content">
                            <span class="card-emoji">💜</span>
                            <div class="card-texts"><strong>MODO VÍVIDA</strong><p>Nivel Experta Total</p></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
}

// ==========================================
// 4. LÓGICA DE JUEGOS
// ==========================================

// --- BIAS DETECTOR ---
function iniciarJuegoBias(modo) {
    gameState.lives = 3;
    gameState.score = 0;
    gameState.streak = 0;
    indicePregunta = 0;
    preguntasActuales = detectorBTS[modo]; 
    mostrarPreguntaBias();
}

function mostrarPreguntaBias() {
    const p = preguntasActuales[indicePregunta];
    Swal.fire({
        background: '#05050a',
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: { popup: 'trivia-cyber-popup' },
        html: `
            <div class="game-hud">
                <div class="hearts">${"💜".repeat(gameState.lives)}</div>
                <div class="score-digital">${gameState.score.toString().padStart(6, '0')}</div>
                <button class="game-exit-btn" onclick="Swal.close()">❌</button>
            </div>
            <div class="pregunta-container">
                <div class="img-box">
                    <img src="${p.foto}" class="img-pregunta">
                </div>
                <div class="options-grid">
                    ${p.opciones.map(opt => `
                        <button class="btn-option bias-btn" onclick="chequearRespuestaBias('${opt}', '${p.correcta}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `
    });
}

function chequearRespuestaBias(elegida, correcta) {
    const botones = document.querySelectorAll('.bias-btn');
    const grid = document.querySelector('.options-grid');
    if (grid) grid.classList.add('disabled');

    botones.forEach(b => {
        const texto = b.innerText.trim();
        if (texto === correcta) b.classList.add('correct');
        else if (texto === elegida) b.classList.add('wrong');
    });

    procesarResultado(elegida === correcta, 2000);

    setTimeout(() => {
        if (gameState.lives <= 0) showGameOver();
        else {
            indicePregunta++;
            if (indicePregunta < preguntasActuales.length) mostrarPreguntaBias();
            else showVictory();
        }
    }, 1500);
} 

// --- TRIVIA ---
function iniciarTriviaGeneral(nivel) {
    gameState.lives = 3;
    gameState.score = 0;
    gameState.streak = 0;
    indicePregunta = 0;
    preguntasActuales = triviaBTS[nivel]; 
    mostrarPreguntaTrivia();
}

function mostrarPreguntaTrivia() {
    const p = preguntasActuales[indicePregunta];
    Swal.fire({
        background: '#05050a',
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: { popup: 'trivia-cyber-popup' },
        html: `
            <div class="game-hud">
                <div class="hearts">${"💜".repeat(gameState.lives)}</div>
                <div class="score-digital">${gameState.score.toString().padStart(6, '0')}</div>
                <button class="game-exit-btn" onclick="Swal.close()">❌</button>
            </div>
            <div class="pregunta-container">
                <p class="question-count">PREGUNTA ${indicePregunta + 1} de ${preguntasActuales.length}</p>
                <div class="trivia-card">
                    <p style="font-size:22px;font-weight:bold;color:#fff;margin:0;">${p.pregunta}</p>
                </div>
                <div class="options-grid">
                    ${p.opciones.map(opt => `
                        <button class="btn-option trivia-btn" onclick="chequearRespuestaTrivia('${opt}', '${p.correcta}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `
    });
}

function chequearRespuestaTrivia(elegida, correcta) {
    const botones = document.querySelectorAll('.trivia-btn');
    const grid = document.querySelector('.options-grid');
    if (grid) grid.classList.add('disabled');

    botones.forEach(b => {
        const texto = b.innerText.trim();
        if (texto === correcta) b.classList.add('correct');
        else if (texto === elegida) b.classList.add('wrong');
    });

    procesarResultado(elegida === correcta, 2000);

    setTimeout(() => {
        if (gameState.lives <= 0) showGameOver();
        else {
            indicePregunta++;
            if (indicePregunta < preguntasActuales.length) mostrarPreguntaTrivia();
            else showVictory();
        }
    }, 1500);
}

// --- OTROS MODOS ---
function iniciarBT21Match() {
    gameState.lives = 3; gameState.score = 0; gameState.streak = 0; indicePregunta = 0;
    mostrarPregunta();
}

function mostrarPregunta() {
    const p = preguntasBT21[indicePregunta];
    Swal.fire({
        background: '#05050a', showConfirmButton: false, allowOutsideClick: false, customClass: { popup: 'trivia-cyber-popup' },
        html: `
            <div class="game-hud">
                <div class="hearts">${"💜".repeat(gameState.lives)}</div>
                <div class="score-digital">${gameState.score.toString().padStart(6, '0')}</div>
                <button class="game-exit-btn" onclick="Swal.close()">❌</button>
            </div>
            <div class="pregunta-container">
                <div class="img-box">
                    <img src="${p.mascota}" class="img-pregunta">
                </div>
                <div class="options-grid">
                    ${p.opciones.map(opt => `<button class="btn-option" onclick="chequearRespuesta('${opt}', '${p.correcta}')">${opt}</button>`).join('')}
                </div>
            </div>
        `
    });
}

function chequearRespuesta(elegida, correcta) {
    const botones = document.querySelectorAll('.btn-option');
    document.querySelector('.options-grid').classList.add('disabled');
    const esCorrecto = elegida === correcta;
    procesarResultado(esCorrecto, 1000);
    
    if (esCorrecto) {
        botones.forEach(b => { if(b.innerText.trim() === elegida) b.classList.add('correct'); });
    } else {
        botones.forEach(b => { 
            if(b.innerText.trim() === elegida) b.classList.add('wrong');
            if(b.innerText.trim() === correcta) b.classList.add('correct');
        });
    }
    setTimeout(() => {
        if (gameState.lives <= 0) showGameOver();
        else {
            indicePregunta++;
            if (indicePregunta < preguntasBT21.length) mostrarPregunta();
            else showVictory();
        }
    }, 1200);
}

function iniciarBlurryMatch() {
    gameState.lives = 3; gameState.score = 0; gameState.streak = 0; indicePregunta = 0; currentBlur = 30;
    mostrarPreguntaBlurry();
}

function mostrarPreguntaBlurry() {
    clearInterval(blurTimer);
    const p = preguntasBlurry[indicePregunta];
    Swal.fire({
        background: '#05050a', showConfirmButton: false, allowOutsideClick: false,
        customClass: { popup: 'trivia-cyber-popup' }, html: `
            <div class="game-hud">
                <div class="hearts">${"💜".repeat(gameState.lives)}</div>
                <div class="score-digital">${gameState.score.toString().padStart(6, '0')}</div>
                <button class="game-exit-btn" onclick="Swal.close()">❌</button>
            </div>
            <div class="pregunta-container">
                <p class="blur-hint">- la imagen se va mejorando cada 5 segundos</p>
                <div class="img-box">
                    <img src="${p.foto}" id="blurry-img" class="img-pregunta" style="filter: blur(${currentBlur}px); transition: filter 1s linear;">
                </div>
                <div class="options-grid">
                    ${p.opciones.map(opt => `<button class="btn-option" onclick="chequearRespuestaBlurry('${opt}', '${p.correcta}')">${opt}</button>`).join('')}
                </div>
            </div>
        `
    });
    blurTimer = setInterval(() => {
        if (currentBlur > 5) {
            currentBlur -= 5;
            const img = document.getElementById('blurry-img');
            if (img) img.style.filter = `blur(${currentBlur}px)`;
        } else { clearInterval(blurTimer); }
    }, 1500);
}

function chequearRespuestaBlurry(elegida, correcta) {
    clearInterval(blurTimer);
    const botones = document.querySelectorAll('.btn-option');
    document.querySelector('.options-grid').classList.add('disabled');
    const esCorrecto = elegida === correcta;
    procesarResultado(esCorrecto, 2000);

    if (esCorrecto) {
        botones.forEach(b => { if(b.innerText.trim() === elegida) b.classList.add('correct'); });
    } else {
        botones.forEach(b => { 
            if(b.innerText.trim() === elegida) b.classList.add('wrong');
            if(b.innerText.trim() === correcta) b.classList.add('correct');
        });
    }
    setTimeout(() => {
        if (gameState.lives <= 0) showGameOver();
        else {
            indicePregunta++;
            if (indicePregunta < preguntasBlurry.length) { currentBlur = 30; mostrarPreguntaBlurry(); }
            else showVictory();
        }
    }, 1200);
}

function iniciarAutosMatch() {
    gameState.lives = 3; gameState.score = 0; gameState.streak = 0; indicePregunta = 0;
    mostrarPreguntaAutos();
}

function mostrarPreguntaAutos() {
    const p = preguntasAutos[indicePregunta];
    Swal.fire({
        background: '#05050a', showConfirmButton: false, allowOutsideClick: false, customClass: { popup: 'trivia-cyber-popup' },
        html: `
            <div class="game-hud">
                <div class="hearts">${"💜".repeat(gameState.lives)}</div>
                <div class="score-digital">${gameState.score.toString().padStart(6, '0')}</div>
                <button class="game-exit-btn" onclick="Swal.close()">❌</button>
            </div>
            <div class="pregunta-container">
                <div class="img-box">
                    <img src="${p.foto}" class="img-pregunta">
                </div>
                <div class="options-grid">
                    ${p.opciones.map(opt => `<button class="btn-option" onclick="chequearRespuestaAutos('${opt}', '${p.correcta}')">${opt}</button>`).join('')}
                </div>
            </div>
        `
    });
}

function chequearRespuestaAutos(elegida, correcta) {
    const botones = document.querySelectorAll('.btn-option');
    document.querySelector('.options-grid').classList.add('disabled');
    const esCorrecto = elegida === correcta;
    procesarResultado(esCorrecto, 3000);

    if (esCorrecto) {
        botones.forEach(b => { if(b.innerText.trim() === elegida) b.classList.add('correct'); });
    } else {
        botones.forEach(b => { 
            if(b.innerText.trim() === elegida) b.classList.add('wrong');
            if(b.innerText.trim() === correcta) b.classList.add('correct');
        });
    }
    setTimeout(() => {
        if (gameState.lives <= 0) showGameOver();
        else {
            indicePregunta++;
            if (indicePregunta < preguntasAutos.length) mostrarPreguntaAutos();
            else showVictory();
        }
    }, 1200);
}

function iniciarAlbumMatch() {
    gameState.lives = 3; gameState.score = 0; gameState.streak = 0; indicePregunta = 0; currentBlur = 40;
    mostrarPreguntaAlbum();
}

function mostrarPreguntaAlbum() {
    clearInterval(blurTimer);
    const p = preguntasAlbumes[indicePregunta];
    Swal.fire({
        background: '#05050a', showConfirmButton: false, allowOutsideClick: false, customClass: { popup: 'trivia-cyber-popup' },
        html: `
            <div class="game-hud">
                <div class="hearts">${"💜".repeat(gameState.lives)}</div>
                <div class="score-digital">${gameState.score.toString().padStart(6, '0')}</div>
                <button class="game-exit-btn" onclick="Swal.close()">❌</button>
            </div>
            <div class="pregunta-container">
                <p class="blur-hint">- la imagen se va mejorando cada 5 segundos</p>
                <div class="img-box">
                    <img src="${p.foto}" id="album-img" class="img-pregunta" style="filter: blur(${currentBlur}px); transition: filter 1s linear;">
                </div>
                <div class="options-grid">
                    ${p.opciones.map(opt => `<button class="btn-option album-btn" onclick="chequearRespuestaAlbum('${opt}', '${p.correcta}')">${opt}</button>`).join('')}
                </div>
            </div>
        `
    });
    blurTimer = setInterval(() => {
        if (currentBlur > 5) {
            currentBlur -= 5;
            const img = document.getElementById('album-img');
            if (img) img.style.filter = `blur(${currentBlur}px)`;
        } else { clearInterval(blurTimer); }
    }, 1200);
}

function chequearRespuestaAlbum(elegida, correcta) {
    clearInterval(blurTimer);
    const botones = document.querySelectorAll('.album-btn');
    document.querySelector('.options-grid').classList.add('disabled');
    const esCorrecto = elegida === correcta;
    procesarResultado(esCorrecto, 2500);

    if (esCorrecto) {
        botones.forEach(b => { if(b.innerText.trim() === elegida) b.classList.add('correct'); });
    } else {
        botones.forEach(b => { 
            if(b.innerText.trim() === elegida) b.classList.add('wrong');
            if(b.innerText.trim() === correcta) b.classList.add('correct');
        });
    }
    setTimeout(() => {
        if (gameState.lives <= 0) showGameOver();
        else {
            indicePregunta++;
            if (indicePregunta < preguntasAlbumes.length) { currentBlur = 10; mostrarPreguntaAlbum(); }
            else showVictory();
        }
    }, 1200);
}

function iniciarLyricsMatch() {
    gameState.lives = 3; gameState.score = 0; gameState.streak = 0; indicePregunta = 0;
    mostrarPreguntaLyrics();
}

function mostrarPreguntaLyrics() {
    const p = preguntasLyrics[indicePregunta];
    Swal.fire({
        background: '#05050a', showConfirmButton: false, allowOutsideClick: false, customClass: { popup: 'trivia-cyber-popup' },
        html: `
            <div class="game-hud">
                <div class="hearts">${"💜".repeat(gameState.lives)}</div>
                <div class="score-digital">${gameState.score.toString().padStart(6, '0')}</div>
                <button class="game-exit-btn" onclick="Swal.close()">❌</button>
            </div>
            <div class="pregunta-container">
                <div class="lyrics-card">
                    <p class="lyrics-text">"${p.frase}"</p>
                </div>
                <div class="options-grid">
                    ${p.opciones.map(opt => `<button class="btn-option" onclick="chequearRespuestaLyrics('${opt}', '${p.correcta}')">${opt}</button>`).join('')}
                </div>
            </div>
        `
    });
}

function chequearRespuestaLyrics(elegida, correcta) {
    const botones = document.querySelectorAll('.btn-option');
    document.querySelector('.options-grid').classList.add('disabled');
    const esCorrecto = elegida === correcta;
    procesarResultado(esCorrecto, 1500);

    if (esCorrecto) {
        botones.forEach(b => { if(b.innerText.trim() === elegida) b.classList.add('correct'); });
    } else {
        botones.forEach(b => { 
            if(b.innerText.trim() === elegida) b.classList.add('wrong');
            if(b.innerText.trim() === correcta) b.classList.add('correct');
        });
    }
    setTimeout(() => {
        if (gameState.lives <= 0) showGameOver();
        else {
            indicePregunta++;
            if (indicePregunta < preguntasLyrics.length) mostrarPreguntaLyrics();
            else showVictory();
        }
    }, 1200);
}

// PANTALLAS FINALES
function showGameOver() {
    manejarHighScore();
    const namimiHighScore = localStorage.getItem('bangtanHighScore') || 0;
    let leaderboardHTML = '';

    if (gameState.score > FABRI_SCORE) {
        leaderboardHTML = `
            <div class="leaderboard-entry player-entry"><span class="leaderboard-name">Namimi</span><span class="leaderboard-score">${gameState.score.toString().padStart(6, '0')}</span></div>
            <div class="leaderboard-entry"><span class="leaderboard-name">Fabri</span><span class="leaderboard-score">${FABRI_SCORE.toString().padStart(6, '0')}</span></div>
        `;
    } else {
        leaderboardHTML = `
            <div class="leaderboard-entry"><span class="leaderboard-name">Fabri</span><span class="leaderboard-score">${FABRI_SCORE.toString().padStart(6, '0')}</span></div>
            <div class="leaderboard-entry player-entry"><span class="leaderboard-name">Namimi</span><span class="leaderboard-score">${gameState.score.toString().padStart(6, '0')}</span></div>
        `;
    }

    Swal.fire({
        background: '#05050a', showConfirmButton: false, customClass: { popup: 'arcade-end-popup' },
        html: `
            <div class="end-game-container">
                <span class="skull-glow">💀</span><h2 class="end-title-defeat">GAME OVER</h2>
                <h1 class="digital-score">${gameState.score.toString().padStart(6, '0')}</h1>
                <div class="leaderboard-container">${leaderboardHTML}</div>
                <p class="leaderboard-high-score">Tu mejor puntaje: <span class="digital-score-small">${namimiHighScore.toString().padStart(6, '0')}</span></p>
                <button class="btn-arcade btn-primary" onclick="abrirMenuJuegos()">Back to Menu</button>
            </div>`
    });
}

function showVictory() {
    // Bonus por vidas: 1000 puntos por cada vida
    const bonus = gameState.lives * 1000;
    gameState.score += bonus;
    manejarHighScore();
    const namimiHighScore = localStorage.getItem('bangtanHighScore') || 0;
    let leaderboardHTML = '';

    if (gameState.score > FABRI_SCORE) {
        leaderboardHTML = `
            <div class="leaderboard-entry player-entry"><span class="leaderboard-name">Namimi</span><span class="leaderboard-score">${gameState.score.toString().padStart(6, '0')}</span></div>
            <div class="leaderboard-entry"><span class="leaderboard-name">Fabri</span><span class="leaderboard-score">${FABRI_SCORE.toString().padStart(6, '0')}</span></div>
        `;
    } else {
        leaderboardHTML = `
            <div class="leaderboard-entry"><span class="leaderboard-name">Fabri</span><span class="leaderboard-score">${FABRI_SCORE.toString().padStart(6, '0')}</span></div>
            <div class="leaderboard-entry player-entry"><span class="leaderboard-name">Namimi</span><span class="leaderboard-score">${gameState.score.toString().padStart(6, '0')}</span></div>
        `;
    }

    Swal.fire({
        background: '#05050a', showConfirmButton: false, customClass: { popup: 'arcade-end-popup' },
        html: `
            <div class="end-game-container">
                <span class="trophy-glow">🏆</span><h2 class="end-title-victory">VICTORIA</h2>
                <h1 class="digital-score">${gameState.score.toString().padStart(6, '0')}</h1>
                <p style="color:#a485ff; font-size: 0.9rem;">Bono por vidas (+${bonus})</p>
                <div class="leaderboard-container">${leaderboardHTML}</div>
                <p class="leaderboard-high-score">Tu mejor puntaje: <span class="digital-score-small">${namimiHighScore.toString().padStart(6, '0')}</span></p>
                <button class="btn-arcade btn-primary" onclick="abrirMenuJuegos()">¡Yeeeei! 💜</button>
            </div>`
    });
}

function iniciarEmojiMatch() {
    gameState.lives = 3;
    gameState.score = 0;
    gameState.streak = 0;
    indicePregunta = 0;
    mostrarPreguntaEmoji();
}

function mostrarPreguntaEmoji() {
    const p = preguntasEmoji[indicePregunta];
    Swal.fire({
        background: '#05050a',
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: { popup: 'trivia-cyber-popup' },
        html: `
            <div class="game-hud">
                <div class="hearts">${"💜".repeat(gameState.lives)}</div>
                <div class="score-digital">${gameState.score.toString().padStart(6, '0')}</div>
                <button class="game-exit-btn" onclick="Swal.close()">❌</button>
            </div>
            <div class="pregunta-container">
                <p class="question-count" style="color:#ff007a">EMOJI QUIZ - Q ${indicePregunta + 1} de ${preguntasEmoji.length}</p>
                
                <div class="lyrics-card emoji-lyrics-card">
                    <p style="font-size: 55px; margin: 0; filter: drop-shadow(0 0 15px rgba(255,0,122,0.6)); letter-spacing: 10px;">
                        ${p.emojis}
                    </p>
                    <p style="color: #ff007a; font-size: 11px; margin-top: 20px; letter-spacing: 3px; font-weight: bold;">ADIVINÁ LA CANCIÓN</p>
                </div>

                <div class="options-grid">
                    ${p.opciones.map(opt => `
                        <button class="btn-option emoji-btn" onclick="chequearRespuestaEmoji('${opt}', '${p.correcta}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `
    });
}

function chequearRespuestaEmoji(elegida, correcta) {
    const botones = document.querySelectorAll('.emoji-btn');
    document.querySelector('.options-grid').classList.add('disabled');

    const esCorrecto = elegida === correcta;
    procesarResultado(esCorrecto, 1500);

    botones.forEach(b => {
        const texto = b.innerText.trim();
        if (texto === correcta) b.classList.add('correct');
        else if (!esCorrecto && texto === elegida) b.classList.add('wrong');
    });

    setTimeout(() => {
        if (gameState.lives <= 0) showGameOver();
        else {
            indicePregunta++;
            if (indicePregunta < preguntasEmoji.length) mostrarPreguntaEmoji();
            else showVictory();
        }
    }, 1500);
}