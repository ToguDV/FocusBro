# 🧠 FocusBro

**FocusBro** is a Chrome extension that helps you stay focused by blocking distracting websites during working hours. No more mindless scrolling — it's time to get sh*t done.

## ✨ Features

- 🚫 Blocks access to distracting websites (like Facebook, Twitter, YouTube, etc.)
- 🕒 Active only during defined hours (e.g. 9 AM to 10 PM)
- ⚡ Fast & lightweight

## ✨ Coming soon

- 🔒 Overlays the site instead of redirecting (so you don’t lose your place)
- 🔄 Automatically removes the block after hours
- 📆 Custom schedules per day (e.g. different times for weekends)
- 🧠 Motivational quotes or reminders when a site is blocked
- 📊 Usage stats (how many sites you avoided today)
- 🎯 Block specific paths or subdomains (e.g. block `youtube.com` but allow `music.youtube.com`)
- ☁️ Cloud sync for settings across devices

## 📦 Installation

1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the folder where you saved this extension
6. Done! You should see the FocusBro icon in your toolbar.

## ⚙️ Configuration

Edit the `background.js` file to change:

- Blocked sites (in the `blockedUrls` array)
- Active time range (`startHour` and `endHour`)

```js
const blockedUrls = [
  "facebook.com",
  "twitter.com",
  "youtube.com"
];

const startHour = 9;  // Start blocking at 9 AM
const endHour = 22;   // Stop blocking at 10 PM
