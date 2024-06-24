document.getElementById('contactForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, message })
    });

    if (response.ok) {
      document.getElementById('submitSuccessMessage').classList.remove('d-none');
      document.getElementById('submitErrorMessage').classList.add('d-none');
      
    } else {
      throw new Error('Erro ao enviar o e-mail');
    }
  } catch (error) {
    document.getElementById('submitSuccessMessage').classList.add('d-none');
    document.getElementById('submitErrorMessage').classList.remove('d-none');
  }
});
