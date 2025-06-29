const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.CONTACT_PASSWORD
  }
});

const sendBookingConfirmation = async (booking, user, service) => {
  const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to: user.email,
    subject: 'Bekræftelse af booking',
    text: `Hej ${user.name},\n\nVi har modtaget din booking:\n\nService: ${service.name}\nAfleveringsdato: ${booking.drop_off_date}\nAfhentningsdato: ${booking.pick_up_date}\n\nTak fordi du bookede hos os!\n\nMed venlig hilsen\nMinut Rens`
  };

  await transporter.sendMail(mailOptions);
};

const SendReadyMail = async (booking, user, service) => {
const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to: user.email,
    subject: 'Booking klar til afhentning',
    text: `Hej ${user.name},\n\nDin booking er nu klar til at blive afhentet:\n\nService: ${service.name}\nAfleveringsdato: ${booking.drop_off_date}\nAfhentningsdato: ${booking.pick_up_date}\n\nTak fordi du bookede hos os!\n\nMed venlig hilsen\nMinut Rens`
  };

  await transporter.sendMail(mailOptions);
};

const sendContactMessage = async (contact) => {

    if (!contact.name || !contact.email || !contact.message) {
      return res.status(400).json({ error: 'Alle felter er påkrævet' });
    }

    const mailOptions = {
      from: contact.email,
      to: process.env.CONTACT_EMAIL,
      subject: 'Ny kontaktbesked fra Minut Rens',
      text: `Fra: ${contact.name}\nEmail: ${contact.email}\n\n${contact.message}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendBookingConfirmation,
    SendReadyMail,
    sendContactMessage
};