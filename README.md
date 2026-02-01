
# MA-IDS - Mubarak Alnassi Intrusion Detection System

## 🌟 Overview

A comprehensive, modern Intrusion Detection System (IDS) built with React, featuring real-time monitoring, machine learning integration, and advanced security analytics. This full-stack application provides a complete security dashboard for network monitoring and threat detection.

## 🚀 Features

### Core Functionality
- **Real-time Dashboard** - Live monitoring with KPI metrics and system health
- **Firewall Management** - Rule configuration and status monitoring
- **Security Scanner** - Multiple scan types with detailed results
- **Traffic Analysis** - Network monitoring with interactive charts
- **System Logging** - Real-time logs with filtering and export
- **ML Model Registry** - AI model management and performance tracking
- **Reports & Analytics** - Automated security reporting system
- **User Administration** - Role-based access control
- **System Architecture** - Visual component overview and data flow

### Technical Features
- **Modern UI/UX** - Glass morphism design with dark theme
- **Responsive Design** - Works on all device sizes
- **Real-time Updates** - Live data feeds and notifications
- **Interactive Charts** - Data visualization with Recharts
- **Modular Architecture** - Clean, maintainable code structure

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization

### Backend & Infrastructure
- **Node.js** - JavaScript runtime
- **Base44 SDK** - Backend-as-a-Service integration
- **Python** - ML agent and analysis
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions
- **Elasticsearch** - Log search and analytics

## 📁 Project Structure

```
MA-IDS-FULL-FINAL/
├── src/                    # Main React application
│   ├── components/
│   │   ├── ids/           # IDS-specific components
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Main application pages
│   ├── lib/               # Utilities and configurations
│   ├── hooks/             # Custom React hooks
│   └── api/               # API client configurations
├── agent/                 # Python ML agent
├── backend/               # Node.js backend server
├── frontend/              # Legacy frontend files
├── entities/              # Data models and schemas
├── presentation/          # Presentation materials
│   ├── 01-introduction.md    # Project overview
│   ├── 02-setup.md          # Installation guide
│   ├── 03-components.md     # Component architecture
│   ├── 04-pages.md          # Page features
│   ├── 05-advanced.md       # Advanced capabilities
│   ├── 06-conclusion.md     # Conclusion & applications
│   └── code-overview.md     # Complete code explanation
├── delivery/                # Sequential delivery parts
│   ├── README.md           # Delivery documentation
│   ├── delivery-part-01-setup.md      # Setup & config
│   ├── delivery-part-02-components.md # Core components
│   ├── delivery-part-03-pages.md      # Main pages
│   ├── delivery-part-04-additional-pages.md # Extended features
│   └── delivery-part-05-final-components.md # Final components
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Python 3.8+ (for ML agent)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/MA-IDS-FULL-FINAL.git
   cd MA-IDS-FULL-FINAL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📊 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checking

## 📚 Presentation Materials

This project includes comprehensive presentation materials organized in the `presentation/` folder:

1. **01-introduction.md** - Project overview and objectives
2. **02-setup.md** - Installation and setup guide
3. **03-components.md** - Component architecture and design
4. **04-pages.md** - Detailed page features and functionality
5. **05-advanced.md** - Advanced capabilities and technical details
6. **06-conclusion.md** - Real-world applications and conclusion
7. **code-overview.md** - Complete code explanation with purpose and functionality

Use these files to present and explain the MA-IDS project systematically.

## 📦 Delivery Parts

For systematic delivery and explanation, the project is organized into sequential parts in the `delivery/` folder:

1. **Part 1: Setup & Configuration** - Project foundation, build tools, and dependencies
2. **Part 2: Core Components** - Essential UI components (GlassCard, Sidebar, etc.)
3. **Part 3: Main Pages** - Primary application pages (Dashboard, Firewall, Scanner)
4. **Part 4: Additional Pages** - Extended functionality (Traffic, Syslog, ML Registry)
5. **Part 5: Final Components** - Reports, Admin, Architecture, and services

Each delivery part contains complete code with inline explanations, perfect for step-by-step presentation and implementation.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BASE44_APP_BASE_URL=your_base44_url
# Add other environment variables as needed
```

### Base44 Setup

This project uses Base44 for backend services. Configure your Base44 account and update the API endpoints in `src/api/base44Client.js`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mubarak Alnassi**
- GitHub: [YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- React community for amazing documentation
- Tailwind CSS for the utility-first approach
- All contributors and security researchers

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainer.

---

**⭐ Star this repository if you find it helpful!**
