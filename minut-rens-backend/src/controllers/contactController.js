const nodemailer = require('nodemailer');

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Valider input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Alle felter er påkrævet' });
    }

    // Konfigurer e-mail afsender
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASSWORD
      }
    });

    // E-mail-indhold
    const mailOptions = {
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: 'Ny kontaktbesked fra Minut Rens',
      text: `Fra: ${name}\nEmail: ${email}\n\n${message}`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Mail sendt' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Serverfejl: Noget gik galt ved afsendelse' });
  }
};

module.exports = {
  sendContactMessage
};