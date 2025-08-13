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

    renderEntries();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const type = document.getElementById('type').value;
        const description = document.getElementById('description').value.trim();
        if (name && type && description) {
            entries.push({ name, type, description });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
            renderEntries();
            form.reset();
        }
    });

    function renderEntries() {
        list.innerHTML = '';
        entries.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = `[${item.type}] ${item.name}: ${item.description}`;
            list.appendChild(li);
        });
    }
});