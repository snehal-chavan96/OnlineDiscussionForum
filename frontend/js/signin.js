document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic client-side validation (optional but recommended)
    if (!email || !password) {
        alert("Email and password are required.");
        return;
    }

    const data = {
        email: email,
        password: password
    };

    fetch('http://127.0.0.1:5000/auth/signin', {  // Replace with your Flask endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {throw new Error(err.message)});
        }
        return response.json();
    })
    .then(result => {
        if (result.success) {
            document.getElementById('signup-message').style.color = 'green';
            document.getElementById('signup-message').textContent = "Login successful!";
            setTimeout(() => {
                window.location.href = "dashboard.html"; // Redirect to dashboard
            }, 2000);
        } else {
            document.getElementById('signup-message').textContent = result.message || "Signup failed.";
        }
    })
    .catch(error => {
        console.error('Sign in Error:', error);
        alert("An error occurred during sign in: " + error.message);
    });
});