function abrirSelectorCartas() {
    Swal.fire({
        title: '✨ ABRIR CUANDO... ✨',
        html: `

        <p class="subtitulo-cartas">No vale leerlo por leerlo, abrilo cuando realmente te sientas así... :)</p>
            <div class="contenedor-sobres">
                <div class="sobre" onclick="abrirMensaje('feliz')"><span>Estés feliz 😊</span></div>
                <div class="sobre" onclick="abrirMensaje('triste')"><span>Estés triste 🥺</span></div>
                <div class="sobre" onclick="abrirMensaje('enojada')"><span>Estés enojada 😤</span></div>
                <div class="sobre" onclick="abrirMensaje('pelea')"><span>Nos minipeleamos 🤏</span></div>
                <div class="sobre" onclick="abrirMensaje('extrañes')"><span>Me extrañes 🫂</span></div>
                <div class="sobre" onclick="abrirMensaje('abrazo')"><span>Necesites un abrazo ✨</span></div>
            </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: '850px',
        background: '#1a1a2e',
        customClass: { popup: 'popup-abrir-cuando' }
    });
}

function abrirMensaje(tipo) {
    let titulo = "";
    let mensaje = "";

    switch(tipo) {
        case 'feliz':
            titulo = "Abrir cuando estés feliz 😊";
            mensaje = "No se que te puedo decir de más si ya estás feliz, pero me alegro mucho por lo que sea, espero que puedas estar más feliz todavía y que dure muchito, amennn. Anda a darle besitos a los gatitusss.";
            break;
        case 'triste':
            titulo = "Abrir cuando estés triste 🥺";
            mensaje = "Sea lo que sea que esté pasando, ya va a pasar, todo tiene solución menos la muerte, pero solo queda seguir adelante, tenés a tu familia que te quiere mucho, y me tenés a mi que te amo, yo voy a estar para vos siempre pase lo que pase. Esto es un obstaculito más que te pone la vida, pero nada que no puedas superar, sos la mejor!!!";
            break;
        case 'enojada':
            titulo = "Abrir cuando estés enojada 😤";
            mensaje = "Seguramente quieras matar a alguien, o ignorar a todo el mundo y pegarles, pero.... no es la solución pero al mismo tiempo si jeje, sea lo que sea en este caso, no vale la pena volverse loca por ese algo que te hace sentir enojada, va a pasar el enojo eventualmente... pero no te la agarres con las personas que te quieren muchito, tratá de ir y abrazarlos para relajarte, abrazar a tus gatitos, darle mimitos en la panza a nobaraa, salir a pasear un ratitooo. Todo enojo pasa rapiditoooo...";
            break;
        case 'pelea':
            titulo = "Abrir cuando nos minipeleamos... nuuu";
            mensaje = `Ohno, llegamos a esta cartita nuuu, bueno quiero que sepás, no se que habré hecho ahora, pero soy hombre lamentablente, y al ser medio tonto y colgado suelen pasar estas cositas... quiero que sepas que lo que haya hecho no fue aproposito, o con animos de hacerte enojar... 
si nos peleamos y lees esto, te vas a enojar más.... jeje...
No creo que tenga que decirlo de mi lado de que yo me enoje con vos... porque es poco probable que me enoje con vos, es más probable que vos te enojes conmigo y me bloquees, jeje enojonaaaaa deau. 

Pero perdonamee D,:`;
            break;
        case 'extrañes':
            titulo = "Abrir cuando me extrañes 🫂";
            mensaje = "jeje ahi voy entonces deau, no puedo estar ahí con vos, pero si me mandas un mensajito voy a aparecer en un segundo si no estoy ocupado o peleando contra algun golsito por ahí...";
            break;
        case 'abrazo':
            titulo = "Abrir cuando necesites un abrazo ✨";
            mensaje = `cuando necesites un abrazito, me avisas y voy a dartelo, y al abrazito también... AAA chiste le sacaba todo lo bonito re tonto deau.
Y si no puedo ir, agarra el peluchito y abrazalo, yo seguramente sienta el abrazitoo jeje muaaa`;
            break;
    }

    Swal.fire({
        title: titulo,
        text: mensaje,
        confirmButtonText: 'Te amo 💜',
        buttonsStyling: false,
        customClass: {
            popup: 'popup-mensaje-carta',
            confirmButton: 'boton-carta-confirm',
            title: 'titulo-mensaje-carta',
            htmlContainer: 'texto-mensaje-carta'
        }
    });
}