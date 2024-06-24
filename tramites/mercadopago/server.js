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
<<<<<<< HEAD
<<<<<<< HEAD
    try{
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
        };
=======
  try {
=======
  try {
    const user_id = req.body.user_id; // Obtén el ID del usuario del cuerpo del request
>>>>>>> e15df53acb4c4f98bac2fe89f8d99524cd771483
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
        success: "http://localhost:5173",
        failure: "http://localhost:5173/requestTramite/5",
        pending: "http://localhost:5173/dashboard",
      },
      auto_return: "approved",
<<<<<<< HEAD
      notification_url: "https://554c-179-62-75-20.ngrok-free.app/webhook",
    };
>>>>>>> 2cccfbf15b5eb644739077470784cd26d71f1527
=======
      notification_url: "https://67cd-168-226-67-185.ngrok-free.app/webhook",
      metadata: {
        user_id: user_id // Incluye el ID del usuario en los metadatos
      }
    };
>>>>>>> e15df53acb4c4f98bac2fe89f8d99524cd771483

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
<<<<<<< HEAD
  console.log(body);
=======
  //console.log(body);
>>>>>>> e15df53acb4c4f98bac2fe89f8d99524cd771483

  if (body.data && body.data.id) {
    try {
      // Asegúrate de usar await aquí si .get() retorna una promesa
      const payment = await new Payment(client).get({ id: body.data.id });
<<<<<<< HEAD
      console.log(payment);

      // Extraemos los datos relevantes y los almacenamos en un objeto 'map'
      const paymentInfo = {
        transactionId: payment.id,
        transactionAmount: payment.transaction_amount,
        currencyId: payment.currency_id,
        status: payment.status,
        statusDetail: payment.status_detail,
        dateApproved: payment.date_approved,
        paymentMethodId: payment.payment_method_id,
        cardholderName: payment.card.cardholder.name,
        lastFourDigits: payment.card.last_four_digits,
        payerEmail: payment.payer.email,
        description: payment.description,
      };

      console.log(paymentInfo);
=======

      console.log(payment);

      // Extraemos el ID del usuario desde los metadatos de la preferencia de pago
      const userId = payment.metadata.user_id;

      // Extraemos los datos relevantes y los almacenamos en un objeto 'map'
      const paymentInfo = {
        user_id:userId,
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

      axios.post("http://127.0.0.1:8000/api/payment/", paymentInfo, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        console.log("Pago registrado en Django:", response.data);
      })
      .catch((error) => {
        console.error("Error al registrar el pago en Django:", error.response ? error.response.data : error.message);
      });
      
      //console.log(paymentInfo);
>>>>>>> e15df53acb4c4f98bac2fe89f8d99524cd771483
    } catch (error) {
      console.error("Error al obtener el pago:", error);
    }
  } else {
    console.log("No se encontró 'data' o 'data.id' en el cuerpo del request");
  }

<<<<<<< HEAD
  res.sendStatus(200);  
=======
  res.sendStatus(200);
>>>>>>> e15df53acb4c4f98bac2fe89f8d99524cd771483
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
