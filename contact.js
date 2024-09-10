document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const messagesRef = firebase.database().ref('messages');
        const newMessageRef = messagesRef.push();

        newMessageRef.set({
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
            alert('Message sent successfully!');
            contactForm.reset();
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again.');
        });
    });

    // Add floating label effect
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        input.addEventListener('focus', () => {
            label.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                label.classList.remove('active');
            }
        });
    });
});
