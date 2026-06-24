<div align="center">
  <b>🌍 <a href="README.md">English</a> &nbsp; | &nbsp; 🇹🇷 <a href="README.tr.md">Türkçe</a></b>
</div>

<br/>

<div align="center">
  <a href="https://phaticusthiccy.github.io/Thena-Web/">
    <img src="src/icon-512.png" alt="Thena Logo" width="160" />
  </a>

  <h1>THENA</h1>
  <h3>Next-Generation Client-Side AI Ecosystem: Image Generation, Roleplay Chat, Image Editor & Visual Stories</h3>

  <p>
    <a href="https://github.com/phaticusthiccy/Thena-Web/releases">
      <img src="https://img.shields.io/badge/Version-3.8.0-blue?style=for-the-badge&logo=git&logoColor=white" alt="Version 3.8.0" />
    </a>
    <a href="https://github.com/phaticusthiccy/Thena-Web/issues">
      <img src="https://img.shields.io/github/issues/phaticusthiccy/Thena-Web?style=for-the-badge&logo=github&color=e11d48" alt="Issues" />
    </a>
    <a href="https://github.com/phaticusthiccy/Thena-Web/stargazers">
      <img src="https://img.shields.io/github/stars/phaticusthiccy/Thena-Web?style=for-the-badge&logo=github&color=f59e0b" alt="Stars" />
    </a>
    <a href="https://github.com/phaticusthiccy/Thena-Web/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/LICENSE-MIT-8b5cf6?style=for-the-badge" alt="License" />
    </a>
    <img src="https://img.shields.io/badge/Platform-Web%20%26%20PWA-0ea5e9?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Platform" />
    <img src="https://img.shields.io/badge/Vanilla-JS-f97316?style=for-the-badge&logo=javascript&logoColor=white" alt="Vanilla JS" />
  </p>

  <blockquote>
    <strong>Transform your imagination into stunning visuals and interactive stories in seconds — zero server dependencies, entirely running client-side.</strong>
  </blockquote>

  <a href="https://phaticusthiccy.github.io/Thena-Web/">
    <img src="https://img.shields.io/badge/🚀%20Launch%20Web%20App-3b82f6?style=for-the-badge&logoColor=white" alt="Launch Web App" />
  </a>

  <br /><br />
</div>

---

## 🗂️ Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Codebase Architecture & File Structure](#-codebase-architecture--file-structure)
- [Screenshots](#-screenshots)
- [Installation & Usage](#%EF%B8%8F-installation--usage)
- [Configuration & API Key](#-configuration--api-key)
- [Tech Stack](#-tech-stack)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 About The Project

**Thena** is a high-performance, browser-native AI creative platform engineered entirely with **Vanilla JavaScript, HTML5, and CSS3** (no heavy frameworks, no React/Vue compilation). By harnessing modern Web APIs, it delivers a desktop-grade, zero-backend suite for content creation, narrative generation, and visual storytelling directly inside a web tab.

The platform is designed around four key pillars:

| Pillar | Architecture & Purpose |
| :--- | :--- |
| 🎨 **AI Image Generation** | Multi-model, multi-style synthesis utilizing custom API endpoints with real-time prompt feedback. |
| 🤖 **AI Roleplay Chat** | Fully immersive conversational engine with custom character metadata, memory integration, and sentiment analysis. |
| 🖼️ **Image Editor** | Canvas-level pixel manipulation, AI outpainting, upscaling, blending (fusion), and human-focused **Gender Swapping**. |
| 📖 **AI Stories (Thena Toons)** | A smooth webtoon-style graphic novel reader with lazy-loaded image pipelines. |

---

## ✨ Key Features

### 🎨 Advanced Image Generation
* **Multi-Model Engine** — Start creating with Thena's own image generation models, as well as the most advanced image models worldwide, including the newly added **Midjourney V8.1** model!
* **Multi-Image Generation & Saving** — Upgraded generation pipeline to handle multiple parallel images returned in a single API payload, automatically saving all results into the local database.
* **Precise Aspect Ratios** — Built-in aspect adapters for Standard (1:1), Portrait (3:4, 9:16), and Widescreen (16:9, 4:3) ratios.
* **Optimization Modes** — Choose between **Fast Mode** for rapid iterations, **Creative & Dense** for structural complexity, and **HighRes** for supersampled rendering.
* **Prompt Engineering Tools**:
  * **Magic Wand ✨** — Automatically expands short, descriptive phrases into highly detailed prompts.
  * **Live Prompt Preview** — A dynamic indicator analyzing complexity and length constraints.
  * **Curated Style Presets** — Instantly apply preset community-curated styles.

### 🤖 AI Roleplay Chat
* **Contextual Character Lore** — Engage with characters featuring extensive system prompts, narrative settings, and dating-sim mechanics.
* **Multi-Tier LLM Support** — Switch dynamically between **Fast**, **Balanced**, and **Ultra** intelligence tiers.
* **Real-Time Sentiment Analysis** — An emotional state engine analyzes the character's narrative output to automatically update their visual facial expression.
* **Dynamic User Profiles** — Customize username, age, and gender preferences; the system dynamically adapts the AI character's tone, memory boundaries, and response structures.
* **The Warden Guard** — Built-in local content moderation with adjustable levels (Low / Medium / High).
* **Interface Settings** — Fluid grid, list, and compact library views with full export/import utilities, including a dialogue **Skip Button** for rapid conversation pacing.

### 🖼️ Professional Image Editor
* **AI Outpainting** — Extrapolate and extend canvas borders outward, filling newly defined areas seamlessly.
* **4K Upscaling** — Enhances resolution using advanced super-resolution models.
* **AI Image Fusion** — Harmonizes two distinct images utilizing blend percentages and targeted model adapters.
* **Advanced Processing Models** — Segmented with speed/quality indicators: **FAST (PixelFusion)**, **BEST (NeuralFlow)**, and **MAX (Synapse)**.
* **Gender Swap Tool 🔄** — Swap character features dynamically using cloud-based AI worker pipelines, supporting async polling and automatic result injection.
* **Non-Destructive Adjustments** — Fine-tune levels for brightness, contrast, temperature, and saturation.
* **Markup & Annotations** — Built-in canvas brushes, text tools, and filter presets with localized real-time search.

### 📖 AI Stories (Thena Toons)
* **Distraction-Free Reading** — Optimized vertical flow designed for webtoon layout consumption.
* **Chapter State Manager** — Tracks current episode progression ("Ongoing" and "Completed") cached directly in IndexedDB.
* **Lazy Loading** — High-resolution comic sequences load on viewport entry, preserving CPU/GPU resources.

### 🪙 Credits & Gifting Ecosystem
* **Live Balance Tracking** — Interactive header widget displays your current token balance in real-time, pulsing on updates and warning on low credits.
* **Detailed Package Analytics** — Detailed comparison modals comparing pricing rates (₺) and estimating usages across different paid AI models.
* **Connection Codes** — Easily share your connection code to send and receive peer-to-peer gifts securely.
* **Safe Purchase Verification** — Prevent accidental double orders with key verification checkboxes and quick API key copying features.

### 🎬 Cinematic Welcome & Spotlight Guide
* **Cinematic Intro** — Eye-catching letter spinning title intro animation accompanied by 8-bit procedurally generated synthesizers.
* **Interactive Spotlight Tour** — Step-by-step element highlight tours (19 interactive steps) teaching users how to use models, prompt magic wands, outpainting, and settings.
* **Smooth Transitions & Skip Options** — Fully responsive overlay mask with quick skip actions, restart options in settings, and custom success audio/visual notifications.


### 📊 Performance & Optimization
* **System Stats HUD** — A draggable, resizable performance overlay tracking estimated FPS, memory usage, and GPU render cycles.
* **Power Saver API** — Intercepts tab state changes (visibility/idle) to suspend audio synthesis, pause heavy CSS animations, and lock wake states via the Wake Lock API.
* **DOM Virtualization** — Chat messages are loaded efficiently to avoid memory bloat, keeping scrolling lag-free.

### 💾 Local-First Privacy
* **Local Database Storage** — Powered by `IndexedDB`, ensuring all custom characters, generated images, favorites, and transcripts are kept offline on your device.
* **Privacy by Design** — API keys and personal profile details are saved directly in `LocalStorage` without third-party transit.

### 🔌 Developer API Hub & Interactive Console
* **Comprehensive API Documentation (`api.html`)** — Fully documented local API endpoints for image generation, model pricing, ETAs, chatbot character metadata, and credit sharing.
* **Interactive API Console** — Test API requests directly from a built-in UI playground with real-time response rendering and JSON tree views.
* **Easy Code Integration** — Ready-to-use client snippets in multiple programming languages.
* **Dedicated Navigation** — Instant access to local documentation from the updated header menu and redirection prompts.

---

## 📂 Codebase Architecture & File Structure

Here is a breakdown of the core script modules that orchestrate the platform:

```
Thena-Web/
├── index.html                  # Semantic structural entrypoint and layout framework
├── trailer.html                # Standalone cinematic trailer presentation layer
├── api.html                  # Developer API documentation page & interactive playground
├── manifest.json               # PWA configuration and mobile icons settings
├── css/
│   ├── style.css               # Unified stylesheets, theme engines, and animations
│   ├── welcome.css             # Cinematic welcome and interactive spotlight guide styles
│   ├── trailer.css             # Video player container and cinematic intro styles
│   ├── editor-search.css       # Photo editor localized search styles and layout rules
│   ├── model-gallery.css       # Layout styles for the AI model browser card gallery
│   └── prompt-preview.css      # CSS styles for visual prompt keyword analytics and overlays
└── scripts/
    ├── script.js               # Main application controller (Orchestrator & Image Gen)
    ├── elements.js             # CACHED DOM element registry for selector optimization
    ├── lang.js                 # Localization dictionaries and i18n translation engine
    ├── aiChat.js               # Chat framework, character database, and chat UI logic
    ├── chatMessages.js         # Chat bubble template builders and list render controls
    ├── chatImageDownloader.js  # Async downloader utility for media within chat bubbles
    ├── imageEditor.js          # Photo filters, Canvas API operations, and Outpaint/Fusion tools
    ├── aiStories.js            # Webtoon reader controller and episode sequence loader
    ├── modelGallery.js         # Interactive catalog showcasing different image checkpoints
    ├── loadAllModels.js        # Details and assets downloader for different synthesis models
    ├── favorites-backups.js    # Data export/import utility and IndexedDB backup management
    ├── powerSaver.js           # Idle detector, battery/wake lock state manager
    ├── visibilityOptimizer.js  # IntersectionObserver engine pausing off-screen animations
    ├── cpu.js                  # HUD diagnostics parser (FPS, CPU & RAM monitor)
    ├── promptPreview.js        # Visual prompt length and keyword density indicators
    ├── promptexpansion.js      # Prompt expansion engine ("Magic Wand" logic)
    ├── trailer.js              # Introduction trailer video controller
    ├── welcome.js              # Cinematic introduction and interactive user guide (tutorial)
    ├── credits.js              # Credits system integration (gifting, packages, balance check)
    ├── customSelect.js         # Styled custom dropdown selection elements controller
    └── sw.js                   # Service Worker cache controller for offline PWA usage
```

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Main Interface</b></td>
      <td align="center"><b>Advanced Image Editor</b></td>
    </tr>
    <tr>
      <td><a href="src/image_gen.webp"><img src="src/image_gen.webp" alt="Main Interface" /></a></td>
      <td><a href="src/image_edit.webp"><img src="src/image_edit.webp" alt="Image Editor" /></a></td>
    </tr>
  </table>
  <table>
    <tr>
      <td align="center"><b>AI Roleplay Chat</b></td>
      <td align="center"><b>AI Stories (Webtoon Reader)</b></td>
    </tr>
    <tr>
      <td><a href="src/chatbot.webp"><img src="src/chatbot.webp" alt="AI Chat" /></a></td>
      <td><a href="src/thena_comic_page.webp"><img src="src/thena_comic_page.webp" alt="AI Stories Webtoon Reader" /></a></td>
    </tr>
  </table>
  <table>
    <tr>
      <td align="center"><b>Gallery & Filters</b></td>
      <td align="center"><b>AI Outpainting</b></td>
    </tr>
    <tr>
      <td><a href="src/gallery.webp"><img src="src/gallery.webp" alt="Gallery" /></a></td>
      <td><a href="src/outpaint_editor.webp"><img src="src/outpaint_editor.webp" alt="AI Outpainting" /></a></td>
    </tr>
  </table>

  <br />

  <details>
    <summary><b>Show More Screenshots (Click to Expand)</b></summary>
    <br />
    <table>
      <tr>
        <td align="center"><b>Cinematic Intro</b></td>
        <td align="center"><b>Model Showcase</b></td>
      </tr>
      <tr>
        <td><a href="src/trailer.webp"><img src="src/trailer.webp" alt="Cinematic Intro" /></a></td>
        <td><a href="src/showcase.webp"><img src="src/showcase.webp" alt="Model Showcase" /></a></td>
      </tr>
    </table>
    <table>
      <tr>
        <td align="center"><b>Chat — Opening Scene</b></td>
        <td align="center"><b>Chat — Story Conclusion</b></td>
      </tr>
      <tr>
        <td><a href="src/chat_start.webp"><img src="src/chat_start.webp" alt="Chat Start" /></a></td>
        <td><a href="src/chat_end.webp"><img src="src/chat_end.webp" alt="Chat End" /></a></td>
      </tr>
    </table>
    <table>
      <tr>
        <td align="center"><b>Advanced Settings</b></td>
        <td align="center"><b>App Switcher</b></td>
      </tr>
      <tr>
        <td><a href="src/adv_settings_image_gen.webp"><img src="src/adv_settings_image_gen.webp" alt="Advanced Settings" /></a></td>
        <td><a href="src/apps.webp"><img src="src/apps.webp" alt="App Switcher" /></a></td>
      </tr>
    </table>
    <table>
      <tr>
        <td align="center"><b>Prompt Preview Module</b></td>
        <td align="center"><b>Settings Panel</b></td>
      </tr>
      <tr>
        <td><a href="src/prompt_preview.webp"><img src="src/prompt_preview.webp" alt="Prompt Preview" /></a></td>
        <td><a href="src/settings.webp"><img src="src/settings.webp" alt="Settings Panel" /></a></td>
      </tr>
    </table>
    <table>
      <tr>
        <td align="center"><b>Gallery Statistics</b></td>
        <td align="center"><b>AI Model Browser</b></td>
      </tr>
      <tr>
        <td><a href="src/gallery_stats.webp"><img src="src/gallery_stats.webp" alt="Gallery Stats" /></a></td>
        <td><a href="src/model_showcase.webp"><img src="src/model_showcase.webp" alt="AI Model Browser" /></a></td>
      </tr>
    </table>
  </details>
</div>

---

## 🛠️ Installation & Usage

Thena runs entirely on the client side. No server configuration or database setup is required.

### Method 1: Local Server (Highly Recommended)
Serving the application via a local HTTP server is required to bypass browser CORS limitations and enable advanced PWA offline caching.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/phaticusthiccy/Thena-Web.git
   ```
2. **Launch a server in the root folder:**
   * **Python:** `python -m http.server 8000`
   * **NodeJS:** `npx http-server -p 8000`
   * **VS Code:** Install the *Live Server* extension and click **"Go Live"**.
3. Open `http://localhost:8000` in your browser.

### Method 2: Direct Execution
Simply download the directory and open `index.html` directly in your browser. *Note: Some browser security models may limit IndexedDB access or service worker installs when run from file protocol (`file:///`).*

---

## 🔑 Configuration & API Key

An API key is required to synthesize images:
1. Open the application settings (gear icon ⚙️).
2. Click **"Get Your Free API Key"** to open the associated generation provider bot.
3. Paste the returned token into the API Key input.
4. The key is securely cached inside the browser's `LocalStorage` and is only sent directly to model generation endpoints.

---

## 🧩 Tech Stack

| Technology | Implementation Scope |
| :--- | :--- |
| **HTML5** | Semantic structure, dynamic template injection, responsive structural components. |
| **CSS3** | Premium UI aesthetics, Glassmorphism styles, dark/light theme engines, performance-optimized animations. |
| **JavaScript (ES6+)** | Native asynchronous flow, Canvas manipulations, modular scripts loader, IndexedDB orchestration. |
| **IndexedDB** | High-capacity offline storage of images, history states, chat rooms, and custom metadata. |
| **Web Audio API** | Real-time UI audio generation and sound spatialization. |
| **Canvas API** | Real-time browser-side cropping, filtering, and scaling adjustments. |
| **Service Workers** | Prefetching, network caching strategies, and standalone Progressive Web App (PWA) installation. |

---

## 🤝 Contributing

Contributions to improve performance, add new feature modules, or refine styling are welcome:

1. **Fork** the repository.
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit your changes (using [Conventional Commits](https://www.conventionalcommits.org/)): `git commit -m 'feat: add amazing new feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**.

---

## 📝 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

<div align="center">
  <br />
  <p>Developed with passion by <a href="https://t.me/phaticusthiccy"><b>@phaticusthiccy</b></a></p>
  <p><i>Made with ❤️ and lots of ☕</i></p>
  <br />
  <a href="https://phaticusthiccy.github.io/Thena-Web/">
    <img src="https://img.shields.io/badge/⭐%20Star%20this%20repo-f59e0b?style=for-the-badge" alt="Star this repo" />
  </a>
</div>