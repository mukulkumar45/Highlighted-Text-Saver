const list = document.getElementById('highlightsList');

function loadHighlights() {
    chrome.storage.local.get({ highlights: [] }, (data) => {
        list.innerHTML = '';
        data.highlights.forEach((item, index) => {
            const highlight = document.createElement('div');
            highlight.className = 'highlight-item';
            highlight.innerHTML = `
                <p class="highlight-text">${item.text}</p>
                <button class="delete-button" data-index="${index}">Delete</button>
                <span class="summarize-button" sum-index=${index}">Summariaze</span>
            `;
            list.appendChild(highlight);
        });
    });
}

list.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.getAttribute('data-index');
        chrome.storage.local.get({ highlights: [] }, (data) => {
            data.highlights.splice(index, 1);
            chrome.storage.local.set({ highlights: data.highlights }, loadHighlights);
        });
    }
});

list.addEventListener('click', async (e) => {
    if (e.target.tagName === 'SPAN') {
        const parent = e.target.parentElement;
        const pTag = parent.querySelector('p');

        const text = pTag.textContent;

        alert(text);
    }
});




loadHighlights();
