<div align="center">
  <b>🌍 <a href="README.md">English</a> &nbsp; | &nbsp; 🇹🇷 <a href="README.tr.md">Türkçe</a></b>
</div>

<br/>

<div align="center">
  <a href="https://phaticusthiccy.github.io/Thena-Web/">
    <img src="src/icon-512.png" alt="Thena Logo" width="160" />
  </a>

  <h1>THENA</h1>
  <h3>Yeni Nesil İstemci Taraflı Yapay Zeka Ekosistemi: Görsel Üretimi, Rol Yapma Sohbeti, Görüntü Düzenleyici ve Görsel Hikayeler</h3>

  <p>
    <a href="https://github.com/phaticusthiccy/Thena-Web/releases">
      <img src="https://img.shields.io/badge/S%C3%BCr%C3%BCm-3.7.4-blue?style=for-the-badge&logo=git&logoColor=white" alt="Sürüm 3.7.4" />
    </a>
    <a href="https://github.com/phaticusthiccy/Thena-Web/issues">
      <img src="https://img.shields.io/github/issues/phaticusthiccy/Thena-Web?style=for-the-badge&logo=github&color=e11d48" alt="Sorunlar" />
    </a>
    <a href="https://github.com/phaticusthiccy/Thena-Web/stargazers">
      <img src="https://img.shields.io/github/stars/phaticusthiccy/Thena-Web?style=for-the-badge&logo=github&color=f59e0b" alt="Yıldızlar" />
    </a>
    <a href="https://github.com/phaticusthiccy/Thena-Web/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/Lisans-MIT-8b5cf6?style=for-the-badge" alt="Lisans" />
    </a>
    <img src="https://img.shields.io/badge/Platform-Web%20%26%20PWA-0ea5e9?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Platform" />
    <img src="https://img.shields.io/badge/Vanilla-JS-f97316?style=for-the-badge&logo=javascript&logoColor=white" alt="Vanilla JS" />
  </p>

  <blockquote>
    <strong>Hayal gücünüzü saniyeler içinde çarpıcı görsellere ve etkileşimli hikayelere dönüştürün — sunucu bağımlılığı yok, tamamen istemci tarafında çalışır.</strong>
  </blockquote>

  <a href="https://phaticusthiccy.github.io/Thena-Web/">
    <img src="https://img.shields.io/badge/🚀%20Uygulamayı%20Başlat-3b82f6?style=for-the-badge&logoColor=white" alt="Uygulamayı Başlat" />
  </a>

  <br /><br />
</div>

---

## 🗂️ İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Temel Özellikler](#-temel-özellikler)
- [Kod Tabanı Mimarisi ve Dosya Yapısı](#-kod-tabanı-mimarisi-ve-dosya-yapısı)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Kurulum ve Kullanım](#%EF%B8%8F-kurulum-ve-kullanım)
- [Yapılandırma ve API Anahtarı](#-yapılandırma-ve-api-anahtarı)
- [Teknoloji Yığını](#-teknoloji-yığını)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

---

## 🚀 Proje Hakkında

**Thena**, tamamen **Vanilla JavaScript, HTML5 ve CSS3** ile inşa edilmiş, tarayıcı-yerel, yüksek performanslı bir Yapay Zeka yaratıcı platformudur (React/Vue gibi ağır çerçeveler veya derleme adımları içermez). Modern Web API'lerinden yararlanarak, doğrudan bir tarayıcı sekmesi içinde içerik üretimi, anlatı oluşturma ve görsel hikaye anlatımı için masaüstü düzeyinde, sunucusuz bir deneyim sunar.

Platform dört temel sütun üzerine kurulmuştur:

| Sütun | Mimari ve Amaç |
| :--- | :--- |
| 🎨 **Yapay Zeka Görsel Üretimi** | Canlı komut geri bildirimi ve özel API uç noktaları kullanan çok modelli, çok stilli görsel sentezi. |
| 🤖 **Yapay Zeka Rol Yapma Sohbeti** | Özel karakter meta verileri, hafıza entegrasyonu ve duygu analizi içeren sürükleyici sohbet motoru. |
| 🖼️ **Görüntü Düzenleyici** | Canvas düzeyinde piksel manipülasyonu, yapay zeka outpaint, 4K yükseltme (Upscale), harmanlama (Fusion) ve insan odaklı **Cinsiyet Değişimi**. |
| 📖 **Yapay Zeka Hikayeleri (Thena Toons)** | Tembel yüklemeli (lazy-loaded) görüntü işlem hattına sahip, akıcı webtoon tarzı görsel roman okuyucusu. |

---

## ✨ Temel Özellikler

### 🎨 Gelişmiş Görsel Üretimi
* **Çoklu Model Motoru** — Thena'nın kendi görsel üretme modellerinin yanı sıra dünya çapındaki en gelişmiş görüntü modelleri ile birlikte oluşturmaya başlayın!
* **Hassas En Boy Oranları** — Kare (1:1), Dikey (3:4, 9:16) ve Geniş Ekran (16:9, 4:3) formatları için hazır en boy oranı adaptörleri.
* **Optimizasyon Modları** — Hızlı iterasyonlar için **Hızlı Mod (Fast Mode)**, yapısal karmaşıklık için **Yaratıcı & Yoğun** modlar ve süper örneklenmiş çıktılar için **HighRes** ölçekleme.
* **Komut Mühendisliği Araçları**:
  * **Sihirli Değnek ✨** — Kısa kelimeleri ve belirsiz komutları otomatik olarak zengin ve ayrıntılı açıklamalara dönüştürür.
  * **Canlı Komut Önizlemesi** — Komut karmaşıklığını ve uzunluk sınırlarını analiz eden dinamik görsel gösterge.
  * **Seçilmiş Stil Şablonları** — Topluluk tarafından hazırlanan estetik stilleri tek tıklamayla anında uygulayın.

### 🤖 Yapay Zeka Rol Yapma Sohbeti
* **Bağlamsal Karakter Hikayeleri** — Kapsamlı sistem komutları, anlatı ayarları ve flört simülasyonu mekanikleri içeren karakterlerle derin sohbetler.
* **Çok Aşamalı LLM Desteği** — Anlatı ihtiyaçlarınıza göre **Hızlı (Fast)**, **Dengeli (Balanced)** ve **Ultra (Gelişmiş)** yapay zeka modelleri arasında dinamik geçiş yapın.
* **Gerçek Zamanlı Duygu Analizi** — Canlı duygu analizi motoru, karakterin yanıtlarını analiz ederek yüz ifadesini hikayenin duygusal tonuna göre otomatik günceller.
* **Dinamik Kullanıcı Profilleri** — İsim, yaş ve cinsiyet tercihlerinizi özelleştirin; yapay zeka karakteri tonunu, hafıza sınırlarını ve yanıt yapılarını size özel olarak uyarlar.
* **The Warden Denetimi** — Ayarlanabilir seviyelere (Düşük / Orta / Yüksek) sahip entegre yerel içerik moderasyonu.
* **Arayüz Düzenleri** — Hızlı diyalog ilerlemesi için bir **Geç Düğmesi (Skip Button)** ve sohbet veritabanları için tam içe/dışa aktarma araçlarıyla birlikte akıcı ızgara, liste ve kompakt kütüphane görünümleri.

### 🖼️ Profesyonel Görüntü Düzenleyici
* **Yapay Zeka Outpaint** — Canvas sınırlarını dışa doğru genişleterek, yeni tanımlanan alanları yapay zeka ile bağlamsal olarak doldurun.
* **4K Yükseltme (Upscale)** — Gelişmiş süper-çözünürlük modelleri kullanarak görselleri tek tıklamayla 4K kalitesine yükseltin.
* **Görsel Birleştirme (Fusion)** — Karışım oranları ve hedef model adaptörleri aracılığıyla iki farklı görseli yapay zeka ile harmanlayıp birleştirin.
* **Gelişmiş İşleme Modelleri** — Hız/kalite göstergelerine göre rozetlerle ayrılmış modeller: **FAST (PixelFusion)**, **BEST (NeuralFlow)** ve **MAX (Synapse)**.
* **Cinsiyet Değişimi (Gender Swap) 🔄** — Asenkron sorgulama ve otomatik sonuç yerleştirme desteğiyle, bulut tabanlı yapay zeka worker hatlarını kullanarak insan özelliklerini dinamik olarak değiştirin.
* **Tahribatsız İnce Ayarlar** — Parlaklık, kontrast, sıcaklık ve doygunluk değerleri üzerinde tam kontrol.
* **İşaretleme ve Notlar** — Yerelleştirilmiş gerçek zamanlı aramaya sahip dahili fırçalar, metin araçları ve hazır fotoğraf filtreleri.

### 📖 Yapay Zeka Hikayeleri (Thena Toons)
* **Dikkati Dağıtmayan Okuma** — Webtoon formatına uygun, dikey akışlı okuma deneyimi.
* **Bölüm Durum Yöneticisi** — Doğrudan IndexedDB üzerinde önbelleğe alınan bölüm ilerlemelerini ("Devam Ediyor" ve "Tamamlandı") izler.
* **Tembel Yükleme (Lazy Loading)** — Yüksek çözünürlüklü çizgi roman sahneleri sadece ekrana girdiğinde yüklenerek CPU/GPU kaynaklarını korur.

### 🪙 Kredi ve Hediye Ekosistemi
* **Canlı Bakiye Takibi** — Ana başlıkta yer alan etkileşimli widget, güncellemelerde nabız gibi yanıp sönerek ve düşük kredilerde uyarı vererek mevcut token bakiyenizi gerçek zamanlı gösterir.
* **Detaylı Paket Analizi** — Farklı ücretli yapay zeka modelleri genelinde fiyat oranlarını (₺) karşılaştıran ve tahmini kullanımları gösteren detaylı karşılaştırma pencereleri.
* **Bağlantı Kodları** — Cihazlar arası veya kullanıcılar arası hediye kredileri güvenli bir şekilde göndermek ve almak için bağlantı kodunuzu kolayca paylaşın.
* **Güvenli Satın Alım Doğrulaması** — Anahtar onay kutuları ve hızlı API anahtarı kopyalama özellikleri ile yanlışlıkla çift sipariş verilmesini önleyin.

### 🎬 Sinematik Giriş ve Tanıtım Rehberi
* **Sinematik Giriş** — 8-bitlik prosedürel sentezleyici ses efektleri eşliğinde ilk açılışta dönen harflerle göz alıcı bir başlık animasyonu sunumu.
* **Etkileşimli Tur (Spotlight)** — Kullanıcılara modelleri, sihirli değneği, outpaint özelliğini ve ayarları nasıl kullanacaklarını öğreten adım adım vurgulama turu (19 etkileşimli adım).
* **Akıcı Geçişler ve Kapatma Seçenekleri** — İstediğiniz zaman atlanabilen veya ayarlar panelinden yeniden başlatılabilen, özel başarı sesleri ve görsel bildirimlerle donatılmış duyarlı maske katmanı.


### 📊 Performans ve Optimizasyon
* **Sistem HUD Göstergesi** — FPS, RAM kullanımı ve GPU render döngülerini izleyen, sürüklenebilir ve boyutu ayarlanabilir canlı performans paneli.
* **Güç Tasarrufu Motoru** — Sesi kapatmak, ağır CSS animasyonlarını duraklatmak ve Wake Lock API aracılığıyla ekran uyanıklığını yönetmek için sekme durumunu (görünürlük/boşta kalma) dinler.
* **DOM Sanallaştırma** — Binlerce mesajda bile takılmasız kaydırma sağlamak için sohbet mesajlarını belleği şişirmeden verimli şekilde yükler.

### 💾 Önce Yerel (Local-First) Gizlilik
* **Yerel Veritabanı** — Tüm özel karakterlerin, üretilen görsellerin, favorilerin ve sohbet geçmişinin cihazınızda çevrimdışı kalmasını sağlayan `IndexedDB` desteği.
* **Gizlilik Odaklı** — API anahtarları ve kişisel profil detayları, üçüncü taraf sunuculara gönderilmeden doğrudan tarayıcının `LocalStorage` alanında saklanır.

---

## 📂 Kod Tabanı Mimarisi ve Dosya Yapısı

Platformu yöneten temel betik modüllerinin ve dosyaların açıklamaları şu şekildedir:

```
Thena-Web/
├── index.html                  # Semantik yapısal giriş noktası ve düzen çerçevesi
├── trailer.html                # Bağımsız sinematik tanıtım fragmanı sunum katmanı
├── manifest.json               # PWA yapılandırması ve mobil ikon ayarları
├── css/
│   ├── style.css               # Birleştirilmiş stil sayfaları, tema motorları ve animasyonlar
│   ├── welcome.css             # Sinematik hoş geldiniz ekranı ve etkileşimli rehber stilleri
│   ├── trailer.css             # Video oynatıcı kapsayıcısı ve sinematik giriş stilleri
│   ├── editor-search.css       # Fotoğraf düzenleyici yerelleştirilmiş arama stilleri ve düzen kuralları
│   ├── model-gallery.css       # Yapay zeka model tarayıcı kart galerisi düzen stilleri
│   └── prompt-preview.css      # Görsel komut kelime analizleri ve katmanları için CSS stilleri
└── scripts/
    ├── script.js               # Ana uygulama denetleyicisi (Orkestratör ve Görsel Üretimi)
    ├── elements.js             # Seçici optimizasyonu için ÖNBELLEĞE ALINMIŞ DOM öğesi kaydı
    ├── lang.js                 # Yerelleştirme sözlükleri ve i18n çeviri motoru
    ├── aiChat.js               # Sohbet çerçevesi, karakter veritabanı ve sohbet arayüz mantığı
    ├── chatMessages.js         # Sohbet balonu şablon oluşturucuları ve liste render denetimleri
    ├── chatImageDownloader.js  # Sohbet balonları içindeki medya için eşzamansız indirme aracı
    ├── imageEditor.js          # Fotoğraf filtreleri, Canvas API işlemleri ve Outpaint/Fusion/Gender Swap araçları
    ├── aiStories.js            # Webtoon okuyucu denetleyicisi ve bölüm dizisi yükleyicisi
    ├── modelGallery.js         # Farklı görsel kontrol noktalarını sergileyen etkileşimli katalog
    ├── loadAllModels.js        # Sentez modelleri için detaylar ve varlıklar indirme aracı
    ├── favorites-backups.js    # Veri dışa/içe aktarma aracı ve IndexedDB yedekleme yönetimi
    ├── powerSaver.js           # Boşta kalma dedektörü, pil/wake lock durum yöneticisi
    ├── visibilityOptimizer.js  # Ekran dışı animasyonları duraklatan IntersectionObserver motoru
    ├── cpu.js                  # HUD teşhis ayrıştırıcısı (FPS, CPU ve RAM monitörü)
    ├── promptPreview.js        # Görsel komut uzunluğu ve anahtar kelime yoğunluğu göstergeleri
    ├── promptexpansion.js      # Komut genişletme motoru ("Sihirli Değnek" mantığı)
    ├── trailer.js              # Tanıtım fragmanı video denetleyicisi
    ├── welcome.js              # Sinematik giriş ve etkileşimli kullanım rehberi (tutorial)
    ├── credits.js              # Kredi sistemi entegrasyonu (hediye gönderme, paketler, bakiye sorgulama)
    ├── customSelect.js         # Özelleştirilmiş açılır menü (dropdown) seçim öğeleri yöneticisi
    └── sw.js                   # Çevrimdışı PWA kullanımı için Service Worker önbellek denetleyicisi
```

---

## 📸 Ekran Görüntüleri

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Ana Arayüz</b></td>
      <td align="center"><b>Gelişmiş Görüntü Düzenleyici</b></td>
    </tr>
    <tr>
      <td><a href="src/image_gen.webp"><img src="src/image_gen.webp" alt="Ana Arayüz" /></a></td>
      <td><a href="src/image_edit.webp"><img src="src/image_edit.webp" alt="Görüntü Düzenleyici" /></a></td>
    </tr>
  </table>
  <table>
    <tr>
      <td align="center"><b>Yapay Zeka Rol Yapma Sohbeti</b></td>
      <td align="center"><b>Yapay Zeka Hikayeleri (Webtoon)</b></td>
    </tr>
    <tr>
      <td><a href="src/chatbot.webp"><img src="src/chatbot.webp" alt="Yapay Zeka Sohbeti" /></a></td>
      <td><a href="src/thena_comic_page.webp"><img src="src/thena_comic_page.webp" alt="Yapay Zeka Hikayeleri Webtoon" /></a></td>
    </tr>
  </table>
  <table>
    <tr>
      <td align="center"><b>Galeri ve Filtreler</b></td>
      <td align="center"><b>Yapay Zeka Outpaint</b></td>
    </tr>
    <tr>
      <td><a href="src/gallery.webp"><img src="src/gallery.webp" alt="Galeri" /></a></td>
      <td><a href="src/outpaint_editor.webp"><img src="src/outpaint_editor.webp" alt="Yapay Zeka Outpaint" /></a></td>
    </tr>
  </table>

  <br />

  <details>
    <summary><b>Daha Fazla Ekran Görüntüsü Göster (Açmak için Tıklayın)</b></summary>
    <br />
    <table>
      <tr>
        <td align="center"><b>Sinematik Giriş</b></td>
        <td align="center"><b>Model Vitrini</b></td>
      </tr>
      <tr>
        <td><a href="src/trailer.webp"><img src="src/trailer.webp" alt="Sinematik Giriş" /></a></td>
        <td><a href="src/showcase.webp"><img src="src/showcase.webp" alt="Model Vitrini" /></a></td>
      </tr>
    </table>
    <table>
      <tr>
        <td align="center"><b>Sohbet — Açılış Sahnesi</b></td>
        <td align="center"><b>Sohbet — Hikaye Sonu</b></td>
      </tr>
      <tr>
        <td><a href="src/chat_start.webp"><img src="src/chat_start.webp" alt="Sohbet Başlangıcı" /></a></td>
        <td><a href="src/chat_end.webp"><img src="src/chat_end.webp" alt="Sohbet Sonu" /></a></td>
      </tr>
    </table>
    <table>
      <tr>
        <td align="center"><b>Gelişmiş Ayarlar</b></td>
        <td align="center"><b>Uygulama Seçici</b></td>
      </tr>
      <tr>
        <td><a href="src/adv_settings_image_gen.webp"><img src="src/adv_settings_image_gen.webp" alt="Gelişmiş Ayarlar" /></a></td>
        <td><a href="src/apps.webp"><img src="src/apps.webp" alt="Uygulama Seçici" /></a></td>
      </tr>
    </table>
    <table>
      <tr>
        <td align="center"><b>Komut Önizleme Modülü</b></td>
        <td align="center"><b>Ayarlar Paneli</b></td>
      </tr>
      <tr>
        <td><a href="src/prompt_preview.webp"><img src="src/prompt_preview.webp" alt="Komut Önizleme" /></a></td>
        <td><a href="src/settings.webp"><img src="src/settings.webp" alt="Ayarlar Paneli" /></a></td>
      </tr>
    </table>
    <table>
      <tr>
        <td align="center"><b>Galeri İstatistikleri</b></td>
        <td align="center"><b>Yapay Zeka Model Tarayıcısı</b></td>
      </tr>
      <tr>
        <td><a href="src/gallery_stats.webp"><img src="src/gallery_stats.webp" alt="Galeri İstatistikleri" /></a></td>
        <td><a href="src/model_showcase.webp"><img src="src/model_showcase.webp" alt="Model Tarayıcısı" /></a></td>
      </tr>
    </table>
  </details>
</div>

---

## 🛠️ Kurulum ve Kullanım

Thena tamamen tarayıcı tarafında çalışır. Sunucu yapılandırması veya veritabanı kurulumu gerekmez.

### Yöntem 1: Yerel Sunucu (Şiddetle Önerilir)
Tarayıcının CORS kısıtlamalarını aşmak ve gelişmiş PWA çevrimdışı önbelleklemesini etkinleştirmek için uygulamanın yerel bir HTTP sunucusu üzerinden çalıştırılması gerekir.

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/phaticusthiccy/Thena-Web.git
   ```
2. **Kök dizinde bir sunucu başlatın:**
   * **Python:** `python -m http.server 8000`
   * **NodeJS:** `npx http-server -p 8000`
   * **VS Code:** *Live Server* eklentisini yükleyin ve **"Go Live"** düğmesine tıklayın.
3. Tarayıcınızda `http://localhost:8000` adresini açın.

### Yöntem 2: Doğrudan Çalıştırma
Uygulama klasörünü indirip `index.html` dosyasına çift tıklayarak tarayıcınızda çalıştırabilirsiniz. *Not: Bazı tarayıcı güvenlik modelleri, dosya protokolü (`file:///`) üzerinden çalıştırıldığında IndexedDB erişimini veya service worker yüklemelerini sınırlayabilir.*

---

## 🔑 Yapılandırma ve API Anahtarı

Görsel üretimi özelliklerini kullanabilmek için bir API anahtarı gereklidir:
1. Uygulama ayarlarını açın (dişli simgesi ⚙️).
2. İlişkili botu açmak için **"Get Your Free API Key"** bağlantısına tıklayın.
3. Size verilen anahtarı kopyalayarak API Key alanına yapıştırın.
4. Anahtarınız tarayıcınızın `LocalStorage` alanında güvenli bir şekilde saklanır ve sadece doğrudan model üretim uç noktalarına gönderilir.

---

## 🧩 Teknoloji Yığını

| Teknoloji | Uygulama Kapsamı |
| :--- | :--- |
| **HTML5** | Semantik yapı, dinamik şablon enjeksiyonu ve duyarlı yapısal bileşenler. |
| **CSS3** | Premium arayüz estetiği, Glassmorphism stilleri, koyu/açık tema motoru ve performans odaklı animasyonlar. |
| **JavaScript (ES6+)** | Yerel eşzamansız akış, Canvas manipülasyonları, modüler betik yükleyici ve IndexedDB orkestrasyonu. |
| **IndexedDB** | Üretilen görsellerin, geçmiş durumların, sohbet odalarının ve özel meta verilerin yüksek kapasiteli çevrimdışı depolanması. |
| **Web Audio API** | Gerçek zamanlı arayüz ses sentezi ve ses mekansallaştırması. |
| **Canvas API** | Tarayıcı tarafında gerçek zamanlı kırpma, filtreleme ve ölçeklendirme ayarlamaları. |
| **Service Workers** | Çevrimdışı PWA kullanımı için ön yükleme, ağ önbellekleme stratejileri ve masaüstüne/telefona yüklenebilirlik. |

---

## 🤝 Katkıda Bulunma

Performansı iyileştirmek, yeni özellik modülleri eklemek veya tasarımı hassaslaştırmak için katkılarınızı bekliyoruz:

1. Depoyu **Fork** edin (çatallayın).
2. Kendi özellik dalınızı oluşturun: `git checkout -b feature/amazing-feature`
3. Değişikliklerinizi commit edin ([Conventional Commits](https://www.conventionalcommits.org/) formatına uygun olarak): `git commit -m 'feat: add amazing new feature'`
4. Dalı push edin: `git push origin feature/amazing-feature`
5. Bir **Pull Request** açın.

---

## 📝 Lisans

Bu proje MIT Lisansı altında dağıtılmaktadır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.

<div align="center">
  <br />
  <p>Tutkuyla geliştiren: <a href="https://t.me/phaticusthiccy"><b>@phaticusthiccy</b></a></p>
  <p><i>❤️ ve bolca ☕ ile yapıldı.</i></p>
  <br />
  <a href="https://phaticusthiccy.github.io/Thena-Web/">
    <img src="https://img.shields.io/badge/⭐%20Bu%20repoyu%20y%C4%B1ld%C4%B1zlay%C4%B1n-f59e0b?style=for-the-badge" alt="Bu repoyu yıldızlayın" />
  </a>
</div>
