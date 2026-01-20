<div align="center">

  <a href="https://phaticusthiccy.github.io/Thena-Web/">
    <img src="https://github.com/user-attachments/assets/175c0d76-b146-460f-bb34-d0ae7e2b57cc" alt="Thena Logo" width="200" />
  </a>

  # THENA - Next-Gen AI Image Generator

  **Futuristic Interface • Local Gallery • Advanced Prompt Engineering • Community Showcase**

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
    <img src="https://img.shields.io/badge/Platform-Web-blue?style=for-the-badge&logo=googlechrome" alt="Platform" />
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

**Thena** is a browser-based, modern, and aesthetic AI image generation interface built entirely with **Vanilla JavaScript, HTML, and CSS**. It pushes the boundaries of browser technologies (IndexedDB, Web Audio API, Canvas API) without relying on heavy frameworks like React or Vue.

It is not just an image generator; it is a full-featured suite including Image-to-Prompt capabilities, local gallery management, and customizable themes.

---

## ✨ Key Features

### 🎨 Generation & Models
* **Multi-Model Support:** Access various models like Thena Movie, Max, V6, Photoreal, Anime Core, and more.
* **Flexible Aspect Ratios:** Support for Square (1:1), Portrait (3:4, 9:16), and Cinematic (16:9, 4:3) formats.
* **Advanced Parameters:**
    * **Fast Mode:** Optimized for speed.
    * **Creative & Dense:** Boosts AI imagination and detail.
    * **Movie Filter & HighRes:** Cinematic color grading and upscaling.

### 🛠️ Smart Tools
* **🖼️ Image to Prompt (New):** Upload an image to analyze its content and generate a prompt automatically using CLIP technology.
* **🪄 Magic Wand:** Enhances short, simple prompts into detailed, professional descriptions with a single click.
* **🛡️ Moderation Tools:** Toggle between Low, Medium, and High safety moderation levels.

### 💾 Gallery & Experience
* **Local Gallery (IndexedDB):** Generated images are stored locally in your browser. Filter by date, model, or aspect ratio.
* **Community Showcase:** Explore images shared by the community and copy their settings/prompts instantly.
* **Audio Feedback (Web Audio API):** Dynamic, synthesized sound effects for interactions, success, and errors.
* **Lightbox Mode:** View images in full screen, download, delete, or check generation metadata.

### ⚙️ Personalization
* **Theme Engine:** Switch between solid colors or gradient themes to match your style.
* **Performance Mode:** Disables heavy animations and blur effects for smoother performance on low-end devices.
* **Privacy:** Your API key and images remain on your local device.

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Main Interface</b></td>
      <td align="center"><b>Local Gallery & Filters</b></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/0afcacf4-dc93-4e65-8de9-8ae3a9d12c74" alt="UI" /></td>
      <td><img src="https://github.com/user-attachments/assets/1665dfda-6e4d-4c34-b452-afd7448a508d" alt="Gallery" /></td>
    </tr>
  </table>
  <table>
     <tr>
      <td align="center"><b>Image to Prompt Tool</b></td>
      <td align="center"><b>Settings & Themes</b></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/74718463-e7be-4438-bd56-61958a24344c" alt="Img2Prompt" /></td>
      <td><img src="https://github.com/user-attachments/assets/e9b2b18e-b926-464e-8be4-b308b6e17608" /></td>
    </tr>
  </table>
</div>

---

## 🛠️ Installation & Usage

This project runs client-side. No backend server installation is required.

### Method 1: Direct Open
1.  Download or clone the repository:
    ```bash
    git clone [https://github.com/phaticusthiccy/Thena-Web.git](https://github.com/phaticusthiccy/Thena-Web.git)
    ```
2.  Simply double-click `index.html` to open it in your web browser.

### Method 2: Local Server (Recommended)
To avoid CORS issues with some assets or features, running a local server is recommended.
* **VS Code:** Use the "Live Server" extension and click "Go Live".
* **Python:**
    ```bash
    python -m http.server 8000
    ```

---

## 🔑 Configuration (API Key)

To generate images, you need a free API Key.

1.  Click the **"Get Your Free API Key"** link in the app interface (redirects to the Telegram Bot).
2.  Paste the key provided by the bot into the `API Key` input field.
3.  Your key is safely stored in your browser's `LocalStorage` and is not sent to any third-party analytics.

---

## 🧩 Tech Stack

| Technology | Usage |
| --- | --- |
| **HTML5** | Semantic structure and DOM layout |
| **CSS3** | Animations, Flexbox/Grid, Gradients, Glitch Effects |
| **JavaScript (ES6+)** | Core logic, API communication, DOM manipulation |
| **IndexedDB** | Persistent local storage for the image gallery |
| **Web Audio API** | Real-time audio synthesis (Oscillators) for UI sounds |
| **Canvas API** | Image processing and resizing for the "Image to Prompt" feature |

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