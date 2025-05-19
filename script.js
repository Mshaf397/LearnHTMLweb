const ideas = [
    { title: "Build a synthesizer", tags: ["Music", "Programming"] },
    { title: "Write a Torah quiz", tags: ["Chabad", "Education"] },
    { title: "Create a fundraiser", tags: ["Personal", "Web Development"] },
    { title: "Organize microtonal scales", tags: ["Music", "Web App"] }
];

const ideasContainer = document.getElementById("ideas-container");

function displayIdeas(filteredIdeas) {
    ideasContainer.innerHTML = "";
    filteredIdeas.forEach(idea => {
        const ideaCard = document.createElement("div");
        ideaCard.classList.add("idea-card");

        const ideaTitle = document.createElement("h2");
        ideaTitle.textContent = idea.title;

        const ideaTags = document.createElement("p");
        ideaTags.classList.add("idea-tags");
        ideaTags.textContent = `Tags: ${idea.tags.join(", ")}`;

        ideaCard.appendChild(ideaTitle);
        ideaCard.appendChild(ideaTags);
        ideasContainer.appendChild(ideaCard);
    });
}

function searchIdeas() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredIdeas = ideas.filter(idea => 
        idea.title.toLowerCase().includes(query) ||
        idea.tags.some(tag => tag.toLowerCase().includes(query))
    );
    displayIdeas(filteredIdeas);
}

displayIdeas(ideas);