<div align="center">

  <a href="https://phaticusthiccy.github.io/Thena-Web/">
    <img src="https://github.com/user-attachments/assets/175c0d76-b146-460f-bb34-d0ae7e2b57cc" alt="Thena Logo" width="200" />
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
* **Multi-Model Support:** Access various models including Photorealism, Anime, Movie, and NSFW options.
* **Flexible Aspect Ratios:** Support for Square (1:1), Portrait (3:4, 9:16), and Cinematic (16:9, 4:3) formats.
* **Smart Parameters:**
    * **Fast Mode:** Optimized for speed.
    * **Creative & Dense:** Boosts AI imagination and detail.
    * **Movie Filter & HighRes:** Cinematic color grading and upscaling.
* **Magic Wand:** Enhances short, simple prompts into detailed descriptions with a single click.

### 🤖 AI Roleplay Chat
* **Interactive Characters:** engage in deep, story-driven conversations with unique AI personas.
* **Story Awareness:** The AI detects when a narrative arc is complete (`[FINISH]` signal) and can guide the story.
* **Dynamic Responses:** Characters react to your input with personality and context.
* **The Warden:** An integrated moderation bot ensuring safe and appropriate interactions where necessary.

### 🖼️ Professional Image Editor
* **Quick Presets:** Apply Instagram-like filters and color grades instantly (e.g., Vivid, Noir, Vintage).
* **Fine-Tuning:** Adjust brightness, contrast, saturation, and more.
* **Crop & Resize:** Prepare your images for any platform directly in the browser.
* **Markup:** Draw, annotate, or add text to your generated images.

### 🌐 Localization & Accessibility
* **Multi-Language Support:** Fully translated interface available in **English** and **Turkish**.
* **Audio Feedback:** Dynamic sound effects for interactions (with Silent Mode).
* **Responsive Design:** Works seamlessly on desktop, tablet, and mobile.

### 💾 Local-First Architecture
* **Private Gallery:** All generated images are stored locally in your browser using IndexedDB.
* **Data Privacy:** Your API key and images remain on your device; no hidden server uploads.
* **Import/Export:** distinct functionality to backup your favorite images and settings.

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Main Interface</b></td>
      <td align="center"><b>Advanced Image Editor</b></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/9797eb42-ceec-4760-aa04-67a076421240" alt="UI" /></td>
      <td><img src="https://github.com/user-attachments/assets/35e1db6e-8bf0-4670-82e8-06e7c5f42a30" alt="Editor" /></td>
    </tr>
  </table>
  <table>
    <tr>
      <td align="center"><b>AI Chat Bots</b></td>
      <td align="center"><b>Gallery & Filters</b></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/c491a07f-6def-4dd3-962c-e8b48830143a" alt="Chat" /></td>
      <td><img src="https://github.com/user-attachments/assets/c57d0300-acd0-4bf7-8e53-2daefae9ee99" alt="Gallery" /></td>
    </tr>
  </table>
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