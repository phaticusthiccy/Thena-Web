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

**Thena** is a browser-based, modern, and aesthetic AI image generation interface built entirely with **Vanilla JavaScript, HTML, and CSS**. It pushes the boundaries of browser technologies (IndexedDB, Web Audio API, Canvas API) without relying on heavy frameworks like React or Vue.

It is not just an image generator; it is a full-featured suite including Image-to-Prompt capabilities, local gallery management, PWA support, and customizable themes.

---

## ✨ Key Features

### 🎨 Generation & Models
* **Multi-Model Support:** Access various models like Thena Movie, Max, V6, Photoreal, Anime Core, and Anime Fast.
* **Flexible Aspect Ratios:** Support for Square (1:1), Portrait (3:4, 9:16), and Cinematic (16:9, 4:3) formats.
* **Advanced Parameters:**
    * **Fast Mode:** Optimized for speed.
    * **Creative & Dense:** Boosts AI imagination and detail.
    * **Movie Filter & HighRes:** Cinematic color grading and upscaling.

### 🛠️ Smart Tools
* **🖼️ Image to Prompt:** Upload an image to analyze its content and generate a prompt automatically using CLIP technology.
* **🪄 Magic Wand:** Enhances short, simple prompts into detailed, professional descriptions with a single click.
* **📜 Prompt History:** Automatically saves your recently used prompts for quick reuse.
* **🛡️ Moderation Tools:** Toggle between Low, Medium, and High safety moderation levels.

### 💾 Gallery & Experience
* **Local Gallery (IndexedDB):** Generated images are stored locally in your browser. Filter by date, model, or aspect ratio.
* **Community Showcase:** Explore images shared by the community and copy their settings/prompts instantly.
* **🔗 Instant Sharing:** Generate public links for your creations directly from the lightbox to share with friends.
* **Audio Feedback:** Dynamic, synthesized sound effects for interactions. (Includes **Silent Mode**).
* **Lightbox Mode:** View images in full screen, download, delete, or check generation metadata.

### ⚙️ Personalization & Performance
* **Theme Engine:** Switch between solid colors or stunning gradient themes to match your style.
* **Performance Mode:** Disables heavy animations and blur effects for smoother performance on low-end devices.
* **PWA Support:** Installable as a native-like app on mobile and desktop devices.
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
      <td><img src="https://github.com/user-attachments/assets/e8a53ee4-367a-4ba0-828b-659bae1bc372" alt="UI" /></td>
      <td><img src="https://github.com/user-attachments/assets/c57d0300-acd0-4bf7-8e53-2daefae9ee99" alt="Gallery" /></td>
    </tr>
  </table>
  <table>
     <tr>
      <td align="center"><b>Image to Prompt Tool</b></td>
      <td align="center"><b>Settings & Themes</b></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/ad806d93-1755-4952-b109-e3b58ba8ba4d" alt="Img2Prompt" /></td>
      <td><img src="https://github.com/user-attachments/assets/641a89aa-21f3-4184-97bf-3d991a75e02a" alt="Settings"/></td>
    </tr>
  </table>
  <table>
     <tr>
      <td align="center"><b>Prompt Enhancement</b></td>
      <td align="center"><b>Community Showcase</b></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/801cf8c8-c9d9-4da6-93aa-a56d16c42d2e" alt="Prompt Enhancement" /></td>
      <td><img src="https://github.com/user-attachments/assets/fcf913be-2c95-4d79-bc7e-0477f989dc46" alt="Community Showcase" /></td>
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