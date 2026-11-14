# موقع بورتفوليو محمود أيمن (تيمو) | Mahmoud Ayman (Timo) Portfolio

موقع شخصي متكامل وعالمي (Award-Level) مصمم خصيصاً للمصمم الجرافيكي الإبداعي **محمود أيمن (تيمو)** مع لوحة تحكم إدارية كاملة لإدارة المحتوى والمشاريع.

---

## 🎨 هوية البراند (Brand Identity)
* **البوردو (Bordo):** `#6C151E`
* **الأخضر الداكن (Green):** `#0F3D3A`
* **الكريمي (Cream):** `#F5DABF`
* **الخطوط:**
  * العربية: **Cairo (Black 900 للعناوين)**
  * الإنجليزية: **Space Grotesk**

---

## 🚀 تشغيل الموقع محلياً
يمكنك تشغيل الموقع في أي وقت بالضغط المزدوج على ملف:
`start.bat`

أو عبر سطر الأوامر:
```bash
cd C:\Users\Online\.gemini\antigravity\scratch\my-portfolio
npm start
```
وسيكون متاحاً على:
* الموقع الرئيسي (عربي): [http://localhost:3000/ar](http://localhost:3000/ar)
* الموقع (إنجليزي): [http://localhost:3000/en](http://localhost:3000/en)
* لوحة التحكم الإدارية: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔑 بيانات تسجيل الدخول للوحة التحكم
* **البريد:** `timo@portfolio.com`
* **كلمة المرور:** `TimoBrand2026!Secure`

---

## 📁 هيكلية المشروع
```text
my-portfolio/
├── assets/
│   └── personal/            # الصور الشخصية الأصلية
├── public/
│   ├── assets/personal/     # صور الهيرو وقسم عني
│   ├── uploads/             # صور المشاريع المرفوعة من لوحة التحكم
│   └── og-image.jpg         # صورة المشاركة والسوشيال ميديا 1200x630
├── src/
│   ├── app/                 # صفحات وتوجيهات Next.js App Router
│   ├── components/          # مكوّنات الموقع وحركات GSAP و Framer Motion
│   ├── lib/                 # المصادقة والبيانات و i18n
│   └── messages/            # ملفات الترجمة (ar.json و en.json)
├── data/                    # التخزين المحلي الفوري لبيانات الموقع والمشاريع
├── brand.md                 # دليل وقواعد البراند الصارمة
├── DEPLOYMENT.md            # دليل النشر على Vercel و Supabase
└── start.bat                # تشغيل سريع بضغطة زر واحدة
```
