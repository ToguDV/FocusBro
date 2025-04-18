function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}


function shouldBlockUrl(tabUrl) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(["blockedUrls", "startHour", "endHour"], (result) => {
        const blockedUrls = result.blockedUrls ? result.blockedUrls.split(',').map(url => url.trim()) : [];

        const startHour = timeToMinutes(result.startHour);
        const endHour = timeToMinutes(result.endHour);

        console.log("StartHour: "+startHour);

        const url = new URL(tabUrl);
        const hostname = url.hostname.replace('www.', '');

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const currentHour = timeToMinutes(`${hours}:${minutes}`);

        const isBlocked = blockedUrls.includes(hostname);
        const isInTimeRange = currentHour >= startHour && currentHour < endHour;

        console.log(isBlocked);
        console.log(isInTimeRange);

        resolve(isBlocked && isInTimeRange);
      });
    } catch (e) {
      reject(false);
    }
  });
}

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