
function shouldBlockUrl(tabUrl) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get("blockedUrls", (result) => {
        let blockedUrls = result.blockedUrls ? result.blockedUrls.split(',').map(url => url.trim()) : [];

        const startHour = 1;  // 1 AM
        const endHour = 20;   // 8 PM

        const url = new URL(tabUrl);
        const hostname = url.hostname.replace('www.', '');

        const now = new Date();
        const currentHour = now.getHours();

        // Verificar si la URL está bloqueada
        const isBlocked = blockedUrls.includes(hostname);

        // Verificar si la hora actual está en el rango permitido
        const isInTimeRange = currentHour >= startHour && currentHour < endHour;

        console.log(isBlocked);
        console.log(isInTimeRange);

        // Resolver la promesa con el resultado
        resolve(isBlocked && isInTimeRange);
      });
    } catch (e) {
      // Rechazar la promesa si hay un error
      reject(false);
    }
  });
}

// Cuando se actualiza una pestaña
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    shouldBlockUrl(tab.url)
      .then((shouldBlock) => {
        if (shouldBlock) {
          chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
        }
      })
      .catch((error) => {
        console.error("Error al verificar la URL:", error);
      });
  }
});

// Cuando se cambia de pestaña activa
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      shouldBlockUrl(tab.url)
        .then((shouldBlock) => {
          if (shouldBlock) {
            chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("blocked.html") });
          }
        })
        .catch((error) => {
          console.error("Error al verificar la URL:", error);
        });
    }
  });
});