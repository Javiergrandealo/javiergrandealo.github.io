// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Menú de navegación responsive
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animar las barras del menú hamburguesa
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });
    
    // Cerrar el menú al hacer clic en un enlace
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Cambiar el estilo del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 5%';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 5%';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Animación de las barras de habilidades
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Función para animar las barras de habilidades cuando están en el viewport
    function animateSkills() {
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;
        
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            skillLevels.forEach(skill => {
                skill.style.width = skill.style.width || skill.getAttribute('style').split('width:')[1].split(';')[0];
            });
        }
    }
    
    // Llamar a la función al cargar la página y al hacer scroll
    window.addEventListener('scroll', animateSkills);
    animateSkills();
    
    // Filtro de proyectos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.getElementById('projects-grid');
    
    // Datos de proyectos
    const projects = [
        {
            id: 1,
            title: 'Undertale Save Converter for PC/Switch/Vita',
            description: 'Una herramienta para convertir partidas guardadas de Undertale entre PC, Switch y PSVita .',
            image: 'Docs/590f06b45bafe37b970cbcbc.webp?height=200&width=300',
            category: 'game',
            tags: ['Python'],
            codeLink: 'https://github.com/Javiergrandealo/undertale-save-converter'
        },
        {
            id: 2,
            title: 'Extraordinaria TP',
            description: 'Un juego de rol en terminal, hecho en Java como proyecto de primero de carrera.',
            image: 'Docs/TP.jpg?height=200&width=300',
            category: 'game',
            tags: ['Java'],
            codeLink: 'https://github.com/Javiergrandealo/ExtraordinariaTP'
        }
    ];
    
    // Función para cargar proyectos
    function loadProjects(category = 'all') {
        // Limpiar el grid de proyectos
        projectsGrid.innerHTML = '';
        
        // Filtrar proyectos según la categoría seleccionada
        const filteredProjects = category === 'all' 
            ? projects 
            : projects.filter(project => project.category === category);
        
        // Crear y añadir las tarjetas de proyectos
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                <div class="project-img">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.codeLink}" class="project-link" target="_blank"><i class="fab fa-github"></i> Código</a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
    }
    
    // Cargar todos los proyectos al inicio
    loadProjects();
    
    // Añadir event listeners a los botones de filtro
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Quitar la clase active de todos los botones
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Añadir la clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener la categoría del botón
            const category = this.getAttribute('data-filter');
            
            // Cargar los proyectos filtrados
            loadProjects(category);
        });
    });
});