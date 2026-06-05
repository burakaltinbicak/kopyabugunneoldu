# Bugün Ne Oldu? - Frontend

Bu depo, **Bugün Ne Oldu?** projesinin son kullanıcıya hitap eden ana web arayüzüdür. Kullanıcılara içerikleri modern, hızlı ve duyarlı bir şekilde sunmak için tasarlanmıştır.

## 🔗 Proje Ekosistemi

Bu proje, üç parçalı bir mimarinin ana vitrinidir. Ekosistemin diğer repolarına aşağıdan ulaşabilirsiniz:

* **Frontend (Şu an buradasınız):** [kopyabugunneoldu](https://github.com/burakaltinbicak/kopyabugunneoldu)
* **API / Backend:** [kopyabugunneoldu-api](https://github.com/burakaltinbicak/kopyabugunneoldu-api)
* **Admin Paneli:** [kopyabugunneoldu-admin](https://github.com/burakaltinbicak/kopyabugunneoldu-admin)

## 💻 Kullanılan Teknolojiler

* **Framework:** Next.js (v16.1.7)
* **Kütüphane:** React (v19.2.3)
* **Dil:** TypeScript
* **Stilleme:** Tailwind CSS (v4)
* **Araçlar:** Axios, date-fns

## 🚀 Kurulum ve Çalıştırma

Bu projede herhangi bir `.env` (ortam değişkeni) konfigürasyonuna ihtiyaç yoktur.

**1. Repoyu Klonlayın**
```bash
git clone [https://github.com/burakaltinbicak/kopyabugunneoldu.git](https://github.com/burakaltinbicak/kopyabugunneoldu.git)
cd kopyabugunneoldu
2. Bağımlılıkları Yükleyin

Bash
npm install
3. Geliştirme Sunucusunu Başlatın

Bash
npm run dev
Tarayıcınızda http://localhost:3000 adresine giderek projeyi görüntüleyebilirsiniz.

🛠️ Kullanılabilir Komutlar
npm run dev: Geliştirme sunucusunu başlatır.

npm run build: Projeyi prodüksiyon (canlı) ortamı için optimize ederek derler.

npm run start: Derlenmiş projeyi prodüksiyon modunda başlatır.

npm run lint: Kod standartlarını ESLint ile denetler.
