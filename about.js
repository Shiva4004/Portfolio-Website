document.addEventListener('DOMContentLoaded', function() {
    // Animate stats
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const updateCount = () => {
            const increment = target / 200;
            if(count < target) {
                count += increment;
                stat.innerText = Math.ceil(count);
                setTimeout(updateCount, 10);
            } else {
                stat.innerText = target;
            }
        };
        updateCount();
    });

    // Load about content from Firebase (optional)
    const aboutContentRef = firebase.database().ref('about');
    const aboutTextElement = document.querySelector('.about-text');

    aboutContentRef.once('value').then((snapshot) => {
        const aboutContent = snapshot.val();
        if (aboutContent) {
            aboutTextElement.innerHTML = aboutContent.text;
        }
    });
});
