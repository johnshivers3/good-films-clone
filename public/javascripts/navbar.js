window.addEventListener("DOMContentLoaded", (event) => {
  const demoButton = document.getElementById('demo-user');
  if (demoButton) {
    demoButton.addEventListener('click', async (event) => {
      // event.preventDefault()

      const token = document.getElementById('csrf').value

      await fetch(`/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailAddress: 'demo@demo.com',
          password: 'Password1!',
          _csrf: token
        })
      })

      window.location = '/'

    })

  }
})