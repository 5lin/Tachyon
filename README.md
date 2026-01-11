# Tachyon ⚡

**A Modern Self-Hosted Comic Reader**

[![GitHub](https://img.shields.io/badge/GitHub-5lin%2FTachyon-blue?logo=github)](https://github.com/5lin/Tachyon)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> 🌏 **[中文文档](#中文文档)**

---

## ✨ Features

- 🖼️ **Grid/List View** - Switch between display modes
- 🔍 **Real-time Search** - Instant filtering
- 📖 **Immersive Reader** - Full-screen reading experience
- 🎨 **Light/Dark Theme** - Beautiful glassmorphism UI
- 🌐 **English/Chinese** - Bilingual support
- 📱 **Responsive Design** - Works on any device
- ⚡ **Built-in Caching** - Optimized for CDN deployment
- 🔐 **OIDC Authentication** - Optional, supports any OIDC provider

---

## 🚀 Quick Start

### Requirements

- **Node.js** 18+
- **npm** / **pnpm** / **bun**

### 1. Clone

```bash
git clone https://github.com/5lin/Tachyon.git
cd Tachyon
```

### 2. Install

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 3. Configure

```bash
# Backend (required)
cd backend
cp .env.example .env
# Edit .env, set COMICS_DIR

# Frontend (optional for local dev)
cd ../frontend
cp .env.example .env
```

**Backend Environment Variables (`backend/.env`):**

| Variable | Description | Required | Default |
|----------|-------------|:--------:|---------|
| `COMICS_DIR` | Path to comics directory | ✅ | - |
| `PORT` | API port | ❌ | `3001` |
| `SECRET_KEY` | Session signing key | ❌ | Auto-generated |

**Frontend Environment Variables (`frontend/.env`):**

| Variable | Description | Required | Default |
|----------|-------------|:--------:|---------|
| `VITE_API_URL` | Backend API URL | ❌ | `http://localhost:3001` |

### 4. Start

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

Visit **http://localhost:5173** 🎉

---

## 📁 Comics Directory Structure

```
COMICS_DIR/
├── Comic Name 1/           # Each folder = one comic
│   ├── 001.jpg
│   ├── 002.png
│   └── ...
├── Comic Name 2/
│   ├── page1.webp
│   └── ...
└── ...
```

**Supported formats**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`, `.avif`

---

## 🔐 OIDC Authentication (Optional)

Tachyon supports universal OIDC authentication, compatible with:
- **Authentik**
- **Keycloak**
- **Auth0**
- **Google OAuth**
- Any standards-compliant OIDC provider

### Configuration

Add to `backend/.env`:

```env
OIDC_ISSUER=https://your-auth-provider.com
OIDC_CLIENT_ID=your-client-id
OIDC_CLIENT_SECRET=your-client-secret
OIDC_REDIRECT_URI=https://your-app.com/callback
SECRET_KEY=your-random-32-char-secret-key
```

**Without `OIDC_CLIENT_ID`, authentication is disabled and APIs are public.**

---

## 🌐 Cloudflare Deployment

Tachyon includes optimized cache headers, perfect for CDN deployment:

| Resource Type | Cache-Control |
|---------------|---------------|
| Cover/Page Images | `public, max-age=2592000, immutable` (30 days) |
| Comics List | `public, max-age=300, s-maxage=600` (5-10 min) |

### Recommended Cache Rules

| URL Pattern | Edge TTL |
|-------------|----------|
| `/api/comics/*/cover` | 30 days |
| `/api/comics/*/pages/*` | 30 days |
| `/api/comics` | 5 minutes |

---

## 🛠️ Production Build

```bash
# Build frontend
cd frontend && npm run build
# Output in dist/

# Build backend
cd backend && npm run build
# Output in dist/
```

### Production Start

```bash
export COMICS_DIR=/path/to/comics
export PORT=3001

cd backend && npm start
# Frontend can be deployed to any static hosting service
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/comics` | Get comics list |
| `GET` | `/api/comics/:id` | Get comic details |
| `GET` | `/api/comics/:id/cover` | Get cover image |
| `GET` | `/api/comics/:id/pages/:page` | Get page image |
| `GET` | `/api/config` | Get config (auth status, etc.) |
| `GET` | `/health` | Health check |

---

## 🎨 Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite + TailwindCSS v4
- React Router

**Backend:**
- Hono (High-performance web framework)
- Node.js
- Sharp (Image processing)

---

## 📄 License

MIT License

---

**Made with ❤️ by [5lin](https://github.com/5lin)**

---

# 中文文档

**现代化自托管漫画阅读器**

## ✨ 功能特性

- 🖼️ **网格/列表视图** - 切换显示模式
- 🔍 **实时搜索** - 即时过滤
- 📖 **沉浸式阅读器** - 全屏阅读体验
- 🎨 **明暗主题** - 精美的玻璃态 UI
- 🌐 **中英双语** - 双语支持
- 📱 **响应式设计** - 适配任何设备
- ⚡ **内置缓存** - CDN 部署优化
- 🔐 **OIDC 认证** - 可选，支持任意 OIDC 提供商

## 🚀 快速开始

### 环境要求

- **Node.js** 18+
- **npm** / **pnpm** / **bun**

### 1. 克隆项目

```bash
git clone https://github.com/5lin/Tachyon.git
cd Tachyon
```

### 2. 安装依赖

```bash
# 后端
cd backend && npm install

# 前端
cd ../frontend && npm install
```

### 3. 配置

```bash
# 后端配置（必须）
cd backend
cp .env.example .env
# 编辑 .env，设置 COMICS_DIR

# 前端配置（本地开发可跳过）
cd ../frontend
cp .env.example .env
```

**后端环境变量 (`backend/.env`):**

| 变量 | 说明 | 必填 | 默认值 |
|------|------|:----:|--------|
| `COMICS_DIR` | 漫画目录路径 | ✅ | - |
| `PORT` | API 端口 | ❌ | `3001` |
| `SECRET_KEY` | 会话签名密钥 | ❌ | 自动生成 |

### 4. 启动

```bash
# 终端 1 - 后端
cd backend && npm run dev

# 终端 2 - 前端
cd frontend && npm run dev
```

访问 **http://localhost:5173** 🎉

## 📁 漫画目录结构

```
COMICS_DIR/
├── 漫画名称1/           # 每个文件夹 = 一部漫画
│   ├── 001.jpg
│   ├── 002.png
│   └── ...
├── 漫画名称2/
│   └── ...
└── ...
```

**支持的图片格式**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`, `.avif`

## 🔐 OIDC 认证（可选）

在 `backend/.env` 中配置：

```env
OIDC_ISSUER=https://your-auth-provider.com
OIDC_CLIENT_ID=your-client-id
OIDC_CLIENT_SECRET=your-client-secret
OIDC_REDIRECT_URI=https://your-app.com/callback
SECRET_KEY=your-random-32-char-secret-key
```

**不配置 `OIDC_CLIENT_ID` 时，认证自动禁用。**
