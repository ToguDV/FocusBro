const blockedUrls = [
    "facebook.com",
    "twitter.com",
    "youtube.com"
  ];
  
  const startHour = 9;  // 9 AM
  const endHour = 23;   // 11 PM
  
  function shouldBlockUrl(tabUrl) {
    try {
      const url = new URL(tabUrl);
      const hostname = url.hostname.replace('www.', '');
  
      const now = new Date();
      const currentHour = now.getHours();

      const isBlocked = blockedUrls.includes(hostname);

      const isInTimeRange = currentHour >= startHour && currentHour < endHour;
  
      return isBlocked && isInTimeRange;
    } catch (e) {
      return false;
    }
  }
  
  // Cuando se actualiza una pestaña (navegación, recarga)
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && shouldBlockUrl(tab.url)) {
      chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
    }
  });
  
  // Cuando se cambia de pestaña activa
  chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url && shouldBlockUrl(tab.url)) {
        chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("blocked.html") });
      }
    });
  });