# OpenResume

A modern, open source resume builder. Create, customize, and export beautiful resumes as PDF. Built with React, Next.js, and Material UI.

## Features
- ✨ Real-time resume editing and preview
- 🎨 Customizable sections and theme
- 📄 PDF export (browser-based, no server needed)
- 🔒 No personal data stored on server (100% private)
- ✅ Input validation and data size limits
- 🛡️ XSS protection with DOMPurify
- ♿ WCAG accessibility compliant
- 🚀 Production-ready with error boundaries
- 📱 Responsive design for mobile and desktop

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
git clone https://github.com/kymaniAnderson/open-resume.git
cd OpenResume
npm install
# or
yarn install
```

### Running Locally
```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Exporting as PDF
- Click the **Download PDF** button.
- In the print dialog, uncheck "Headers and footers" for a clean export.

### Import/Export Data
- **Export**: Save your resume data as JSON for backup
- **Import**: Load previously saved resume data
- Maximum file size: 5MB

## Production Ready

This app includes production-ready features:
- ✅ Input validation with Zod
- ✅ XSS protection with DOMPurify  
- ✅ Error boundaries for crash protection
- ✅ SEO optimization
- ✅ Accessibility improvements (ARIA labels)
- ✅ Data size limits (5MB max)
- ✅ Loading states
- ✅ Security headers

See `PRODUCTION_READY_IMPROVEMENTS.md` for complete details.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](./LICENSE) 