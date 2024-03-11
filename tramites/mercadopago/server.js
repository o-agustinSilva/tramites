import express from "express";
import cors from "cors";

// SDK MP
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "TEST-7478389759740845-030218-965f7445b00fdce215fddaf993840150-177838098",
})

const customization = {
    texts: {
      action: 'buy',
      valueProp: 'security_details',
    },
   }
   
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
    res.send("El servidor de MercadoPago anda de 10!");
});

app.post("/create_preference", async (req, res) => {
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
                success: "http://localhost:5173",
                failure: "http://localhost:5173/requestTramite/5",
                pending: "http://localhost:5173/dashboard",
            },
            auto_return: "approved",
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
 
app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
})