// document.addEventListener('DOMContentLoaded', init, false);
// function init() {
  
// }

// function btnEvt() {
  
// }

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/PWATestProject/TEMP/js/service-worker.js')
//     .then((reg) => {
//       console.log('Service worker registered -->', reg);

//       //online event btn
//       btnEvt();

//     }, (err) => {
//       console.error('Service worker not registered -->', err);
//     });
// }

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
      .register('/PWATestProject/TEMP/js/service-worker.js')
      .then(() => { console.log('Service Worker Registered'); });
}


let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
        } else {
        console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
    });
});


