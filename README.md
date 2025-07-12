# 🎓 Teacher Management System

A modern, AI-powered web application for managing teacher profiles and information. Built with Next.js 15 and enhanced with beautiful animations and a responsive design, this application provides an intuitive interface for adding, editing, and viewing teacher data with advanced features like pagination and multi-language support.

![Teacher Management System](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Teacher+Management+System)

## 🌟 Features

- **📝 Teacher Profile Management**: Add, edit, and view detailed teacher information
- **⭐ Rating System**: Visual star-based rating display with half-star support
- **🌍 Multi-language Support**: English and Vietnamese language options
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎨 Beautiful Animations**: Smooth transitions and engaging UI effects
- **📄 Pagination**: Efficiently browse through teacher lists (5 per page)
- **🔍 Form Validation**: Real-time form validation with error messages
- **💰 Fee Management**: Simplified fee input with automatic formatting
- **🎯 Modern UI/UX**: Clean design with gradient headers and interactive elements

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gkhanh07/table-manage.git
   cd manage-teacher
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Adding a Teacher
1. Click the "Add Teacher" button
2. Fill in the required information:
   - **Name**: Teacher's full name
   - **Subject**: Select from available subjects
   - **Location**: City or area
   - **Rating**: 1-5 star rating
   - **Fee**: Hourly rate (enter numbers only, e.g., "50")
3. Click "Add Teacher" to save

### Editing a Teacher
1. Click the "Edit" button on any teacher card
2. Modify the information in the form
3. Click "Save Changes"

### Navigation
- Use pagination controls at the bottom to browse through teacher lists
- Switch between English and Vietnamese using the language toggle

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Hook Form](https://react-hook-form.com/)** - Form handling and validation

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development

### Design & UX
- **Custom CSS Animations** - Smooth transitions and micro-interactions
- **Responsive Grid System** - Mobile-first design approach
- **SVG Icons** - Scalable vector graphics for UI elements

## 🤖 AI-Powered Development

This project was enhanced using cutting-edge AI development tools:

- **[GitHub Copilot](https://github.com/features/copilot)** - AI pair programmer for code completion and suggestions
- **[OpenAI GPT-4](https://openai.com/)** - Assisted with architecture decisions and code optimization
- **AI-Generated Animations** - Custom CSS animations created with AI assistance
- **Intelligent Form Validation** - Smart validation patterns and user experience improvements

The AI tools helped accelerate development by:
- Generating boilerplate code and components
- Creating responsive design patterns
- Optimizing animation sequences
- Implementing best practices for accessibility

## 📁 Project Structure

```
manage-teacher/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── AddForm.js      # Teacher form component
│   │   │   ├── Table.js        # Teacher list with pagination
│   │   │   └── LanguageToggle.js
│   │   ├── contexts/
│   │   │   └── LanguageContext.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── globals.css         # Custom animations & styles
│   │   ├── layout.js
│   │   └── page.js
│   └── locales/
│       ├── en.json            # English translations
│       └── vi.json            # Vietnamese translations
├── public/                    # Static assets
├── package.json
└── README.md
```

## 🎨 Key Features Showcase

### Animated UI Components
- **Fade-in animations** for smooth page loads
- **Hover effects** on interactive elements
- **Form field animations** with validation feedback
- **Pagination transitions** for seamless navigation

### Advanced Form Handling
- **Real-time validation** with immediate feedback
- **Smart input restrictions** (rating: 1-5, fee: positive numbers)
- **Auto-formatting** for fee input ($XX.XX/hour)
- **Error animations** to guide user attention

### Responsive Design
- **Mobile-optimized** card layout for smaller screens
- **Desktop table view** for larger displays
- **Touch-friendly** buttons and interactions

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
```
Deploy to [Vercel Platform](https://vercel.com/new) for optimal Next.js hosting.

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**[gkhanh07](https://github.com/gkhanh07)**

---

<div align="center">
  <p>Built with ❤️ using AI-powered development tools</p>
  <p>
    <a href="#top">Back to top ⬆️</a>
  </p>
</div>
