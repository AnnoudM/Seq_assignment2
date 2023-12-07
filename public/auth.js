
import {
  startRegistration,
  startAuthentication,
} from 'https://cdn.skypack.dev/@simplewebauthn/browser';

const btnEl = document.querySelector('#siginBTNpasskeys');
const btnEl2 = document.querySelector('#registerButton');

// Function to handle user registration
export async function register() {
  const username = document.getElementById('username').value;

  try {
    // Fetch registration options from the server
    const optionsRes = await fetch('/register/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const options = await optionsRes.json();

    if (options.error) {
      return alert(options.error);
    }

    // Use @simplewebauthn/browser to start registration
    const attestation = await startRegistration(options);

    // Send attestation response to the server for verification
    const verificationRes = await fetch('/register/finish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        attestationResponse: attestation,
      }),
    });

    const verificationResult = await verificationRes.json();

    alert(`Registration ${verificationResult ? 'successful' : 'failed'}`);
  } catch (error) {
    console.error('Error during registration:', error);
    alert('An error occurred during registration.');
  }
}

// Function to handle WebAuthn-based login
export async function webAuthnLogin() {
  const username = document.getElementById('username').value;

  try {
    // Fetch authentication options from the server
    const optionsRes = await fetch('/login/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const options = await optionsRes.json();

    if (options.error) {
      return alert(options.error);
    }

    // Use @simplewebauthn/browser to start authentication
    const assertion = await startAuthentication(options);

    // Send assertion response to the server for verification
    const verificationRes = await fetch('/login/finish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        assertionResponse: assertion,
      }),
    });

    const verificationResult = await verificationRes.json();

    alert(`Login ${verificationResult ? 'successful' : 'failed'}`);
  } catch (error) {
    console.error('Error during WebAuthn login:', error);
    alert('An error occurred during login.');
  }
}




// Redirect actions
// Attach the webAuthnLogin function to the "Sign in with passkeys" button click event
// document.getElementById('siginBTNpasskeys').addEventListener('click', webAuthnLogin);
console.log('Button Element sign in :', btnEl);
console.log('Button Element sign up :', btnEl2);
// Check if the element exists before adding the event listener
if (btnEl) {
  btnEl.addEventListener('click', webAuthnLogin);
} else {
    console.error('sign in Element not found');
}

if (btnEl2) {
  btnEl2.addEventListener('click', register);
} else {
    console.error('sign up Element not found');
}

document.getElementById('loginButton').addEventListener('click', () => {
  window.location.href = '/auth/google';
});

document.getElementById('loginGithub').addEventListener('click', () => {
  window.location.href = '/auth/github';
});
// btnEl.addEventListener('click',register);
btnEl2.getElementById('registerButton').addEventListener('click', register);
// Attach the register function to the button click event
btnEl2.getElementById('registerButton').addEventListener('click', () => {
  console.log('Register button clicked');
  register();
});
