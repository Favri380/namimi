const playlist = {
    'bts': [
        { title: 'I Like It', file: 'audio/bts-like.mp3' },
        { title: 'Boy In Luv', file: 'audio/bts-boyinluv.mp3' },
        { title: 'Boy With Luv', file: 'audio/bts-boywithluv.mp3' },
        { title: 'HOME', file: 'audio/bts-home.mp3' },
        { title: 'Airplane pt.2', file: 'audio/bts-airplane2.mp3' }
    ],
    'rm': [{ title: 'Trivia: Love', file: 'audio/rm-love.mp3' }],
    'jin': [{ title: 'Epiphany', file: 'audio/jin-epiphany.mp3' }],
    'suga': [{ title: 'Seesaw', file: 'audio/suga-seesaw.mp3' }],
    'jimin': [
        { title: 'Promise', file: 'audio/jimin-promise.mp3' },
        { title: 'Serendipity', file: 'audio/jimin-serendipity.mp3' }
    ],
    'jhope': [
        { title: 'Daydream', file: 'audio/jhope-daydream.mp3' },
        { title: 'EGO', file: 'audio/jhope-ego.mp3' }
    ],
    'v': [{ title: 'Singularity', file: 'audio/v-singularity.mp3' }],
    'jk': [
        { title: 'Euphoria', file: 'audio/jk-euphoria.mp3' },
        { title: 'Begin', file: 'audio/jk-begin.mp3' }
    ]
};

let currentArtistSongs = [];
let currentSongIndex = 0;

const artistSelect = document.getElementById('artist-select');
const songList = document.getElementById('song-list');
const audioPlayer = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const volumeControl = document.getElementById('volume-control');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');

function loadSong(index) {
    if (currentArtistSongs.length > 0) {
        const song = currentArtistSongs[index];
        audioPlayer.src = song.file;
        currentTitle.innerText = song.title;
        audioPlayer.volume = volumeControl.value;

        audioPlayer.play().then(() => {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(error => console.error("Error audio:", error));
    }
}

artistSelect.addEventListener('change', function() {
    const artist = this.value;
    songList.innerHTML = ''; 
    if (artist && playlist[artist]) {
        currentArtistSongs = playlist[artist];
        currentSongIndex = 0;
        songList.style.display = 'block';
        currentArtist.innerText = artist.toUpperCase();

        currentArtistSongs.forEach((song, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-light btn-sm d-block w-100 mb-1 text-start';
            btn.innerHTML = `<i class="fas fa-play-circle me-2"></i>${song.title}`;
            btn.onclick = () => { currentSongIndex = index; loadSong(currentSongIndex); };
            songList.appendChild(btn);
        });
    }
});

document.getElementById('nextBtn').onclick = () => {
    if (currentArtistSongs.length > 0) {
        currentSongIndex = (currentSongIndex + 1) % currentArtistSongs.length;
        loadSong(currentSongIndex);
    }
};

document.getElementById('prevBtn').onclick = () => {
    if (currentArtistSongs.length > 0) {
        currentSongIndex = (currentSongIndex - 1 + currentArtistSongs.length) % currentArtistSongs.length;
        loadSong(currentSongIndex);
    }
};

volumeControl.addEventListener('input', (e) => { audioPlayer.volume = e.target.value; });

playBtn.onclick = () => {
    if (!audioPlayer.src) return;
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
};

// MINIMIZAR Y ARRASTRAR
const minimizeBtn = document.getElementById('minimizeBtn');
const movablePlayer = document.getElementById('movablePlayer');

minimizeBtn.addEventListener('mousedown', (e) => e.stopPropagation());
minimizeBtn.onclick = (e) => {
    e.preventDefault();
    movablePlayer.classList.toggle('minimized');
    minimizeBtn.classList.toggle('fa-minus');
    minimizeBtn.classList.toggle('fa-plus');
};

dragElement(movablePlayer);

// FUNCIÓN PARA ARRASTRAR (DRAG) OPTIMIZADA
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById("playerHeader");
    if (header) header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (e.target.id === 'minimizeBtn') return;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Usamos requestAnimationFrame para que no sea lento
        requestAnimationFrame(() => {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            elmnt.style.bottom = "auto";
            elmnt.style.right = "auto";
            elmnt.style.margin = "0";
        });
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function mostrarMimoAleatorio() {
    const mimos = [
        { url: 'https://media.tenor.com/RPyhdKNsDK8AAAAm/kirby-kirby-dance.webp', text: 'Mira como lo mueve' },
           { url: 'https://media.tenor.com/DzygLfmEA-oAAAAm/kirby-dance.webp', text: 'para arriba para abajo wiu wiu💃' },
           { url: 'https://media.tenor.com/aoduROtRPjwAAAAM/kirby-kirby-dance.gif', text: 'Kirby bailando con su amiguito' },
            { url: 'https://media.tenor.com/2KdFBFzRFF4AAAAm/kirby-dance.webp', text: 'Tocaste tanto que hiciste que kirby vaya a la velocidad de la luz 💫' },
             { url: 'https://media.tenor.com/-aOA33tGWv0AAAAm/kirby-dance.webp', text: 'Kirby relajao' },
              { url: 'https://media.tenor.com/0HNbCY6fuOIAAAAm/kirby-dancing.webp', text: 'Kirby en un agujero de gusano' },
               { url: 'https://media.tenor.com/ndoU8m6yDYMAAAAM/kirby-sombrero.gif', text: 'Un Kirby Mexicano aparecio!! 😲' },
                { url: 'https://media.tenor.com/dJKLZ4whAEkAAAAM/kirby-dance.gif', text: 'Fiestita con Kirby' },
                 { url: 'https://media.tenor.com/uavsYC3JN08AAAAM/kirby-dancing-in-snow-kirby-right-back-at-ya.gif', text: 'Kirby en la nieve ☃' },
                  { url: 'https://media.tenor.com/u-k8O4g13pYAAAAM/kirby-dance.gif', text: '3 Kirbys sincronizados :0' },
                   { url: 'https://media.tenor.com/1i8-xMxJNa4AAAAM/kirby-happy-kirby.gif', text: 'jeje Kirby feli :D iiiih' },
        { url: 'https://media.tenor.com/olRQ2QnTqxQAAAAi/kirby-dance.gif', text: 'Kirby danzante)?' }
    ];
    
const random = mimos[Math.floor(Math.random() * mimos.length)];
    

    Swal.fire({
        title: '¡Kirby Sorpresa! 💜',
        text: random.text,
        imageUrl: random.url,
     
        confirmButtonText: '¡A buscar otro! ❤️',
        buttonsStyling: false, 
        customClass: {
            popup: 'kirby-popup',
            confirmButton: 'kirby-button-confirm',
            title: 'kirby-title',
            htmlContainer: 'kirby-text',
            image: 'kirby-gif' // 
        }
    });
}
