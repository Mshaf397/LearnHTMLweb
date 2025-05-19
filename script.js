let ideas = [
    { id: 1, title: "Build a synthesizer", tags: ["Music", "Programming"] },
    { id: 2, title: "Write a Torah quiz", tags: ["Chabad", "Education"] },
    { id: 3, title: "Create a fundraiser", tags: ["Personal", "Web Development"] },
    { id: 4, title: "Organize microtonal scales", tags: ["Music", "Web App"] }
];

const ideasContainer = document.getElementById("ideas-container");
const searchInput = document.getElementById("searchInput");
const ideaTitle = document.getElementById("ideaTitle");
const ideaTags = document.getElementById("ideaTags");

let editingIdeaId = null;

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

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editIdea(idea.id);

        ideaCard.appendChild(ideaTitle);
        ideaCard.appendChild(ideaTags);
        ideaCard.appendChild(editButton);

        ideasContainer.appendChild(ideaCard);
    });
}

function searchIdeas() {
    const query = searchInput.value.toLowerCase();
    const filteredIdeas = ideas.filter(idea => 
        idea.title.toLowerCase().includes(query) ||
        idea.tags.some(tag => tag.toLowerCase().includes(query))
    );
    displayIdeas(filteredIdeas);
}

function addIdea() {
    const title = ideaTitle.value.trim();
    const tags = ideaTags.value.trim().split(",").map(tag => tag.trim());

    if (title === "") return;

    if (editingIdeaId) {
        const idea = ideas.find(idea => idea.id === editingIdeaId);
        idea.title = title;
        idea.tags = tags;
        editingIdeaId = null;
    } else {
        const newIdea = {
            id: Date.now(),
            title: title,
            tags: tags
        };
        ideas.push(newIdea);
    }

    ideaTitle.value = "";
    ideaTags.value = "";
    displayIdeas(ideas);
}

function editIdea(id) {
    const idea = ideas.find(idea => idea.id === id);
    if (idea) {
        editingIdeaId = id;
        ideaTitle.value = idea.title;
        ideaTags.value = idea.tags.join(", ");
    }
}

displayIdeas(ideas);