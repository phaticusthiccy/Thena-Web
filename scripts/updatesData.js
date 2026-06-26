window.thenaUpdates = [
  {
    "id": "v3.8.3",
    "version": "3.8.3",
    "title": {
      "en": "THENA PATCH NOTES v3.8.3",
      "tr": "THENA GÜNCELLEME NOTLARI v3.8.3"
    },
    "subtitle": {
      "en": "Niji 7 model release, service worker reliability, and onboarding fixes.",
      "tr": "Niji 7 model lansmanı, servis çalışanı kararlılığı ve başlangıç turu düzeltmeleri."
    },
    "category": {
      "en": "System & Model Updates",
      "tr": "Sistem & Model Güncellemeleri"
    },
    "author": "Thena Dev Team",
    "date": "27/06/2026",
    "bannerImage": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "SERVICE WORKER & CACHING",
          "tr": "SERVİS ÇALIŞANI & ÖNBELLEKLEME"
        },
        "intro": {
          "en": "Improvements to offline caching reliability and service worker resiliency.",
          "tr": "Çevrimdışı önbellekleme güvenilirliği ve servis çalışanı kararlılığı iyileştirildi."
        },
        "groups": [
          {
            "name": {
              "en": "Fault-Tolerant Cache",
              "tr": "Hata Toleranslı Önbellek"
            },
            "items": [
              {
                "en": "Implemented fault-tolerant caching in the service worker, allowing installation to succeed even if individual resources fail.",
                "tr": "Tekil kaynaklar yüklenemese bile kurulumun başarılı olmasını sağlamak için servis çalışanında hata toleranslı önbellekleme uygulandı."
              },
              {
                "en": "Added updates.js script to the precached assets list for offline functionality.",
                "tr": "Çevrimdışı işlevsellik için updates.js betiği önbelleğe alınacak varlıklar listesine eklendi."
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "MODEL UPDATES",
          "tr": "MODEL GÜNCELLEMELERİ"
        },
        "intro": {
          "en": "We updated our active generation models catalog.",
          "tr": "Aktif görsel oluşturma modelleri kataloğumuzu güncelledik."
        },
        "groups": [
          {
            "name": {
              "en": "Model Changes",
              "tr": "Model Değişiklikleri"
            },
            "items": [
              {
                "en": "Added Niji 7 model support for advanced anime and cartoon generation.",
                "tr": "Gelişmiş anime ve çizgi film tasarımları için Niji 7 modeli desteği eklendi."
              },
              {
                "en": "Removed the deprecated Thena Anime Fast model.",
                "tr": "Artık kullanılmayan eski Thena Anime Fast modeli sistemden kaldırıldı."
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "SYSTEM & UI STABILITY",
          "tr": "SİSTEM & ARAYÜZ KARARLILIĞI"
        },
        "intro": {
          "en": "Onboarding logic refinements and standard styling alignments.",
          "tr": "Rehber mantığı iyileştirmeleri ve standart stil hizalamaları."
        },
        "groups": [
          {
            "name": {
              "en": "UI & Logic Fixes",
              "tr": "Arayüz & Mantık Düzeltmeleri"
            },
            "items": [
              {
                "en": "Restricted update read markers to trigger only after the initial onboarding tutorial is completed.",
                "tr": "Güncelleme okundu işaretleyicisinin tetiklenmesi yalnızca başlangıç rehber turu tamamlandıktan sonrasına kısıtlandı."
              },
              {
                "en": "Added modern line-clamp and appearance declarations for better CSS rendering compatibility across newer browser engines.",
                "tr": "Daha yeni tarayıcı motorlarında daha iyi CSS işleme uyumluluğu için modern line-clamp ve appearance bildirimleri eklendi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.8.2",
    "version": "3.8.2",
    "title": {
      "en": "THENA PATCH NOTES v3.8.2",
      "tr": "THENA GÜNCELLEME NOTLARI v3.8.2"
    },
    "subtitle": {
      "en": "Brand new Updates Hub, glowing notification toasts, and layout fixes.",
      "tr": "Yepyeni Güncelleme Paneli, parlayan bildirim kutuları ve arayüz düzeltmeleri."
    },
    "category": {
      "en": "Feature Release",
      "tr": "Özellik Güncellemesi"
    },
    "author": "Thena Dev Team",
    "date": "25/06/2026",
    "bannerImage": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "UPDATES HUB & NOTIFICATIONS",
          "tr": "GÜNCELLEME PANELİ & BİLDİRİMLER"
        },
        "intro": {
          "en": "We have integrated a premium Updates Hub and high-tech notifications.",
          "tr": "Yepyeni bir Güncelleme Paneli ve yüksek teknolojili bildirimler ekledik."
        },
        "groups": [
          {
            "name": {
              "en": "UI & Sound FX",
              "tr": "Arayüz & Ses Efektleri"
            },
            "items": [
              {
                "en": "Added a sliding HUD updates toast with laser scanlines and glowing brackets.",
                "tr": "Lazer tarama çizgileri ve parlayan çerçevelere sahip, kayarak açılan bir güncelleme bildirim kutusu eklendi."
              },
              {
                "en": "Synthesized a premium sci-fi sound chime using Web Audio API for offline compatibility.",
                "tr": "Çevrimdışı ve yerel kullanım için Web Audio API tabanlı fütüristik bir bilim kurgu ses efekti entegre edildi."
              },
              {
                "en": "Fully integrated Turkish and English language switching for the updates log.",
                "tr": "Güncelleme günlükleri için Türkçe ve İngilizce dil değiştirme desteği tam entegre edildi."
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "BUG FIXES",
          "tr": "HATA DÜZELTMELERİ"
        },
        "intro": {
          "en": "Layout alignments and responsiveness improvements.",
          "tr": "Arayüz hizalamaları ve mobil uyumluluk geliştirmeleri."
        },
        "groups": [
          {
            "name": {
              "en": "Prompt Textarea",
              "tr": "Prompt Yazı Alanı"
            },
            "items": [
              {
                "en": "Fixed height resizing overlap for prompt inputs on initial reload and mobile layout switches.",
                "tr": "Sayfanın ilk yüklenmesinde ve mobil ekrana geçişlerde prompt giriş alanının üst üste binme ve yükseklik boyutu hataları giderildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.8",
    "version": "3.8.0",
    "title": {
      "en": "THENA PATCH NOTES v3.8",
      "tr": "THENA GÜNCELLEME NOTLARI v3.8"
    },
    "subtitle": {
      "en": "API integration and advanced tutorial onboarding.",
      "tr": "API entegrasyonu ve gelişmiş başlangıç rehberi."
    },
    "category": {
      "en": "System Updates",
      "tr": "Sistem Güncellemeleri"
    },
    "author": "Thena Dev Team",
    "date": "25/06/2026",
    "bannerImage": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "API DOCUMENTATION",
          "tr": "API DÖKÜMANTASYONU"
        },
        "intro": {
          "en": "We have launched our public developer documentation, allowing you to integrate Thena's AI services into your own apps.",
          "tr": "Geliştiricilerin Thena yapay zeka servislerini kendi uygulamalarına entegre etmesi için genel API dökümantasyonunu yayınladık."
        },
        "groups": [
          {
            "name": {
              "en": "Developer Portal",
              "tr": "Geliştirici Portalı"
            },
            "items": [
              {
                "en": "Added a new full-featured API documentation page (api.html).",
                "tr": "Yeni, tam özellikli API dökümantasyon sayfası eklendi (api.html)."
              },
              {
                "en": "Detailed API request/response examples and authentication guides included.",
                "tr": "Detaylı API istek/yanıt örnekleri ve kimlik doğrulama rehberleri eklendi."
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "ONBOARDING & FIXES",
          "tr": "REHBERLİK & DÜZELTMELER"
        },
        "intro": {
          "en": "Tutorial enhancements and mobile gallery fixes.",
          "tr": "Rehberlik iyileştirmeleri ve mobil galeri düzeltmeleri."
        },
        "groups": [
          {
            "name": {
              "en": "Interactive Guide",
              "tr": "Etkileşimli Rehber"
            },
            "items": [
              {
                "en": "Added new steps and cleaner instructions to the first-time user tutorial flow.",
                "tr": "İlk kez giren kullanıcılar için hazırlanan eğitim turu akışına yeni adımlar ve daha net yönergeler eklendi."
              },
              {
                "en": "Fixed download button interaction inside the gallery modal on mobile devices.",
                "tr": "Mobil cihazlarda galeri modalındaki indirme butonu etkileşimi düzeltildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.7.4",
    "version": "3.7.4",
    "title": {
      "en": "THENA PATCH NOTES v3.7.4",
      "tr": "THENA GÜNCELLEME NOTLARI v3.7.4"
    },
    "subtitle": {
      "en": "Seedream 4 model launch and Credit Center refinements.",
      "tr": "Seedream 4 model lansmanı ve Kredi Merkezi iyileştirmeleri."
    },
    "category": {
      "en": "Model & Balance",
      "tr": "Model & Bakiye"
    },
    "author": "Thena Dev Team",
    "date": "18/06/2026",
    "bannerImage": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "NEW AI MODEL",
          "tr": "YENİ YAPAY ZEKA MODELİ"
        },
        "intro": {
          "en": "Introducing the next generation of visual rendering.",
          "tr": "Görsel işleme teknolojisinin yeni nesliyle tanışın."
        },
        "groups": [
          {
            "name": {
              "en": "Seedream 4 Integration",
              "tr": "Seedream 4 Entegrasyonu"
            },
            "items": [
              {
                "en": "Added Seedream 4 model support for creative and ultra-detailed prompts.",
                "tr": "Yaratıcı ve ultra detaylı promptlar için Seedream 4 modeli desteği eklendi."
              },
              {
                "en": "Integrated Seedream 4 presets into the model selector gallery.",
                "tr": "Seedream 4 hazır ayarları model seçici galerisine entegre edildi."
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "CREDIT CENTER OPTIMIZATIONS",
          "tr": "KREDİ MERKEZİ OPTİMİZASYONLARI"
        },
        "intro": {
          "en": "Refining package comparisons and credit calculations.",
          "tr": "Paket karşılaştırmaları ve kredi hesaplamaları iyileştirildi."
        },
        "groups": [
          {
            "name": {
              "en": "UI Refinements",
              "tr": "Arayüz İyileştirmeleri"
            },
            "items": [
              {
                "en": "Optimized the comparison table view for credit packages on smaller devices.",
                "tr": "Küçük ekranlı cihazlarda kredi paketleri karşılaştırma tablosu görünümü optimize edildi."
              },
              {
                "en": "Enhanced user connection code validations for secure gift credit transfers.",
                "tr": "Güvenli hediye kredi transferleri için kullanıcı bağlantı kodu doğrulamaları geliştirildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.7",
    "version": "3.7.0",
    "title": {
      "en": "THENA PATCH NOTES v3.7",
      "tr": "THENA GÜNCELLEME NOTLARI v3.7"
    },
    "subtitle": {
      "en": "Major Release: Credit Center, payments, and gift transactions.",
      "tr": "Büyük Güncelleme: Kredi Merkezi, ödemeler ve hediye işlemleri."
    },
    "category": {
      "en": "Feature Release",
      "tr": "Özellik Güncellemesi"
    },
    "author": "Thena Dev Team",
    "date": "18/06/2026",
    "bannerImage": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "CREDIT CENTER LAUNCH",
          "tr": "KREDİ MERKEZİ LANSMANI"
        },
        "intro": {
          "en": "We have launched the Credit Center to help you manage and purchase generation packages.",
          "tr": "Görsel üretme paketlerinizi yönetmeniz ve satın almanız için Kredi Merkezi'ni yayına aldık."
        },
        "groups": [
          {
            "name": {
              "en": "Packages & Statistics",
              "tr": "Paketler & İstatistikler"
            },
            "items": [
              {
                "en": "Five package tiers introduced: Starter, Standard, Popular, Pro, and Ultra.",
                "tr": "Beş farklı paket seviyesi tanıtıldı: Başlangıç, Standart, Popüler, Pro ve Ultra."
              },
              {
                "en": "Added detailed statistics tracking purchased, used, sent, and received gift credits.",
                "tr": "Satın alınan, harcanan, gönderilen ve alınan hediye kredileri takip eden detaylı istatistik paneli eklendi."
              },
              {
                "en": "Secure Shopier integration added for credit package checkouts.",
                "tr": "Kredi paketi ödemeleri için güvenli Shopier entegrasyonu sağlandı."
              }
            ]
          },
          {
            "name": {
              "en": "Gift Credit Transfers",
              "tr": "Hediye Kredi Gönderimi"
            },
            "items": [
              {
                "en": "Send credits instantly to peers using unique connection codes.",
                "tr": "Benzersiz bağlantı kodlarını kullanarak diğer kullanıcılara anında kredi gönderin."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.6.5",
    "version": "3.6.5",
    "title": {
      "en": "THENA PATCH NOTES v3.6.5",
      "tr": "THENA GÜNCELLEME NOTLARI v3.6.5"
    },
    "subtitle": {
      "en": "Interactive guide tour for onboarding.",
      "tr": "Başlangıç için interaktif rehberlik turu."
    },
    "category": {
      "en": "User Onboarding",
      "tr": "Kullanıcı Deneyimi"
    },
    "author": "Thena Dev Team",
    "date": "15/06/2026",
    "bannerImage": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "INTERACTIVE TUTORIAL",
          "tr": "ETKİLEŞİMLİ EĞİTİM TURU"
        },
        "intro": {
          "en": "Helping new users find their way around Thena's core features.",
          "tr": "Yeni kullanıcıların Thena'nın temel özelliklerini kolayca öğrenmesine yardımcı oluyoruz."
        },
        "groups": [
          {
            "name": {
              "en": "Onboarding Flow",
              "tr": "İlk Katılım Akışı"
            },
            "items": [
              {
                "en": "Designed a step-by-step tour covering API key setup, model selector, prompt inputs, and history.",
                "tr": "API anahtarı kurulumu, model seçimi, prompt girişleri ve geçmişi kapsayan adım adım eğitim akışı tasarlandı."
              },
              {
                "en": "Added a 'Start Tutorial' option under Settings to replay the tour at any time.",
                "tr": "Eğitim turunu dilediğiniz zaman tekrar oynatabilmeniz için Ayarlar menüsüne 'Eğitimi Başlat' seçeneği eklendi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.6.2",
    "version": "3.6.2",
    "title": {
      "en": "THENA PATCH NOTES v3.6.2",
      "tr": "THENA GÜNCELLEME NOTLARI v3.6.2"
    },
    "subtitle": {
      "en": "Image Editor upgrades and layout optimizations.",
      "tr": "Görsel Düzenleyici yükseltmeleri ve arayüz optimizasyonları."
    },
    "category": {
      "en": "Optimizations",
      "tr": "Optimizasyonlar"
    },
    "author": "Thena Dev Team",
    "date": "10/06/2026",
    "bannerImage": "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "EDITOR IMPROVEMENTS",
          "tr": "DÜZENLEYİCİ İYİLEŞTİRMELERİ"
        },
        "intro": {
          "en": "Better preset grids and code cleanup.",
          "tr": "Daha iyi hazır ayar ızgaraları ve kod temizliği."
        },
        "groups": [
          {
            "name": {
              "en": "Layout & Presets",
              "tr": "Düzen & Hazır Ayarlar"
            },
            "items": [
              {
                "en": "Transformed preset lists into clean, responsive grids on mobile screen sizes.",
                "tr": "Mobil ekranlarda hazır ayar listeleri temiz ve duyarlı ızgaralara dönüştürüldü."
              },
              {
                "en": "Removed deprecated model recomendations script to reduce page load footprint.",
                "tr": "Sayfa boyutunu küçültmek için artık kullanılmayan eski model önerileri betiği kaldırıldı."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.6",
    "version": "3.6.0",
    "title": {
      "en": "THENA PATCH NOTES v3.6",
      "tr": "THENA GÜNCELLEME NOTLARI v3.6"
    },
    "subtitle": {
      "en": "Major Launch: AI Image Editor, AI Chat Bots, and Story Mode.",
      "tr": "Büyük Lansman: AI Görsel Düzenleyici, AI Sohbet Botları ve Hikaye Modu."
    },
    "category": {
      "en": "Feature Release",
      "tr": "Özellik Güncellemesi"
    },
    "author": "Thena Dev Team",
    "date": "07/06/2026",
    "bannerImage": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "AI IMAGE EDITOR",
          "tr": "AI GÖRSEL DÜZENLEYİCİ"
        },
        "intro": {
          "en": "A brand new dashboard for advanced AI-driven image editing.",
          "tr": "Yapay zeka destekli gelişmiş görsel düzenleme için yepyeni bir panel."
        },
        "groups": [
          {
            "name": {
              "en": "Editing Utilities",
              "tr": "Düzenleme Araçları"
            },
            "items": [
              {
                "en": "Outpaint support: Expand image boundaries in any direction using AI.",
                "tr": "Outpaint desteği: Yapay zeka ile görsel sınırlarını dilediğiniz yöne genişletin."
              },
              {
                "en": "UHD 4K Upscale: Enhance image resolutions up to 4K definition.",
                "tr": "UHD 4K Yükseltme: Görsel çözünürlüklerini 4K kalitesine yükseltin."
              },
              {
                "en": "Gender Swap: Modify human genders in generated pictures seamlessly.",
                "tr": "Cinsiyet Değişimi: Üretilen görsellerdeki insan cinsiyetlerini sorunsuzca dönüştürün."
              },
              {
                "en": "Fusion: Blend two images together using intelligent blend ratios.",
                "tr": "Füzyon: Akıllı karışım oranları ile iki görseli birbiriyle harmanlayın."
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "AI CHAT BOTS",
          "tr": "AI SOHBET BOTLARI"
        },
        "intro": {
          "en": "Chat with custom characters and play interactive scenarios.",
          "tr": "Özel karakterlerle sohbet edin ve etkileşimli senaryolar oynayın."
        },
        "groups": [
          {
            "name": {
              "en": "Roleplay & Stories",
              "tr": "Rol Yapma & Hikayeler"
            },
            "items": [
              {
                "en": "Added interactive roleplay chatbots with custom character templates.",
                "tr": "Özel karakter şablonlarına sahip etkileşimli rol yapma sohbet botları eklendi."
              },
              {
                "en": "Implemented Story mode for interactive adventure story generation.",
                "tr": "Etkileşimli macera hikayeleri oluşturabilmeniz için Hikaye modu yayına alındı."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.5.9",
    "version": "3.5.9",
    "title": {
      "en": "THENA PATCH NOTES v3.5.9",
      "tr": "THENA GÜNCELLEME NOTLARI v3.5.9"
    },
    "subtitle": {
      "en": "General bugfixes and service worker optimizations.",
      "tr": "Genel hata düzeltmeleri ve servis çalışanı optimizasyonları."
    },
    "category": {
      "en": "Maintenance",
      "tr": "Bakım & İyileştirme"
    },
    "author": "Thena Dev Team",
    "date": "30/05/2026",
    "bannerImage": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "STABILITY FIXES",
          "tr": "KARARLILIK GÜNCELLEMELERİ"
        },
        "intro": {
          "en": "We resolved caching delays and refined model config parameters.",
          "tr": "Önbellekleme gecikmelerini çözdük ve model yapılandırma parametrelerini iyileştirdik."
        },
        "groups": [
          {
            "name": {
              "en": "Service Worker updates",
              "tr": "Servis Çalışanı güncellemeleri"
            },
            "items": [
              {
                "en": "Optimized offline assets caching scripts to prevent layout delay during launch.",
                "tr": "Sayfa yüklenirken yaşanan tasarım gecikmelerini önlemek için servis çalışanı çevrimdışı önbellekleme betikleri optimize edildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.5.6",
    "version": "3.5.6",
    "title": {
      "en": "THENA PATCH NOTES v3.5.6",
      "tr": "THENA GÜNCELLEME NOTLARI v3.5.6"
    },
    "subtitle": {
      "en": "New AI models, chat improvements, and profile styling.",
      "tr": "Yeni yapay zeka modelleri, sohbet geliştirmeleri ve profil tasarımı."
    },
    "category": {
      "en": "Feature Release",
      "tr": "Özellik Güncellemesi"
    },
    "author": "Thena Dev Team",
    "date": "21/05/2026",
    "bannerImage": "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "AI CHATAPP OVERHAUL",
          "tr": "YAPAY ZEKA SOHBET GÜNCELLEMELERİ"
        },
        "intro": {
          "en": "New onboarding options, bugfixes, and character configurations.",
          "tr": "Yeni katılım seçenekleri, hata düzeltmeleri ve karakter yapılandırmaları."
        },
        "groups": [
          {
            "name": {
              "en": "Chat App Updates",
              "tr": "Sohbet Uygulaması Yenilikleri"
            },
            "items": [
              {
                "en": "Added a 'Skip' button for onboarding chats.",
                "tr": "Sohbete başlarken çıkan katılım aşamaları için 'Geç' (Skip) butonu eklendi."
              },
              {
                "en": "Fixed user name, age, and gender parameters display inside message bubbles.",
                "tr": "Mesaj balonlarında kullanıcının adı, yaş ve cinsiyet parametrelerinin gösterimi düzeltildi."
              },
              {
                "en": "Implemented dynamic season lengths for Thena Toons webtoons.",
                "tr": "Thena Toons çizgi romanları için dinamik sezon uzunluğu desteği uygulandı."
              },
              {
                "en": "Added new user info panel styles and character creation menu in AI Chat.",
                "tr": "Yapay Zeka Sohbet uygulamasında yeni kullanıcı bilgi paneli stilleri ve karakter oluşturma menüsü eklendi."
              }
            ]
          },
          {
            "name": {
              "en": "Model Updates",
              "tr": "Model Güncellemeleri"
            },
            "items": [
              {
                "en": "Integrated a new custom finetuned model to the image generator list.",
                "tr": "Görsel oluşturucu listesine yeni bir ince ayarlı yapay zeka modeli entegre edildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.5.3",
    "version": "3.5.3",
    "title": {
      "en": "THENA PATCH NOTES v3.5.3",
      "tr": "THENA GÜNCELLEME NOTLARI v3.5.3"
    },
    "subtitle": {
      "en": "Layout alignments and performance updates.",
      "tr": "Arayüz hizalamaları ve performans güncellemeleri."
    },
    "category": {
      "en": "Optimizations",
      "tr": "Optimizasyonlar"
    },
    "author": "Thena Dev Team",
    "date": "08/05/2026",
    "bannerImage": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "MOBILE ALIGNMENTS",
          "tr": "MOBİL HİZALAMALAR"
        },
        "intro": {
          "en": "Adjustments for mobile screen sizes and responsiveness.",
          "tr": "Mobil ekran boyutları ve duyarlılık için ayarlamalar yapıldı."
        },
        "groups": [
          {
            "name": {
              "en": "UI Corrections",
              "tr": "Arayüz Düzenlemeleri"
            },
            "items": [
              {
                "en": "Adjusted the custom presets container boundaries to fit mobile display orientations.",
                "tr": "Hazır ayar (presets) kutusunun sınırları, mobil ekran yönelimlerine sığacak şekilde düzenlendi."
              },
              {
                "en": "Fixed lag spikes caused by loading large model preview thumbnails.",
                "tr": "Büyük model önizleme resimlerinin yüklenmesinden kaynaklanan anlık gecikmeler giderildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.5",
    "version": "3.5.0",
    "title": {
      "en": "THENA PATCH NOTES v3.5",
      "tr": "THENA GÜNCELLEME NOTLARI v3.5"
    },
    "subtitle": {
      "en": "Major performance improvements and UI tweaks.",
      "tr": "Büyük performans geliştirmeleri ve arayüz rötuşları."
    },
    "category": {
      "en": "Performance Release",
      "tr": "Performans Sürümü"
    },
    "author": "Thena Dev Team",
    "date": "01/05/2026",
    "bannerImage": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "RENDERING PERFORMANCE",
          "tr": "GÖRSELLEŞTİRME PERFORMANSI"
        },
        "intro": {
          "en": "Core enhancements for faster dashboard loading.",
          "tr": "Kontrol panelinin daha hızlı yüklenmesi için temel geliştirmeler."
        },
        "groups": [
          {
            "name": {
              "en": "Engine Upgrades",
              "tr": "Motor Güncellemeleri"
            },
            "items": [
              {
                "en": "Optimized drawing loops for outpainting canvas buffers.",
                "tr": "Outpainting tuval tamponları için çizim döngüleri optimize edildi."
              },
              {
                "en": "Reduced RAM overhead during multiple batch rendering requests.",
                "tr": "Çoklu toplu görsel oluşturma istekleri sırasında RAM kullanımı azaltıldı."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.4.6",
    "version": "3.4.6",
    "title": {
      "en": "THENA PATCH NOTES v3.4.6",
      "tr": "THENA GÜNCELLEME NOTLARI v3.4.6"
    },
    "subtitle": {
      "en": "Memory footprint reductions.",
      "tr": "Bellek kullanımının azaltılması."
    },
    "category": {
      "en": "Maintenance",
      "tr": "Bakım & İyileştirme"
    },
    "author": "Thena Dev Team",
    "date": "28/04/2026",
    "bannerImage": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "MEMORY OPTIMIZATIONS",
          "tr": "BELLEK OPTİMİZASYONLARI"
        },
        "intro": {
          "en": "We optimized background cache configurations.",
          "tr": "Arka plan önbellek yapılandırmalarını optimize ettik."
        },
        "groups": [
          {
            "name": {
              "en": "Image Caching",
              "tr": "Görsel Önbellekleme"
            },
            "items": [
              {
                "en": "Optimized image buffer releases inside the browser storage mapping to free memory.",
                "tr": "Bellek tasarrufu için tarayıcı depolama haritasındaki görsel tamponlarının serbest bırakılması optimize edildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.4.4",
    "version": "3.4.4",
    "title": {
      "en": "THENA PATCH NOTES v3.4.4",
      "tr": "THENA GÜNCELLEME NOTLARI v3.4.4"
    },
    "subtitle": {
      "en": "Minor visual and preset card fixes.",
      "tr": "Ufak görsel ve hazır ayar kartı düzeltmeleri."
    },
    "category": {
      "en": "Bug Fixes",
      "tr": "Hata Düzeltmeleri"
    },
    "author": "Thena Dev Team",
    "date": "27/04/2026",
    "bannerImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "PRESET CARD FIXES",
          "tr": "KART DÜZELTMELERİ"
        },
        "intro": {
          "en": "Minor visual alignment issues resolved.",
          "tr": "Küçük görsel hizalama sorunları çözüldü."
        },
        "groups": [
          {
            "name": {
              "en": "Visual adjustments",
              "tr": "Görsel ayarlamalar"
            },
            "items": [
              {
                "en": "Fixed preset card selection states being cleared too early.",
                "tr": "Hazır ayar kartlarının seçili durumlarının beklenenden önce temizlenmesi hatası giderildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.4.2",
    "version": "3.4.2",
    "title": {
      "en": "THENA PATCH NOTES v3.4.2",
      "tr": "THENA GÜNCELLEME NOTLARI v3.4.2"
    },
    "subtitle": {
      "en": "Asset caching updates.",
      "tr": "Varlık önbellekleme güncellemeleri."
    },
    "category": {
      "en": "Optimizations",
      "tr": "Optimizasyonlar"
    },
    "author": "Thena Dev Team",
    "date": "25/04/2026",
    "bannerImage": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "CACHE REFINEMENTS",
          "tr": "ÖNBELLEK DÜZENLEMELERİ"
        },
        "intro": {
          "en": "Optimized service worker loading files.",
          "tr": "Servis çalışanının (service worker) yükleme dosyaları optimize edildi."
        },
        "groups": [
          {
            "name": {
              "en": "Precache rules",
              "tr": "Ön-bellek kuralları"
            },
            "items": [
              {
                "en": "Updated service worker lists to include new assets and decrease loading latency.",
                "tr": "Yeni eklenen grafik varlıklarını kapsayacak ve sayfa açılış hızını artıracak şekilde servis çalışanı listeleri güncellendi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.4",
    "version": "3.4.0",
    "title": {
      "en": "THENA PATCH NOTES v3.4",
      "tr": "THENA GÜNCELLEME NOTLARI v3.4"
    },
    "subtitle": {
      "en": "Image Editor model selections and UI fixes.",
      "tr": "Görsel Düzenleyici model seçimleri ve arayüz düzeltmeleri."
    },
    "category": {
      "en": "Bug Fixes",
      "tr": "Hata Düzeltmeleri"
    },
    "author": "Thena Dev Team",
    "date": "23/04/2026",
    "bannerImage": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "MODEL SELECTION FIX",
          "tr": "MODEL SEÇİM DÜZELTMESİ"
        },
        "intro": {
          "en": "Resolved critical model selector lockups.",
          "tr": "Görsel düzenleyicideki kritik model seçici kilitlenmeleri çözüldü."
        },
        "groups": [
          {
            "name": {
              "en": "Image Editor Model selection",
              "tr": "Görsel Düzenleyici Model Seçimi"
            },
            "items": [
              {
                "en": "Fixed model selection dropdown behavior on the Image Editor application tab.",
                "tr": "Görsel Düzenleyici sekmesindeki model seçimi açılır kutusunun beklenmedik şekilde kilitlenmesi giderildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.3",
    "version": "3.3.0",
    "title": {
      "en": "THENA PATCH NOTES v3.3",
      "tr": "THENA GÜNCELLEME NOTLARI v3.3"
    },
    "subtitle": {
      "en": "Elements descriptions and Model Gallery loading.",
      "tr": "Element açıklamaları ve Model Galerisi yüklenmesi."
    },
    "category": {
      "en": "Feature Release",
      "tr": "Özellik Güncellemesi"
    },
    "author": "Thena Dev Team",
    "date": "17/04/2026",
    "bannerImage": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "GALLERY & ELEMENTS OVERLAY",
          "tr": "GALERİ & ELEMENT DETAYLARI"
        },
        "intro": {
          "en": "Added styled information pages for Elements layers.",
          "tr": "Model stilleri (Elementler) için detaylı bilgi pencereleri eklendi."
        },
        "groups": [
          {
            "name": {
              "en": "Elements Page",
              "tr": "Elementler Sayfası"
            },
            "items": [
              {
                "en": "Added Elements information page detailing styling options.",
                "tr": "Modellerin üstüne eklenebilen stil katmanlarını açıklayan Element Bilgilendirme sayfası eklendi."
              },
              {
                "en": "Applied a sleek new styling to the Elements information overlay panel.",
                "tr": "Element bilgilendirme paneli için yepyeni, parlayan siber tasarım uygulandı."
              },
              {
                "en": "Bugfix: Resolved loading bottlenecks inside the finetuned models gallery modal.",
                "tr": "Hata Düzeltme: İnce ayarlı model galerisi modalının yüklenmesindeki yavaşlıklar giderildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.2.1",
    "version": "3.2.1",
    "title": {
      "en": "THENA PATCH NOTES v3.2.1",
      "tr": "THENA GÜNCELLEME NOTLARI v3.2.1"
    },
    "subtitle": {
      "en": "Translations corrections.",
      "tr": "Dil ve çeviri düzeltmeleri."
    },
    "category": {
      "en": "Maintenance",
      "tr": "Bakım & İyileştirme"
    },
    "author": "Thena Dev Team",
    "date": "11/04/2026",
    "bannerImage": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "TRANSLATION TWEAKS",
          "tr": "ÇEVİRİ DÜZELTMELERİ"
        },
        "intro": {
          "en": "Correcting Turkish and English wording mismatches.",
          "tr": "Türkçe ve İngilizce kelime uyuşmazlıkları giderildi."
        },
        "groups": [
          {
            "name": {
              "en": "Language",
              "tr": "Dil Desteği"
            },
            "items": [
              {
                "en": "Corrected several grammatical inconsistencies inside English and Turkish configuration files.",
                "tr": "İngilizce ve Türkçe dil dosyalarında bulunan bazı yazım ve anlam uyumsuzlukları giderildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.2",
    "version": "3.2.0",
    "title": {
      "en": "THENA PATCH NOTES v3.2",
      "tr": "THENA GÜNCELLEME NOTLARI v3.2"
    },
    "subtitle": {
      "en": "Model sorting menus and preset grids.",
      "tr": "Model sıralama menüleri ve hazır ayar ızgaraları."
    },
    "category": {
      "en": "Feature Release",
      "tr": "Özellik Güncellemesi"
    },
    "author": "Thena Dev Team",
    "date": "09/04/2026",
    "bannerImage": "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "SORTING & GRIDS",
          "tr": "SIRALAMA & IZGARALAR"
        },
        "intro": {
          "en": "Better list management across models and editor filters.",
          "tr": "Modeller ve editör filtreleri genelinde daha iyi liste yönetimi."
        },
        "groups": [
          {
            "name": {
              "en": "Model Selection sorting",
              "tr": "Model Sıralama Seçenekleri"
            },
            "items": [
              {
                "en": "Introduced dynamic Model Sorting Menu inside the Finetuned Model Gallery.",
                "tr": "İnce Ayarlı Model Galerisi içerisine dinamik Model Sıralama Menüsü eklendi."
              },
              {
                "en": "Fixed grid alignment offsets for Preset Selection panels inside the Image Editor.",
                "tr": "Görsel düzenleyici içerisindeki Hazır Ayar Seçimi panellerinin ızgara hizalama kaymaları giderildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v3.1",
    "version": "3.1.0",
    "title": {
      "en": "THENA PATCH NOTES v3.1",
      "tr": "THENA GÜNCELLEME NOTLARI v3.1"
    },
    "subtitle": {
      "en": "Elements system (LoRA style layers), custom selection UI, and comparison sliders.",
      "tr": "Element sistemi (LoRA stil katmanları), özel seçim arayüzü ve karşılaştırma kaydırıcıları."
    },
    "category": {
      "en": "Major Release",
      "tr": "Büyük Güncelleme"
    },
    "author": "Thena Dev Team",
    "date": "06/04/2026",
    "bannerImage": "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "ELEMENTS STYLE LAYERS",
          "tr": "ELEMENT STİL KATMANLARI"
        },
        "intro": {
          "en": "Unleash layered design flexibility on top of standard prompts.",
          "tr": "Standart promptlarınızın üzerine katmanlı stil kontrolü ekleyerek yaratıcılığınızı özgür bırakın."
        },
        "groups": [
          {
            "name": {
              "en": "LoRA Layers Integration",
              "tr": "LoRA Katman Entegrasyonu"
            },
            "items": [
              {
                "en": "Created Elements System (scripts/elements.js) allowing users to stack up to 2 creative style layers per image.",
                "tr": "Her görsel üretimi için en fazla 2 stil katmanını üst üste eklemenizi sağlayan Element Sistemi (scripts/elements.js) geliştirildi."
              },
              {
                "en": "Added Elements modal lists and interactive parameter controls for each selected model.",
                "tr": "Seçilen her model için Element modal listeleri ve etkileşimli ağırlık kontrol çubukları eklendi."
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "CUSTOM SELECTION & COMPARISONS",
          "tr": "ÖZEL SEÇİM VE KARŞILAŞTIRMA SÜRGÜLERİ"
        },
        "intro": {
          "en": "Refined select dropdown styling and before/after slider comparisons.",
          "tr": "İyileştirilmiş açılır kutu seçim tasarımları ve önce/sonra görsel karşılaştırma sürgüleri."
        },
        "groups": [
          {
            "name": {
              "en": "Custom Selection System",
              "tr": "Özel Seçici Sistemi"
            },
            "items": [
              {
                "en": "Added customSelect.js script replacing basic HTML browser select structures with responsive themed dropdowns.",
                "tr": "Tarayıcıların varsayılan kaba select kutularını temalı fütüristik açılır pencerelerle değiştiren customSelect.js betiği eklendi."
              },
              {
                "en": "Overhauled comparison slides inside the trailer (using WebP before/after slider buffers).",
                "tr": "Tanıtım (trailer) sayfasındaki görsel karşılaştırma sürgüleri yenilendi (WebP önce/sonra tuval tamponları kullanılarak)."
              },
              {
                "en": "Added Model Suggestions system and power saver features (modelSuggestion.js, powerSaver.js).",
                "tr": "Model Önerileri yapısı ve pil tasarrufu özellikleri (modelSuggestion.js, powerSaver.js) eklendi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v2.8",
    "version": "2.8.0",
    "title": {
      "en": "THENA PATCH NOTES v2.8",
      "tr": "THENA GÜNCELLEME NOTLARI v2.8"
    },
    "subtitle": {
      "en": "Minor fixes and performance stability tweaks.",
      "tr": "Ufak hata düzeltmeleri ve performans kararlılık rötuşları."
    },
    "category": {
      "en": "Maintenance",
      "tr": "Bakım & İyileştirme"
    },
    "author": "Thena Dev Team",
    "date": "19/03/2026",
    "bannerImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "GENERAL FIXES",
          "tr": "GENEL DÜZELTMELER"
        },
        "intro": {
          "en": "Minor optimizations for faster app startup.",
          "tr": "Uygulamanın daha hızlı açılması için ufak optimizasyonlar yapıldı."
        },
        "groups": [
          {
            "name": {
              "en": "Performance",
              "tr": "Performans"
            },
            "items": [
              {
                "en": "Resolved minor script initialization lags during the loading screen fade-out.",
                "tr": "Yükleme ekranı kaybolurken yaşanan ufak başlangıç betiği gecikmeleri giderildi."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v2.7",
    "version": "2.7.0",
    "title": {
      "en": "THENA PATCH NOTES v2.7",
      "tr": "THENA GÜNCELLEME NOTLARI v2.7"
    },
    "subtitle": {
      "en": "Typewriter updates, animations rework, and hot models highlights.",
      "tr": "Daktilo efekti güncellemeleri, animasyon yenilemeleri ve popüler modeller."
    },
    "category": {
      "en": "Feature Release",
      "tr": "Özellik Güncellemesi"
    },
    "author": "Thena Dev Team",
    "date": "17/03/2026",
    "bannerImage": "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=1200&q=80",
    "sections": [
      {
        "title": {
          "en": "UI ANIMATIONS & TEXT EFFECTS",
          "tr": "ARAYÜZ ANİMASYONLARI & METİN EFEKTLERİ"
        },
        "intro": {
          "en": "Revisiting typewriter flows and button micro-animations.",
          "tr": "Daktilo akışları ve buton mikro animasyonları yeniden tasarlandı."
        },
        "groups": [
          {
            "name": {
              "en": "Typewriter & Prompts",
              "tr": "Daktilo Efekti & Promptlar"
            },
            "items": [
              {
                "en": "Updated typewriter effect supporting dynamic speed and chunk generation parameters.",
                "tr": "Dinamik hız ve yığın (chunk) oluşturma parametrelerini destekleyen daktilo efekti güncellendi."
              },
              {
                "en": "Introduced a new Random Prompt Generator for creative prompts ideas.",
                "tr": "Yaratıcı istem fikirleri sunan yeni bir Rastgele Prompt Üretici (Random Prompt) eklendi."
              },
              {
                "en": "Reworked button hover and clicking micro-animations across the dashboard.",
                "tr": "Tüm kontrol panelindeki butonların hover ve tıklama mikro animasyonları yeniden tasarlandı."
              }
            ]
          }
        ]
      },
      {
        "title": {
          "en": "HOT MODELS & PRESETS FILTERS",
          "tr": "POPÜLER MODELLER & HAZIR AYAR FİLTRELERİ"
        },
        "intro": {
          "en": "Highlighting active models and filtering mature content.",
          "tr": "Aktif modellerin öne çıkarılması ve yetişkin içerik filtrelemesi."
        },
        "groups": [
          {
            "name": {
              "en": "Highlights & Tags",
              "tr": "Öne Çıkanlar & Etiketler"
            },
            "items": [
              {
                "en": "Added 'Hot Models' highlights: badge tags indicating most frequently used models.",
                "tr": "'Popüler Modeller' (Hot Models) göstergesi eklendi: en çok kullanılan modeller rozetle etiketlenerek öne çıkarılıyor."
              },
              {
                "en": "Users can now filter Image Editor presets directly by categories.",
                "tr": "Kullanıcılar artık Görsel Düzenleyici hazır ayarlarını doğrudan kategorilere göre filtreleyebilir."
              },
              {
                "en": "Added age-restricted presets filters support for Image Editor.",
                "tr": "Görsel Düzenleyici için yaş kısıtlamalı hazır ayar filtreleri desteği eklendi."
              },
              {
                "en": "Fixed language mismatches and warning notification label texts.",
                "tr": "Dil uyuşmazlıkları ve uyarı bildirim etiketi metinleri düzeltildi."
              }
            ]
          }
        ]
      }
    ]
  }
];
