document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("nota");
    const guardarBtn = document.getElementById("guardar");
  
    // Cargar nota almacenada
    chrome.storage.local.get(["miNota"], (result) => {
      if (result.miNota) {
        textarea.value = result.miNota;
      }
    });
  
    // Guardar nota cuando el usuario hace clic
    guardarBtn.addEventListener("click", () => {
      const contenido = textarea.value;
      chrome.storage.local.set({ miNota: contenido }, () => {
        console.log("Nota guardada.");
      });
    });
  });