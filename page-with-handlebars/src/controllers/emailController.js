import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const email_address = process.env.EMAIL_USER;
const email_pass = process.env.EMAIL_PASS;

// Função para enviar o e-mail
export const sendEmail = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Configuração do transporte de e-mail com nodemailer
    const transporter = nodemailer.createTransport({
      host: 'mail.gkult.net', // Substitua pelo host do seu servidor de e-mail
      port: 465,
      secure: true, // Deve ser true se estiver utilizando a porta 465 com SSL/TLS
      auth: {
        user: email_address, // Substitua pelo seu endereço de e-mail
        pass: email_pass // Substitua pela sua senha do e-mail
      }
    });

    // Configuração do e-mail a ser enviado
    const mailOptions = {
      from: email_address, // Utiliza o e-mail fornecido pelo usuário como remetente
      to: email_address, // Endereço de e-mail de destino
      subject: 'Landing Page - Formulário de Contato',
      text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nMensagem: ${message}`
    };

    // Envio do e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado: ' + info.response);

    // Retorna uma resposta JSON indicando sucesso
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });

  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    // Retorna uma resposta JSON indicando erro
    res.status(500).json({ error: 'Erro ao enviar o e-mail' });
  }
};