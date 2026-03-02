<div align="center">
  <b>🌍 <a href="README.md">English</a> &nbsp; | &nbsp; 🇹🇷 <a href="README.tr.md">Türkçe</a></b>
</div>

<br/>

<div align="center">

  <a href="https://phaticusthiccy.github.io/Thena-Web/">
    <img src="src/icon-512.png" alt="Thena Logo" width="200" />
  </a>

  # THENA - Next-Gen AI Image Generator & Chat
  
  **Ultimate Creative Suite • Advanced Roleplay Chat • Image Editing • Local First**

  <p>
    <a href="https://github.com/phaticusthiccy/Thena-Web/issues">
      <img src="https://img.shields.io/github/issues/phaticusthiccy/Thena-Web?style=for-the-badge&logo=github" alt="Issues" />
    </a>
    <a href="https://github.com/phaticusthiccy/Thena-Web/stargazers">
      <img src="https://img.shields.io/github/stars/phaticusthiccy/Thena-Web?style=for-the-badge&logo=github&color=ffe600" alt="Stars" />
    </a>
    <a href="https://github.com/phaticusthiccy/Thena-Web/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/LICENSE-MIT-red?style=for-the-badge" alt="License" />
    </a>
    <img src="https://img.shields.io/badge/Platform-Web%20%26%20PWA-blue?style=for-the-badge&logo=googlechrome" alt="Platform" />
  </p>

  <p>
    <i>Turn your imagination into reality in seconds. No installation, no backend, entirely client-side.</i>
  </p>
  
  <a href="https://phaticusthiccy.github.io/Thena-Web/">
    <img src="https://img.shields.io/badge/Launch_Web_App-3b82f6?style=for-the-badge&logo=rocket&logoColor=white" alt="Launch Web App" />
  </a>
  
  <br />
</div>

---

## 🚀 About The Project

**Thena** is a browser-based, modern, and aesthetic AI powerhouse built entirely with **Vanilla JavaScript, HTML, and CSS**. It pushes the boundaries of browser technologies (IndexedDB, Web Audio API, Canvas API) without relying on heavy frameworks like React or Vue.

It combines state-of-the-art **Image Generation**, a full knowledge-aware **AI Roleplay Chat**, and a professional **Image Editor** into one seamless Progressive Web App (PWA).

---

## ✨ Key Features

### 🎨 Advanced Image Generation
* **Multi-Model Support:** Access various models including Photorealism, Anime, Movie, and other creative options.
* **Flexible Aspect Ratios:** Support for Square (1:1), Portrait (3:4, 9:16), and Cinematic (16:9, 4:3) formats.
* **Smart Parameters:** Includes Fast Mode for speed, Creative & Dense for deep details, and HighRes scaling.
* **Expanded Presets & Styles:** Instantly apply diverse, community-inspired prompts and aesthetic styles.
* **Live Prompt Preview:** Dynamic visual feedback showing required prompt length before generation.
* **Magic Wand:** Enhances short, simple prompts into detailed descriptions with a single click.

### 🤖 AI Roleplay Chat
* **Interactive Characters:** Engage in deep, story-driven conversations with AI personas featuring rich, newly updated lore and backstories.
* **Dynamic System Prompts:** Create your own user profile (Name, Age, Gender). Characters will adapt their tone and memory specifically to you.
* **Customizable Views:** Effortlessly switch between Grid, List, and Compact layouts for organizing your character library.
* **Story Awareness:** The AI detects when a narrative arc is complete (`[FINISH]` signal) and can gently guide the story.
* **The Warden & Moderation UI:** Integrated content moderation with real-time level indicators (Low, Medium, High).

### 🖼️ Professional Image Editor
* **Quick Presets:** Apply Instagram-like filters instantly, featuring a real-time localized preset search bar.
* **Fine-Tuning & Adjustments:** Manually adjust brightness, contrast, saturation, and more.
* **Crop & Resize:** Prepare your generated art for any platform directly in the browser.
* **Workspace Preferences:** Toggle editor views and save your preferred workspace layout effortlessly.
* **Markup Tools:** Draw, annotate, or add text to your generated images.

### 📊 Performance Monitoring
* **Real-Time Stats:** Accurately track RAM usage, monitor FPS drops, and observe average render times.
* **Customizable HUD:** Drag, drop, and resize the performance monitor box to suit your interface layout preferences without blocking UI animations.

### 🌐 Localization & Accessibility
* **Multi-Language Support:** Fully translated interface available in **English** and **Turkish**, including deeper components like dynamic search logic.
* **Audio Feedback:** Dynamic sound effects for interactions (with a Silent Mode toggle).
* **Polished Mobile Experience:** Highly optimized responsive design with drag-to-dismiss bottom sheets and mobile-specific chat sidebars.

### 💾 Local-First Architecture
* **Advanced Gallery Management:** Filter, sort (Newest/Oldest), and easily mass-delete images using the brand new Multi-Select capability.
* **Fluid Gestures:** Intuitively close full-screen image views with a seamless Drag-to-Dismiss swipe gesture.
* **Private via IndexedDB:** All media, chats, and custom profiles live purely in your browser's local storage.
* **Data Privacy:** Your API key and creations remain entirely on your device. Absolutely no hidden backend uploads.

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Main Interface</b></td>
      <td align="center"><b>Advanced Image Editor</b></td>
    </tr>
    <tr>
      <td><img src="src/image_gen.webp" alt="UI" /></td>
      <td><img src="src/image_edit.webp" alt="Editor" /></td>
    </tr>
  </table>
  <table>
    <tr>
      <td align="center"><b>AI Chat Bots</b></td>
      <td align="center"><b>Gallery & Filters</b></td>
    </tr>
    <tr>
      <td><img src="src/chatbot.webp" alt="Chat" /></td>
      <td><img src="src/gallery.webp" alt="Gallery" /></td>
    </tr>
  </table>

  <br />

  <details>
    <summary><b>Show More Screenshots</b></summary>
    <br />
    <table>
      <tr>
        <td align="center"><b>Advanced Settings</b></td>
        <td align="center"><b>App Switcher Menu</b></td>
      </tr>
      <tr>
        <td><img src="src/adv_settings_image_gen.webp" alt="Advanced Settings" /></td>
        <td><img src="src/apps.webp" alt="Apps Menu" /></td>
      </tr>
    </table>
    <table>
      <tr>
        <td align="center"><b>Prompt Preview</b></td>
        <td align="center"><b>Settings Panel</b></td>
      </tr>
      <tr>
        <td><img src="src/prompt_preview.webp" alt="Prompt Preview" /></td>
        <td><img src="src/settings.webp" alt="Settings" /></td>
      </tr>
    </table>
  </details>
</div>

---

## 🛠️ Installation & Usage

This project runs client-side. No backend server installation is required.

### Method 1: Direct Open
1.  Download or clone the repository:
    ```bash
    git clone https://github.com/phaticusthiccy/Thena-Web.git
    ```
2.  Simply double-click `index.html` to open it in your web browser.

### Method 2: Local Server (Recommended)
To avoid CORS issues with some assets, audio features, or PWA installation, running a local server is recommended.

* **VS Code:** Use the "Live Server" extension and click "Go Live".
* **Python:**
    ```bash
    python -m http.server 8000
    ```
* **Node.js (http-server):**
    ```bash
    npx http-server .
    ```

---

## 🔑 Configuration (API Key)

To generate images, you need a free API Key.

1.  Click the **"Get Your Free API Key"** link in the app interface (redirects to the Telegram Bot).
2.  Paste the key provided by the bot into the `API Key` input field.
3.  Your key is safely stored in your browser's `LocalStorage`.

---

## 🧩 Tech Stack

| Technology | Usage |
| --- | --- |
| **HTML5** | Semantic structure and DOM layout |
| **CSS3** | Animations, Flexbox/Grid, Glassmorphism, Responsive Design |
| **JavaScript (ES6+)** | Core logic, API communication, DOM manipulation |
| **IndexedDB** | Persistent local storage for the image gallery |
| **Web Audio API** | Real-time audio synthesis for UI sounds |
| **Canvas API** | Image processing, resizing, and editing features |
| **Service Workers** | PWA functionality for offline capabilities and installation |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📝 License

This project is licensed under the [MIT](LICENSE) License.

<div align="center">
<br />
<p>Developed by <a href="https://t.me/phaticusthiccy">@phaticusthiccy</a></p>
<p><i>Made with ❤️ and lots of ☕</i></p>
</div>