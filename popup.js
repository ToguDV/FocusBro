document.addEventListener("DOMContentLoaded", () => {
  const blockedUrls = [document.getElementById("blockedUrls"), "blockedUrls"];
  const startHour = [document.getElementById("startHour"), "startHour"];
  const saveBtn = document.getElementById("save");

  const elements = [blockedUrls, startHour];

  // Load elements
  elements.forEach(([element, key]) => {
    chrome.storage.local.get(key, (result) => {
      if (result[key]) {
        element.value = result[key];
      }
    });
  });

  // Save inputs
  saveBtn.addEventListener("click", () => {
    const dataToSave = {};
  
    elements.forEach(([el, key]) => {
      dataToSave[key] = el.value;
    });
  
    chrome.storage.local.set(dataToSave, () => {
      console.log("Datos guardados:", dataToSave);
    });
  });
});