function mostrarMensajeAmor() {
    const mensajes = [
        "Faltan palabras, expresiones para describir todo lo que sos para mi, y no puedo poner todo en estos mensajitos, porque sino tambien voy a romper el script, asi que te voy a poner cosas bonitas",
        "Sos muy bonita, muy preciosa, muy lindaaaaaa aaaaaaaaaa sos mi chiquititita hermosa",
        "Enojona.",
        "Sos mi media mandarina jeje deau",
        "Tenés que dejar de ser tan dura con vos misma.... tenés que aceptar todo lo bonito que te digo, y tenés que aceptar que sos preciosa y bonita y linda y especial y unica e irremplazable, deau ponia una banda de y, pero si SOS LA MEJOR TE AMU",
        "jeje te amooo",
        "wiu wiu wiu, tengo que poner más mensajitos asi tocas y tocas y tocas",
        "Sos una excelente persona, y estoy re feliz de tenerte en mi vida, por qué suena como IA esto wtf, lo escribí YO AAAAAA",
        "Tenés unos ojitos muy lindos, unos ojitos totalmente expresivos, unos ojitos en los que caigo profundamente cuando los veo y no puedo dejar de mirarlos, unos ojitos que me transmiten paz, amor, felicidad y... y.... muchas ganas de darte besitos jeje",
        "Cada ratito que paso con vos es algo que amo muchito, no importa si es mucho o poco tiempo, y si hacemos o no hacemos algo, ya tu presencia me hace el diaaaaaa",
        "Gracias por tus hermosos regalitos, tus hermosos detallitos en todo, por esos mimitos, esos mensajitos,  por tu paciencia y por tu amorrrr",
        "Sos el 'BTS' de mi vida: mi mejor ritmo (TOTALMENTE IDEA DE GEMINI PERDON (EL UNICO QUE HICE CON IA))",
        "Amo tu forma de ser, tu risa, tu mirada... todo de vooosss aaaaaaaaaaaa",
        "Sos mi persona favorita de todos los multiversos jeje",
        "Jijo",
        "MUA",
        "Wachina",
        "Sos mi 00:00 de cada día )? (en mi cabeza sonaba mejor, chau)",
        "Que loco pensar que sos en lo primero en lo que pienso cuando me despierto, y en lo último antes de irme a dormir jeje",
        "Como vas a morder un PRIME y sacarte una foto JAJAJA",
        "JUPDATE AJSDJASKDJAS",
        "Algo que me encanta de vos, es cuando me mandas audios dormidita, AMO PERO AMO ESOS AUDIOS AAAAAAAAAA",
        "Obviamente molestarte es parte de mi forma de demostrate amor, pero si no te pongo cositas para molestarte significa que no te quiero lo suficiente jeje, asi que preparate para cosas bonitas y para bullying....",
        "Este va a estar colado aca, pero me arrepiento de no haber puesto un boton de chistes malos, ahi deberia poner tus chist- 🗣 DEAAAAU",
        "Te quiero más de lo que a Kirby le gusta comer je"
    ];
    
    const mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];
    
    Swal.fire({
        title: 'Un mensajito para Namimi 💝 ',
        text: mensajeAleatorio,
        confirmButtonText: 'Leer otro ❤️',
        buttonsStyling: false,
        customClass: {
            popup: 'amor-popup', // Clase nueva para estilo romántico
            confirmButton: 'amor-button-confirm',
            title: 'amor-title',
            htmlContainer: 'amor-text'
        }
    });
}