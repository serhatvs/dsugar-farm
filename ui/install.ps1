#!/usr/bin/env powershell
# Sugar Farm UI - NPM Installation Setup
# This script sets up and installs all dependencies for the UI project

Write-Host "🚀 Sugar Farm UI - NPM Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if npm is installed
Write-Host "✓ Checking npm installation..." -ForegroundColor Yellow
npm --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm is not installed. Please install Node.js and npm first." -ForegroundColor Red
    exit 1
}

# Navigate to UI directory
Write-Host ""
Write-Host "📁 Navigating to UI directory..." -ForegroundColor Yellow
cd "C:\Users\VICTUS\project\Hackthon\ui"
$currentPath = Get-Location
Write-Host "Current directory: $currentPath" -ForegroundColor Green

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    
    # Show installed packages
    Write-Host ""
    Write-Host "📋 Installed packages:" -ForegroundColor Cyan
    npm list --depth=0
    
    # Display available commands
    Write-Host ""
    Write-Host "🎯 Available commands:" -ForegroundColor Cyan
    Write-Host "  npm run dev         - Start development server (http://localhost:5173)" -ForegroundColor Green
    Write-Host "  npm run build       - Create production build" -ForegroundColor Green
    Write-Host "  npm run preview     - Preview production build" -ForegroundColor Green
    Write-Host "  npm run test        - Run unit tests with Vitest" -ForegroundColor Green
    Write-Host "  npm run test:ui     - Run tests with UI dashboard" -ForegroundColor Green
    Write-Host "  npm run test:coverage - Generate test coverage report" -ForegroundColor Green
    Write-Host "  npm run lint        - Lint TypeScript files" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "✨ Setup complete! Run 'npm run dev' to start developing." -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Installation failed. Please check the errors above." -ForegroundColor Red
    exit 1
}
