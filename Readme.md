# 🔍 ImageLens — Legal Image Search & Discovery

![ImageLens Banner](https://img.shields.io/badge/ImageLens-Visual%20Discovery-c8372d?style=for-the-badge)
![Django](https://img.shields.io/badge/Django-5.2-green?style=flat-square&logo=django)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

> A full-stack image aggregator that searches **Unsplash**, **Pixabay**, and **Pexels** simultaneously via their official APIs — fully legal, free, and attribution-friendly.

🌐 **Live Demo** → [https://image-lens.vercel.app](https://image-lens.vercel.app)

---

## ✨ Features

- 🔎 **Multi-source search** — queries Unsplash, Pixabay & Pexels in parallel
- ⚡ **Fast results** — concurrent API fetching with Python ThreadPoolExecutor
- 🎨 **Beautiful UI** — editorial magazine aesthetic with Cormorant Garamond typography
- 📱 **Responsive** — works on desktop, tablet, and mobile
- 🖼️ **Masonry grid** — Pinterest-style 3-column layout
- 💡 **Lightbox modal** — full image details, photographer credit, tags & dimensions
- ⬇️ **Download** — download any image directly from the modal
- 🔖 **Source filter** — filter results by Unsplash, Pixabay, or Pexels
- ♾️ **Pagination** — load more images with infinite-style loading
- ⚖️ **Legally sourced** — all images via official APIs with proper licensing

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Backend** | Python, Django 5, Django REST Framework |
| **APIs** | Unsplash API, Pixabay API, Pexels API |
| **Deployment** | Vercel (frontend), Railway (backend) |
| **Fonts** | Cormorant Garamond, Outfit, Space Mono |

---

## 📁 Project Structure

```
image-lens/
├── backend/                    # Django REST API
│   ├── core/
│   │   ├── settings.py         # Django settings & API keys
│   │   └── urls.py             # Root URL routing
│   ├── images/
│   │   ├── services/
│   │   │   ├── unsplash.py     # Unsplash API integration
│   │   │   ├── pixabay.py      # Pixabay API integration
│   │   │   └── pexels.py       # Pexels API integration
│   │   ├── views.py            # Parallel fetch API views
│   │   └── urls.py             # /api/search/ & /api/sources/
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/                   # React + Vite app
    ├── src/
    │   ├── components/
    │   │   ├── SearchBar.jsx   # Search input + suggestions
    │   │   ├── FilterBar.jsx   # Source filter toggles
    │   │   ├── MasonryGrid.jsx # 3-column masonry layout
    │   │   ├── ImageCard.jsx   # Hover card with info
    │   │   └── ImageModal.jsx  # Lightbox with download
    │   ├── hooks/
    │   │   └── useImageSearch.js
    │   ├── utils/
    │   │   └── api.js
    │   └── App.jsx
    └── tailwind.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- API keys from Unsplash, Pixabay, and Pexels (all free)

### 1. Get Free API Keys

| Service | URL |
|---------|-----|
| Unsplash | https://unsplash.com/developers |
| Pixabay | https://pixabay.com/api/docs/ |
| Pexels | https://www.pexels.com/api/ |

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your API keys

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🌐 API Endpoints

### `GET /api/search/`

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | **Required.** Search query |
| `sources` | string | Comma-separated: `unsplash,pixabay,pexels` |
| `page` | int | Page number (default: 1) |
| `per_page` | int | Results per source (default: 20, max: 40) |

**Example:**
```
GET /api/search/?q=mountain&sources=unsplash,pexels&page=1
```

### `GET /api/sources/`
Returns which API keys are configured.

---

## ⚖️ Image Licensing

| Source | License |
|--------|---------|
| Unsplash | Free for personal & commercial use |
| Pixabay | CC0 — fully public domain |
| Pexels | Free for personal & commercial use |

All images are fetched via **official APIs** — no Terms of Service are violated.

---

## 📬 Contact

Have questions or want to collaborate?

📧 [zenertrizz@gmail.com](mailto:zenertrizz@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ using Django · React · Tailwind CSS</p>