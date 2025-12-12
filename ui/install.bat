@echo off
REM Sugar Farm UI - NPM Installation Setup (Windows Batch)
REM This script sets up and installs all dependencies for the UI project

setlocal enabledelayedexpansion

echo.
echo 🚀 Sugar Farm UI - NPM Setup
echo ================================
echo.

REM Check if npm is installed
echo ✓ Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install Node.js and npm first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Display npm version
npm --version

REM Navigate to UI directory
echo.
echo 📁 Navigating to UI directory...
cd /d "C:\Users\VICTUS\project\Hackthon\ui"
if errorlevel 1 (
    echo ❌ Failed to navigate to directory
    pause
    exit /b 1
)
echo Current directory: %cd%

REM Install dependencies
echo.
echo 📦 Installing dependencies...
echo This may take a few minutes...
echo.
npm install

if errorlevel 1 (
    echo.
    echo ❌ Installation failed. Please check the errors above.
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!

REM Show installed packages
echo.
echo 📋 Installed packages:
npm list --depth=0

REM Display available commands
echo.
echo 🎯 Available commands:
echo   npm run dev         - Start development server (http://localhost:5173)
echo   npm run build       - Create production build
echo   npm run preview     - Preview production build
echo   npm run test        - Run unit tests with Vitest
echo   npm run test:ui     - Run tests with UI dashboard
echo   npm run test:coverage - Generate test coverage report
echo   npm run lint        - Lint TypeScript files
echo.
echo ✨ Setup complete!
echo.
echo Next steps:
echo   1. cd C:\Users\VICTUS\project\Hackthon\ui
echo   2. npm run dev
echo   3. Open http://localhost:5173 in your browser
echo.
pause
