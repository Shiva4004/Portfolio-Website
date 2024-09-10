document.addEventListener('DOMContentLoaded', function() {
    const skillsContainer = document.querySelector('.skills-container');
    const skillsRef = firebase.database().ref('skills');

    skillsRef.on('value', (snapshot) => {
        skillsContainer.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const skill = childSnapshot.val();
            const skillItem = createSkillItem(skill);
            skillsContainer.appendChild(skillItem);
        });
        animateSkills();
    });

    function createSkillItem(skill) {
        const item = document.createElement('div');
        item.className = 'skill-item';
        item.innerHTML = `
            <svg class="circle-progress" width="150" height="150" viewBox="0 0 150 150">
                <circle class="circle-bg" cx="75" cy="75" r="70"></circle>
                <circle class="circle-fill" cx="75" cy="75" r="70"></circle>
            </svg>
            <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.percentage}%</span>
            </div>
        `;
        return item;
    }

    function animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(skill => {
            const circle = skill.querySelector('.circle-fill');
            const percentage = skill.querySelector('.skill-percentage').textContent;
            const percentageValue = parseInt(percentage);
            const circumference = 2 * Math.PI * 70;
            const offset = circumference - (percentageValue / 100 * circumference);
            
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;

            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 100);
        });
    }
});
