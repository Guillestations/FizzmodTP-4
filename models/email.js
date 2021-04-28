const mailer = require("nodemailer");
const fs = require("fs");

if (!fs.existsSync('correo.dat')) {
    fs.writeFileSync('correo.dat', 'guillejuanmanuel@gmail.com');
    console.log('correo configurado')
}

function enviarEmail (arrayProductos, callback) {

  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "guille1.dev@gmail.com",
      pass: "$diez_bumedo21"
    }
  });
  //console.log(transporter);
  //console.log(arrayProductos);

  let productos = [];
  arrayProductos.forEach((element) => {
    productos += `
        <tr>
            <td>${element.nombre}</td>
            <td>$${element.precio}</td>
            <td>${element.descripcion}</td>
            <td>
                <img src=${element.img} width="50" alt=${element.nombre}/>
            </td>
        </tr> 
        
        `;
  });

  
 fs.readFile("correo.dat", "utf-8",(error,email)=>{
      if(error){
          throw new Error('No se pudo leer el email',error)
      }

      console.log('deberia salir el email:',email);
      const mailOptions = {
        from: "guille1.dev@gmail.com",
        to: email,
        subject: "Lista de con los ultimos 10 productos actulizados",
        html: `<head>
        <style>
            .dev{
                text-align: center;
                color: #fff;
                background: cornflowerblue;
            }
            td{
                text-aling: center;
                margin: 2px;
            }
            th{
                background: rgba(151, 141, 238, 0.74);
                 color: #fff;
            }
            img{
            height: 50px;
            }
        </style>
    </head>
    <body>
        <div class="dev">
            <h1>Lista de Productos</h1>
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripcion</th>
                    <th>Imagen</th>
                </tr>
                    ${productos}
                </table>
        </div>
    </body>
    `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Aqui ocurre el pinche", error);
          callback(error);
        }
        console.log(info);
      });
  });
  //console.log(productos);
};

module.exports = enviarEmail;


