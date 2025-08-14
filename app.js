// This file contains the JavaScript code for the website. 
// It handles interactivity, DOM manipulation, and any client-side logic required for the website's functionality.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Document is ready!');

    // Example of a simple interaction
    const button = document.getElementById('myButton');
    if (button) {
        button.addEventListener('click', () => {
            alert('Button was clicked!');
        });
    }
});

// Team Idea & Issue Tracker Logic with localStorage
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('issue-form');
    const list = document.getElementById('issues-list');
    const STORAGE_KEY = 'teamEntries';

    // Load entries from localStorage or initialize empty array
    let entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let editIndex = null; // Track which entry is being edited

    renderEntries();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const type = document.getElementById('type').value;
        const description = document.getElementById('description').value.trim();

        if (name && type && description) {
            if (editIndex !== null) {
                // Edit mode: update entry
                entries[editIndex] = { name, type, description };
                editIndex = null;
                form.querySelector('button[type="submit"]').textContent = 'Submit';
            } else {
                // Add mode: add new entry
                entries.push({ name, type, description });
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
            renderEntries();
            form.reset();
        }
    });

    function renderEntries() {
        list.innerHTML = '';
        entries.forEach((item, idx) => {
            const li = document.createElement('li');
            li.textContent = `[${item.type}] ${item.name}: ${item.description} `;

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.style.marginLeft = '10px';
            editBtn.onclick = function() {
                document.getElementById('name').value = item.name;
                document.getElementById('type').value = item.type;
                document.getElementById('description').value = item.description;
                editIndex = idx;
                form.querySelector('button[type="submit"]').textContent = 'Update';
            };

            li.appendChild(editBtn);
            list.appendChild(li);
        });
    }
});
