const nodemailer =  require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: false, // si usa SSL
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false // solo en desarrollo
    }
});


module.exports = async function(cualNotificacion, informacion, mensaje) {
    //Notificacion
    // 0. Notificacion de cliente mayorista 

    try {
        await transporter.verify();
        console.log('transporter is verify');

        let notificaciones = [
            {
                subject: 'Solicitud Mayorista - Magia',
                titulo: 'Solicitud Mayorista - Magia',
                text: `Hay una persona interesada en ser cliente mayorista, te adjuntamos los datos para que te contactes lo mas rapido posible`,
                info: []
            },
            
    
        ]

        //Plantillas de correos

        let mensajeHtmlSolicitudMayorista = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <style>
        
                *{
                    margin: 0px;
                    padding: 0px;
                    box-sizing: border-box;
                    border: none;
                    color: '#d95a4d'
                }

                .contenedorNotificacion h1 {
                    margin-bottom: 1rem;
                    font-size: 22px;
                }
        
                body{
                    font-family: 'Inter';
                    background-color: #FFF;
                    width: 70%;
                    background-color: #D0D3D8 ;
                    overflow-x: hidden;
                    font-weight: 300;
                    display: 'block';
                    
                }
        
                .b {
                    font-weight: bold;
                }

                #BGBlueIDS {
                    background-color:#D95A4D;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 0.5rem 2rem
                }
        
                .contMail {
                    width: 100%;
                    background-color: #fffafa;
                    display:block;
                    justify-content: center;
                    align-items: center;
                    height: fit-content;
                }
        
                .logoMail {
                    width: 150px;
                }
        
                .contenedorNotificacion {
                    width: 100%;
                    height: auto;
                    padding: 1rem 2rem;
                    gap: 0.5rem;
                    display: block;
                    justify-content: center;
                    align-items: flex-start;
                }
        
                .contenedorNotificacionC {
                    width: 80%;
                    height: auto;
                    padding: 1rem 2rem;
                    text-align: center;
                    display: block;
                    justify-content: left;
                    align-items: center;
                }
        
                .contenedorNotificacionC a {
                    text-align: center;
                    overflow: auto;
                    display: block;
                    justify-content: center;
                    align-items: center;
                    background-color: #14213D;
                    width: 15rem;
                    color: white;
                    height: auto;
                    padding: 0.5rem 1rem;
                    text-decoration: none;
                }
        
                footer {
                    font-family: 'Inter';
                    background-color: #FFF;
                    width: 100%;
                    background-color: #D0D3D8 ;
                    overflow-x: hidden;
                    font-weight: 300;
                    border-top: 1px solid #D0D3D8;
                }
        
                .contFo {
                    width: 100%;
                    background-color: rgb(245, 244, 244);
                    display: block;
                    justify-content: center;
                    align-items: center;
                    height: fit-content;
                    padding: 1.5rem;
                }
        
                .contFo p {
                    width: 80%;
                }
        
                .contFo a {
                    display: inherit;
                    overflow: hidden;
                    width: 80%;
                }
        
                .contGen {
                    width: 100%;
                }

                .flexRow {
                    width:100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 1rem;
                }

                .infoP {
                    margin-left: 0.3rem
                }
        
            </style>
        </head>
        <body>
            <div class="contMail">
                <div class="" id='BGBlueIDS'>
                    <img class="logoMail" src="cid:logoMagia" alt="">
                </div>
                
                <div class="contenedorNotificacion">
                    <h1>Hola Magia!</h1>
                    <p>${notificaciones[cualNotificacion].text}</p>
                </div>

                <div class="contenedorNotificacion">
                    <div class='flexRow'>
                        <p>Nombre:</p>
                        <p class="infoP">${informacion.nombre}</p>
                    </div>
                    <div class='flexRow'>
                        <p>País:</p>
                        <p class="infoP">${informacion.pais}</p>
                    </div>
                    <div class='flexRow'>
                        <p>Ciudad: </p>
                        <p class="infoP">${informacion.ciudad}</p>
                    </div>
                    <div class='flexRow'>
                        <p>Telefono: </p>
                        <p class="infoP">${informacion.numero}</p>
                    </div>
                    <div class='flexRow'>
                        <p>Correo Electrónico: </p>
                        <p class="infoP">${informacion.correo}</p>
                    </div>
                    <div class='flexRow'>
                        <p>Mensaje: </p>
                        <p class="infoP">${informacion.msg}</p>
                    </div>
                </div>
        
                <div class="contenedorNotificacion">
                    
                    <h4>Soporte Magia.</h4>
                    
                </div>
                
            </div>
        </body>
    
        </html>`;


        // Array de plantillas
        let arrayDePlantillas = [mensajeHtmlSolicitudMayorista]

        //Enviar correo
        transporter.verify().then(console.log).catch(console.error);
        transporter.sendMail({
            from: 'Soporte - Magia',
            to: "amorcompletomagia@gmail.com",
            subject: notificaciones[cualNotificacion].subject,
            text: notificaciones[cualNotificacion].text,
            html: arrayDePlantillas[cualNotificacion],
            attachments: [ // Archivos adjuntado
                {
                    filename: 'LOGO_CIRCULAR_BLANCO.png', //nombre
                    path: 'public/images/LOGO_CIRCULAR_BLANCO.png', // ruta
                    cid: 'logoMagia'  // nombre que lleva el src en html en un correo electronico (como se encuentra la ruta)
                }
            ]
        })
        .then((info) => {
            console.log('Correo electrónico enviado:',info);
        })
        .catch((err) => {
            console.error('Error al enviar el correo electrónico',err);
        })

    } catch (err) {
        console.log(err);
    }

   


    
}