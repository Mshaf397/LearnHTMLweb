let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

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

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = () => deleteIdea(idea.id);

        ideaCard.appendChild(ideaTitle);
        ideaCard.appendChild(ideaTags);
        ideaCard.appendChild(editButton);
        ideaCard.appendChild(deleteButton);

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
    saveIdeas();
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

function deleteIdea(id) {
    ideas = ideas.filter(idea => idea.id !== id);
    saveIdeas();
    displayIdeas(ideas);
}

function saveIdeas() {
    localStorage.setItem("ideas", JSON.stringify(ideas));
}

displayIdeas(ideas);