function mostrarKirby() {
    const mimos = [
        { url: 'https://media.tenor.com/RPyhdKNsDK8AAAAm/kirby-kirby-dance.webp', text: 'bailecito' },
        { url: 'https://media.tenor.com/DzygLfmEA-oAAAAm/kirby-dance.webp', text: 'para arriba para abajo wiu wiu💃' },
        { url: 'https://media.tenor.com/aoduROtRPjwAAAAM/kirby-kirby-dance.gif', text: 'Kirby bailando con su amiguito' },
        { url: 'https://media.tenor.com/2KdFBFzRFF4AAAAm/kirby-dance.webp', text: 'bailecito a la velocidad de la luz 💫' },
        { url: 'https://media.tenor.com/-aOA33tGWv0AAAAm/kirby-dance.webp', text: 'Kirby relajao' },
        { url: 'https://media.tenor.com/0HNbCY6fuOIAAAAm/kirby-dancing.webp', text: 'Kirby en un agujero de gusano' },
        { url: 'https://media.tenor.com/ndoU8m6yDYMAAAAM/kirby-sombrero.gif', text: 'Un Kirby Mexicano aparecio!! 😲' },
        { url: 'https://media.tenor.com/dJKLZ4whAEkAAAAM/kirby-dance.gif', text: 'punchi punchi' },
        { url: 'https://media.tenor.com/uavsYC3JN08AAAAM/kirby-dancing-in-snow-kirby-right-back-at-ya.gif', text: 'Kirby en la nieve ☃' },
        { url: 'https://media.tenor.com/u-k8O4g13pYAAAAM/kirby-dance.gif', text: '3 Kirbys sincronizados :0' },
        { url: 'https://media.tenor.com/1i8-xMxJNa4AAAAM/kirby-happy-kirby.gif', text: 'jeje Kirby feli :D iiiih' },
        { url: 'https://media.tenor.com/olRQ2QnTqxQAAAAi/kirby-dance.gif', text: 'Kirby bailarín?)' },
        { url: 'https://i.pinimg.com/originals/94/0c/03/940c03b1a97be8d536bbb19c967c9e15.gif', text: 'se estampo el loco' },
{ url: 'https://i.pinimg.com/originals/d4/9b/b1/d49bb1b75758d298d2e80a91d475fcf5.gif', text: 'uy este se colo jeje' },
{ url: 'https://i.pinimg.com/originals/3e/e0/ca/3ee0caca3db9eae16971954e876ed014.gif', text: 'se enojo el loco' },
{ url: 'https://i.pinimg.com/originals/f6/59/3c/f6593c88021c092dcf9938eb66274f5d.gif', text: 'ñom' },
{ url: 'https://i.pinimg.com/originals/14/ea/ca/14eaca58765b2d74f834a9ea9863ed39.gif', text: 'ñom x2' },
{ url: 'https://i.pinimg.com/originals/7b/d3/bf/7bd3bf2a550ec887774fd7f95ddebcf1.gif', text: ':D' },
{ url: 'https://i.pinimg.com/originals/bd/ca/ff/bdcaff3db7738538e92e78f642da18fa.gif', text: ':D' },
{ url: 'https://i.pinimg.com/originals/01/63/dc/0163dc30a7b4579c5334c73b1837989d.gif', text: 'zZz' },
{ url: 'https://i.pinimg.com/736x/eb/32/50/eb3250fae5958bfee8eba19489054185.jpg', text: ':' },
{ url: 'https://i.pinimg.com/originals/f0/a2/9c/f0a29cdf526f683c97ff063023a9052b.gif', text: 'gurditu flotando' },
{ url: 'https://i.pinimg.com/originals/1f/21/de/1f21de630c06575d42cd25110cce58e5.gif', text: 'ñom x3' }
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
