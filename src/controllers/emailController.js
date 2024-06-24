import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const email_address = process.env.EMAIL_USER;
const email_pass = process.env.EMAIL_PASS;

// Função para enviar o e-mail
const sendEmail = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Verificar se todos os campos estão presentes
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields and captcha are required' });
  }

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

    // Configuração do e-mail a ser enviado para o administrador
    const adminMailOptions = {
      from: email_address,
      to: email_address,
      subject: 'Landing Page - Formulário de Contato',
      html: ` <h3>Mensagem do Site Landing Page</h3>
             <p><strong>Nome:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Telefone:</strong> ${phone}</p>
             <p><strong>Mensagem:</strong> ${message}</p>`
    };

    // Configuração do e-mail de confirmação a ser enviado para o usuário
    const userMailOptions = {
      from: email_address,
      to: email,
      subject: 'Confirmação de Recebimento de Mensagem',
      html: `<p>Olá ${name},</p>
             <p>Obrigado por entrar em contato conosco. Recebemos a sua mensagem e em breve entraremos em contato.</p>
             <p><strong>Sua mensagem:</strong></p>
             <p>${message}</p>
             <p>Atenciosamente,</p>
             <p>Landing Page Team</p>`
    };

    // Envio do e-mail para o administrador
    await transporter.sendMail(adminMailOptions);

    // Envio do e-mail de confirmação para o usuário
    await transporter.sendMail(userMailOptions); 

    // Retorna uma resposta JSON indicando sucesso
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });

  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    // Retorna uma resposta JSON indicando erro
    res.status(500).json({ error: 'Erro ao enviar o e-mail' });
  }
};

export default sendEmail;