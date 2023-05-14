const butInstall = document.getElementById('buttonInstall');

// Install the PWA
let deferredPrompt;

// Event handler for `beforeinstallprompt`
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showInstallPrompt();
});

// Click event handler for `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();

        const choiceResult = await deferredPrompt.userChoice;
        console.log('User choice:', choiceResult.outcome);
        deferredPrompt = null;
    }
});


// Handler for `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('Installed:', event);
});

// Prompt
function showInstallPrompt() {
    console.log('Install prompt');
}
