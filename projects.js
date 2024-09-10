document.addEventListener('DOMContentLoaded', function() {
    const projectContainer = document.getElementById('project-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsRef = firebase.database().ref('projects');

    let projects = [];

    projectsRef.on('value', (snapshot) => {
        projects = [];
        snapshot.forEach((childSnapshot) => {
            projects.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        renderProjects('all');
    });

    function renderProjects(filter) {
        projectContainer.innerHTML = '';
        const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);
        
        filteredProjects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectContainer.appendChild(projectCard);
        });
    }

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image" style="background-image: url('${project.image}');"></div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-link" target="_blank">View Project</a>
            </div>
        `;
        return card;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProjects(button.getAttribute('data-filter'));
        });
    });
});
