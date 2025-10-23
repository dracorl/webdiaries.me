# WebDiaries.Online

**Kullanıcılarına otomatik olarak kendi subdomain'inde kişiselleştirilmiş blog sayfası oluşturan modern bir platform.**

## 🛠️ Kullanılan Teknolojiler ve Araçlar

### Backend

- **Node.js** - Runtime ortamı

- **Apollo GraphQL** - API sunucusu

- **MongoDB** - Veritabanı

- **Bind9 & [bind-rest-api](https://gitlab.com/jaytuck/bind-rest-api)** - DNS yönetimi

### Frontend

- **Vite** - Build tool ve development server

- **React** - UI kütüphanesi

- **Tailwind CSS** - Styling framework

### Infrastructure

- **Docker** - Containerization

- **Nginx** - Web sunucusu ve reverse proxy

- **GitHub Actions** - CI/CD pipeline

## ✨ Öne Çıkan Özellikler

- **Otomatik Subdomain Oluşturma:** Yeni kullanıcı kaydıyla birlikte kullaniciadi.webdiaries.online formatında A/AAAA DNS kaydı otomatik tanımlanır

- **Zengin İçerik Editörü:** Taslak kaydetme, etiket ekleme ve medya desteği

- **Gelişmiş Arama:** Kelime, etiket ve içerik bazlı arama fonksiyonelliği

- **Responsive Tasarım:** Tüm cihazlarda optimize edilmiş kullanıcı deneyimi

## ⚙️ Geliştirme Ortamı Kurulumu

Projeyi yerel makinenizde çalıştırmak için:

1.  **Depoyu Klonlayın:**

    ```bash
    git clone https://github.com/dracorl/webdiaries.online.git
    cd webdiaries.online
    ```

2.  **Ortam Değişkenlerini Ayarlayın:**

    .env.dev.example referans alarak bir .env.development.local dosyası oluşturun.

    ```bash
    cp .env.dev.example .env.development.local
    ```

3.  **Geliştirme ortamı için yapılandırma dosyalarını oluşturun:**

    Nginx yapılandırma dosyası için scripti çalıştırın.

    ```bash
    bash dev-envsubst.sh
    ```

4.  **Projeyi Docker ile ayağa kaldırın:**

    ```bash
    docker compose --env-file .env.development.local -f 'dev.compose.yml' up -d --build
    ```

5.  **Kurulum bitti:**

    http://webdiaries.test ve
    http://test.webdiaries.test
    Adreslerinden projeye erişebilirsiniz.

## 🚀 Projeyi Deploy Etme

1.  **Depoyu Klonlayın:**

    ```bash
    git clone https://github.com/dracorl/webdiaries.online.git
    cd webdiaries.online
    ```

2.  **Ortam Değişkenlerini Ayarlayın:**

    .env.prod.example referans alarak bir .env.production.local dosyası oluşturun.

    ```bash
    cp .env.prod.example .env.production.local
    ```

3.  **Geliştirme ortamı için yapılandırma dosyalarını oluşturun:**

    Nginx ve DNS yapılandırma dosyaları için scripti çalıştırın.

    ```bash
    bash prod-envsubst.sh
    ```

4.  **Projeyi Docker ile ayağa kaldırın:**
    ```bash
    docker compose --env-file .env.production.local -f 'prod.compose.yml' up -d --build
    ```

## Sık Karşılaşılan Sorunlar

- Port 53 veya varsayılan dns programı çakışabilir o durumda çakışan programları kapatıp ilk olarak dnsmasq çalıştırılabilir:

  ```bash
  # Mevcut DNS servislerini kontrol edin
  sudo netstat -tulpn | grep :53
  # Gerekirse servisi durdurun
  sudo systemctl stop systemd-resolved
  docker compose --env-file .env.development.local -f 'dev.compose.yml' up -d --build "dnsmasq"
  ```

- Proje durdurulduktan sonra dnsmasq hala çalışmaya devam ederse:

  ```bash
  sudo pkill -9 dnsmasq
  ```

- Bind9 İzin Problemleri:

  ```bash
  chown -R 100:100 ./zones // bind9 için dizin erişim izni
  ```

## Proje Yapısı

```bash
webdiaries.online/
├── user-dashboard/    # Blog yönetimi React uygulaması
├── frontend/          # Blog görüntülenmesi için React uygulaması
├── backend/           # Node.js GraphQL API
├── nginx/             # Reverse proxy yapılandırması
├── dns/               # Bind9 konfigürasyonları
├── dnsmasq.conf       # Geliştirme ortamı için dinamik dns altyapısı
├── dev-envsubst.sh    # Geliştirme ortamı için yapılandırma scripti
├── prod-envsubst.sh   # Production ortamı için yapılandırma scripti
├── docker-compose.yml # Container tanımları
└── .github/           # CI/CD workflow'ları
```

## Faydalı Bağlantılar

- [Canlı Demo](https://webdiaries.online/)
- [Örnek Blog Sayfası](https://test.webdiaries.online/)

## 🤝 Katkıda Bulunma

Bu proje şu anda dış katkılara açık değildir.

## 📜 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için LICENSE dosyasını inceleyebilirsiniz.
