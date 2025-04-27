console.log("Script Loaded");

document.addEventListener('mouseup', (event) => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        showSavePopup(selectedText, event);  
    }
});

function showSavePopup(text, event) {  

    const popup = document.createElement('div');
    popup.id = 'save-highlight-popup';
    popup.innerText = 'Save Highlight 👍';
    popup.style.position = 'fixed';
    popup.style.top = `${event.clientY + 10}px`;
    popup.style.left = `${event.clientX + 10}px`;
    popup.style.padding = '8px 12px';
    popup.style.background = 'linear-gradient(135deg,rgb(153, 100, 210) 0%,rgb(109, 150, 220) 100%)';
    popup.style.color = 'white';
    popup.style.borderRadius = '12px';
    popup.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
    popup.style.cursor = 'pointer';
    popup.style.zIndex = 9999;
    popup.style.fontSize = '14px';
    popup.style.transition = 'all 0.3s ease';

    document.body.appendChild(popup);

    popup.onclick = () => {
        saveHighlight(text);
        popup.remove();
    };

    setTimeout(() => {
        document.addEventListener('click', () => {
            popup.remove();
        }, { once: true });
    }, 10);
}

function saveHighlight(text) {
    chrome.storage.local.get({ highlights: [] }, (data) => {
        const updated = [...data.highlights, { text, date: new Date().toISOString() }];
        chrome.storage.local.set({ highlights: updated });
    });
}
