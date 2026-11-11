fetch('students/list.json')
    .then(res => res.json())
    .then(async (studentFiles) => {
        const grid = document.getElementById('profiles-grid');
        for (const file of studentFiles) {
            try {
                const response = await fetch(`students/${file}`);
                const student = await response.json();
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h2>${student.name}</h2>
                    <p>🎯 ${student.role || 'Student'}</p>
                    <div class="links">
                        ${student.links.map(l => `<a href="${l.url}" target="_blank">${l.title}</a>`).join('')}
                    </div>
                `;
                grid.appendChild(card);
            } catch (e) {
                console.error("Failed to load student card:", file);
            }
        }
    });
