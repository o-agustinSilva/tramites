import express, { request } from "express";
import cors from "cors";

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
      notification_url: "https://554c-179-62-75-20.ngrok-free.app/webhook",
    };
>>>>>>> 2cccfbf15b5eb644739077470784cd26d71f1527

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
  console.log(body);

  if (body.data && body.data.id) {
    try {
      // Asegúrate de usar await aquí si .get() retorna una promesa
      const payment = await new Payment(client).get({ id: body.data.id });
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
