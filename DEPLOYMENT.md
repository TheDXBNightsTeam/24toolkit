# 24Toolkit - Free Online Tools

A comprehensive web application providing 10+ essential free online tools built with React, TypeScript, and Tailwind CSS. All tools work completely client-side in your browser with no sign-up required.

## 🛠️ Available Tools

1. **Word & Character Counter** - Count words, characters, paragraphs, and estimate reading time
2. **Password Generator** - Generate secure, random passwords with customizable options
3. **QR Code Generator** - Create QR codes from text or URLs
4. **JSON ⇄ CSV Converter** - Convert between JSON and CSV formats
5. **Image Compressor** - Reduce image file sizes while maintaining quality
6. **Text to Speech Converter** - Convert text to natural-sounding speech
7. **PDF to Word Converter** - Convert PDF documents to editable Word format (demo UI)
8. **Color Picker & Palette Generator** - Pick colors and generate beautiful palettes
9. **Image to Text (OCR)** - Extract text from images using Tesseract.js
10. **Unit Converter** - Convert between different units of measurement

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see the app.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📦 Deployment to Vercel

### Prerequisites

**Important**: Before deploying, you need a GitHub Personal Access Token for AI features to work.

See [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions on obtaining and configuring the required environment variables.

### Option 1: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite and configure settings
6. Click "Deploy"

### Build Settings (if needed)

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables

After deployment, configure the following environment variables in Vercel:

1. `GITHUB_TOKEN` - **Required** for AI-powered tools
   - Get from: https://github.com/settings/tokens
   - See [ENV_SETUP.md](./ENV_SETUP.md) for detailed setup instructions

Without this token, all AI-powered tools (Chat Assistant, Text Summarizer, etc.) will show fallback messages.

## 🏗️ Project Structure

```
24toolkit/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   └── Layout.tsx       # Main layout with header/footer
│   ├── pages/
│   │   ├── HomePage.tsx     # Landing page with tool grid
│   │   └── tools/           # Individual tool pages
│   │       ├── WordCounter.tsx
│   │       ├── PasswordGenerator.tsx
│   │       ├── QRGenerator.tsx
│   │       ├── JSONCSVConverter.tsx
│   │       ├── ImageCompressor.tsx
│   │       ├── TextToSpeech.tsx
│   │       ├── PDFToWord.tsx
│   │       ├── ColorPicker.tsx
│   │       ├── ImageToText.tsx
│   │       └── UnitConverter.tsx
│   ├── App.tsx              # Routes configuration
│   ├── index.css            # Theme and styles
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

## 🎨 Features

- **Client-Side Processing**: All tools run in your browser for privacy and speed
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with shadcn components and Tailwind CSS
- **Fast Performance**: Powered by Vite for instant hot reload
- **Accessible**: Keyboard navigation and screen reader support
- **SEO Optimized**: Meta tags and semantic HTML

## 🔧 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Client-side routing
- **Tesseract.js** - OCR functionality
- **qrcode.react** - QR code generation
- **browser-image-compression** - Image compression
- **papaparse** - CSV parsing

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Built with [Spark Template](https://github.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Phosphor Icons](https://phosphoricons.com)
