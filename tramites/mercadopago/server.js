import express, { request } from "express";
import cors from "cors";
import axios from "axios";
// Asegúrate de que Payment está importado desde tus modelos

// SDK MP
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-7478389759740845-030218-965f7445b00fdce215fddaf993840150-177838098",
});

const customization = {
  texts: {
    action: "buy",
    valueProp: "security_details",
  },
};

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("El servidor de MercadoPago anda de 10!");
});

app.post("/create_preference", async (req, res) => {
  try {
    const { title, price, quantity } = req.body; 

    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:5173/paymentSuccessful",
        failure: "http://localhost:5173/paymentFailed",
        pending: "http://localhost:5173/dashboard",
      },
      auto_return: "approved",
      notification_url: "https://21c9-179-62-75-20.ngrok-free.app/webhook",
      metadata: {
        
      }
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});


app.post("/webhook", async function (req, res) {
  const body = req.body;


  if (body.data && body.data.id) {
    try {
      // Asegúrate de usar await aquí si .get() retorna una promesa
      const payment = await new Payment(client).get({ id: body.data.id });
      //console.log(payment);

      

      // Extraemos los datos relevantes y los almacenamos en un objeto 'map'
      const paymentInfo = {
        case_id: '0',
        transaction_Id: payment.id,
        transaction_Amount: payment.transaction_amount,
        currency_Id: payment.currency_id,
        status: payment.status,
        status_Detail: payment.status_detail,
        date_Approved: payment.date_approved,
        paymentMethod_Id: payment.payment_method_id,
        cardholder_Name: payment.card.cardholder.name,
        last_Four_Digits: payment.card.last_four_digits,
        payer_Email: payment.payer.email,
        description: payment.description,
      };

      console.log(paymentInfo);
      //console.log(payment);

      // Extraemos el ID del usuario desde los metadatos de la preferencia de pago
      //const userId = payment.metadata.user_id;


      axios.post("http://127.0.0.1:8000/api/payment/", paymentInfo, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        //console.log("Pago registrado en Django:", response.data);
      })
      .catch((error) => {
        console.error("Error al registrar el pago en Django:", error.response ? error.response.data : error.message);
      });
      
      //console.log(paymentInfo);

    } catch (error) {
      console.error("Error al obtener el pago:", error);
    }
  } else {
    console.log("No se encontró 'data' o 'data.id' en el cuerpo del request");
  }

 res.sendStatus(200);  

  
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
