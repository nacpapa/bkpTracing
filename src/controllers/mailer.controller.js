import bkp from "../models/Bkp";
import { _client_id, _client_secret, _REFRESH_TOKEN, _user } from "../config";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

async function countStatus() {
  let statuses = [];
  const correctos = await bkp.countDocuments({ status: "Correcto" });
  const fallidos = await bkp.countDocuments({ status: "Fallido" });
  const enRevision = await bkp.countDocuments({ status: "En revision" });
  statuses.push(correctos, fallidos, enRevision);
  return statuses;
}
export const sendStatusMail = async (req, res) => {
  countStatus().then((val) => {
    let statuses = val;
    const contentHTML =
      `
      <h1>Resumen de respaldos</h1>
      <p>Respaldos actualizados al dia de hoy</p>
          <ul>
          <li style="color:#CC0000" >
              <h3>Respaldos fallidos: ` +
      statuses[1] +
      `</h3>
          </li>
          <li style="color:#cc6100" >
              <h3>Respaldos en revision: ` +
      statuses[2] +
      ` </h3>
          </li>
          <li style="color:#008f39">
              <h3>Respaldos correctos: ` +
      statuses[0] +
      `  </h3>
          </li>
          </ul>`;

    const client_id = _client_id;
    const client_secret = _client_secret;
    const redirect_uri = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = _REFRESH_TOKEN;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uri
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    async function sendMail() {
      try {
        const access_Token = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: _user,
            clientId: client_id,
            clientSecret: client_secret,
            refreshToken: REFRESH_TOKEN,
            accessToken: access_Token,
          },
        });
        const mailOptions = {
          from: "BKP tracing",
          to: "ignacioagustin020@gmail.com",
          subject: "BKP tracing",
          html: contentHTML,
        };
        const result = await transporter.sendMail(mailOptions);
        return result;
      } catch (err) {
        console.log(err);
      }
    }
    sendMail()
      .then((result) => {
        res.status(200).redirect("/");
        console.log("Correo enviado");
      })
      .catch((er) => console.log(error.message));
  });
};
