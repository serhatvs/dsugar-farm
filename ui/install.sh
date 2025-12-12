#!/bin/bash
# Sugar Farm UI - NPM Installation Setup (Linux/macOS)
# This script sets up and installs all dependencies for the UI project

echo "🚀 Sugar Farm UI - NPM Setup"
echo "================================"
echo ""

# Check if npm is installed
echo "✓ Checking npm installation..."
npm --version
if [ $? -ne 0 ]; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Navigate to UI directory
echo ""
echo "📁 Navigating to UI directory..."
cd "$(dirname "$0")"
echo "Current directory: $(pwd)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    
    # Show installed packages
    echo ""
    echo "📋 Installed packages:"
    npm list --depth=0
    
    # Display available commands
    echo ""
    echo "🎯 Available commands:"
    echo "  npm run dev         - Start development server (http://localhost:5173)"
    echo "  npm run build       - Create production build"
    echo "  npm run preview     - Preview production build"
    echo "  npm run test        - Run unit tests with Vitest"
    echo "  npm run test:ui     - Run tests with UI dashboard"
    echo "  npm run test:coverage - Generate test coverage report"
    echo "  npm run lint        - Lint TypeScript files"
    
    echo ""
    echo "✨ Setup complete! Run 'npm run dev' to start developing."
else
    echo ""
    echo "❌ Installation failed. Please check the errors above."
    exit 1
fi
