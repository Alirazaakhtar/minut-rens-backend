const mailService = require('../services/mailService');

const sendContactMessage = async (req, res) => {
  try {
    mailService.sendContactMessage(req.body);
    res.json({ message: 'Mail sendt' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Serverfejl: Noget gik galt ved afsendelse' });
  }
};

module.exports = {
  sendContactMessage
};