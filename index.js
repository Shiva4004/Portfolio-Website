document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect
    const typewriterText = document.querySelector('.typewriter');
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();

    // Load featured projects
    const projectGrid = document.querySelector('.project-grid');
    const projectsRef = firebase.database().ref('projects').limitToFirst(3);

    projectsRef.on('value', (snapshot) => {
        projectGrid.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const project = childSnapshot.val();
            const projectCard = createProjectCard(project);
            projectGrid.appendChild(projectCard);
        });
    });

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image" style="background-image: url('${project.image}');"></div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" class="project-link" target="_blank">View Project</a>
            </div>
        `;
        return card;
    }

    // Load top skills
    const skillsContainer = document.querySelector('.skills-container');
    const skillsRef = firebase.database().ref('skills').limitToFirst(4);

    skillsRef.on('value', (snapshot) => {
        skillsContainer.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const skill = childSnapshot.val();
            const skillItem = createSkillItem(skill);
            skillsContainer.appendChild(skillItem);
        });
    });

    function createSkillItem(skill) {
        const item = document.createElement('div');
        item.className = 'skill-item';
        item.innerHTML = `
            <svg class="circle-progress" width="100" height="100" viewBox="0 0 100 100">
                <circle class="circle-bg" cx="50" cy="50" r="45"></circle>
                <circle class="circle-fill" cx="50" cy="50" r="45"></circle>
            </svg>
            <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.percentage}%</span>
            </div>
        `;
        return item;
    }
});