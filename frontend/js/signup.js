document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Input Validation
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    if (password !== confirmPassword) {
        document.getElementById('signup-message').textContent = "Passwords do not match!";
        return;
    }

    // Get Form Data
    const formData = new FormData(this);

    // Collect interests manually (fixes getAll() issue)
    const interests = [];
    document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
        interests.push(checkbox.value);
    });

    // Convert to JSON
    const data = {};
    for (let [key, value] of formData.entries()) {
        if (key !== 'interests') data[key] = value; // Exclude interests from normal formData
    }
    data['interests'] = interests;

    // Send data to Flask backend
    fetch('http://127.0.0.1:5000/auth/signup', {  // Ensure correct backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            document.getElementById('signup-message').style.color = 'green';
            document.getElementById('signup-message').textContent = "Signup successful!";
            setTimeout(() => {
                window.location.href = "signin.html"; // Redirect to dashboard
            }, 2000);
        } else {
            document.getElementById('signup-message').textContent = result.message || "Signup failed.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('signup-message').textContent = "An error occurred during signup.";
    });
});
