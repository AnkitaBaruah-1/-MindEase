document.addEventListener('DOMContentLoaded', function () {
    const newEntryBtn = document.getElementById('newEntryBtn');
    const journalModal = document.getElementById('journalModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveEntryBtn = document.getElementById('saveEntryBtn');
    const deleteEntryBtn = document.getElementById('deleteEntryBtn');
    const editEntryBtn = document.getElementById('editEntryBtn');
    const journalTextArea = document.getElementById('journalTextArea');
    const entryTitle = document.getElementById('entryTitle');
    const moodSelect = document.getElementById('moodSelect');
    const wordCount = document.getElementById('wordCount');
    const entryDate = document.getElementById('entryDate');
    const entriesContainer = document.getElementById('entries-container');

    let currentEntry = null;
    let entries = JSON.parse(localStorage.getItem('entries')) || [];


    function displayEntries() {
        entriesContainer.innerHTML = '';
        entries.forEach(entry => {
            const entryCard = document.createElement('div');
            entryCard.classList.add('entry-card');

            entryCard.innerHTML = `
                <div class="entry-header">
                    <span class="entry-title">${entry.title}</span>
                    <span class="entry-date">${entry.date}</span>
                </div>
                <div class="entry-text">${entry.text}</div>
                <div class="edit-delete-buttons">
                    <button class="edit-btn" onclick="editEntry(${entry.id})"><i class="fa fa-edit"></i> Edit</button>
                    <button class="delete-btn" onclick="deleteEntry(${entry.id})"><i class="fa fa-trash"></i> Delete</button>
                </div>
            `;

            entriesContainer.appendChild(entryCard);
        });
    }


    saveEntryBtn.addEventListener('click', function () {
        const title = entryTitle.value;
        const mood = moodSelect.value;
        const text = journalTextArea.value;
        const date = new Date().toLocaleDateString();

        if (!title || !text) {
            alert('Title and text are required!');
            return;
        }

        const entry = {
            title,
            mood,
            text,
            date,
            id: new Date().getTime() 
        };

        if (currentEntry) {
        
            entries = entries.map(e => e.id === currentEntry.id ? entry : e);
            alert('Entry updated successfully!');
        } else {
        
            entries.push(entry);
        }

        localStorage.setItem('entries', JSON.stringify(entries)); 
        displayEntries(); 
        journalModal.style.display = 'none';
    });

    
    deleteEntryBtn.addEventListener('click', function () {
        if (currentEntry) {
            entries = entries.filter(entry => entry.id !== currentEntry.id);
            localStorage.setItem('entries', JSON.stringify(entries)); 
            alert('Entry deleted!');
            displayEntries(); 
            journalModal.style.display = 'none';
        }
    });


    editEntryBtn.addEventListener('click', function () {
        if (currentEntry) {
            entryTitle.value = currentEntry.title;
            journalTextArea.value = currentEntry.text;
            moodSelect.value = currentEntry.mood;
            wordCount.textContent = `Word Count: ${currentEntry.text.trim().split(/\s+/).filter(Boolean).length}`;
            entryDate.textContent = `Date: ${currentEntry.date}`;
            journalModal.style.display = 'flex';
        }
    });

    
    newEntryBtn.addEventListener('click', function () {
        journalModal.style.display = 'flex';
        entryTitle.value = '';
        journalTextArea.value = '';
        moodSelect.value = 'happy';
        wordCount.textContent = 'Word Count: 0';
        entryDate.textContent = `Date: ${new Date().toLocaleDateString()}`;
        currentEntry = null;
    });

    
    closeModalBtn.addEventListener('click', function () {
        journalModal.style.display = 'none';
    });

    
    journalTextArea.addEventListener('input', function () {
        const text = journalTextArea.value;
        const words = text.trim().split(/\s+/).filter(Boolean);
        wordCount.textContent = `Word Count: ${words.length}`;
    });

        displayEntries();

        window.editEntry = function (id) {
        currentEntry = entries.find(entry => entry.id === id);
        entryTitle.value = currentEntry.title;
        journalTextArea.value = currentEntry.text;
        moodSelect.value = currentEntry.mood;
        wordCount.textContent = `Word Count: ${currentEntry.text.trim().split(/\s+/).filter(Boolean).length}`;
        entryDate.textContent = `Date: ${currentEntry.date}`;
        journalModal.style.display = 'flex';
    };

    
    window.deleteEntry = function (id) {
        entries = entries.filter(entry => entry.id !== id);
        localStorage.setItem('entries', JSON.stringify(entries)); 
        displayEntries(); 
    };
});

function saveEntry() {
    const title = document.getElementById("entry-title").value;
    const mood = document.getElementById("entry-mood").value;
    const content = document.getElementById("entry-content").value;

    if (!content.trim()) {
        alert("Entry content cannot be empty!");
        return;
    }

    
    const newEntry = {
        id: Date.now(), 
        title: title || "Untitled",
        mood: mood || "Neutral",
        content: content,
        timestamp: Date.now() 
    };


    const existingEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    
    existingEntries.push(newEntry);

    
    localStorage.setItem("journalEntries", JSON.stringify(existingEntries));

    
    displayEntries();

    
    document.getElementById("entry-title").value = "";
    document.getElementById("entry-mood").value = "";
    document.getElementById("entry-content").value = "";
}

function displayEntries() {
    const entriesContainer = document.getElementById("entries-container");
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    
    const sortedEntries = entries.sort((a, b) => b.timestamp - a.timestamp);

    
    entriesContainer.innerHTML = "";

    
    sortedEntries.forEach((entry) => {
        const entryElement = document.createElement("div");
        entryElement.className = "entry-card";

        entryElement.innerHTML = `
            <div class="entry-header">
                <h3>${entry.title}</h3>
                <p>${new Date(entry.timestamp).toLocaleDateString()} ${new Date(entry.timestamp).toLocaleTimeString()}</p>
                <p>Mood: ${entry.mood}</p>
            </div>
            <div class="entry-content">
                <p>${entry.content}</p>
            </div>
            <div class="entry-actions">
                <button class="edit-btn" onclick="editEntry(${entry.id})">Edit</button>
                <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button>
            </div>
        `;
        entriesContainer.appendChild(entryElement);
    });
}
