@echo off
title ResumeForge Local Launcher
cls

echo ===================================================
echo   LAUNCHING RESUMEFORGE LOCAL ENVIRONMENT          
echo ===================================================
echo.

:: 1. Force navigate to your project root folder
cd /d "D:\main coding\Resume AI\resumeforge-main"

:: 2. Ensure pnpm is installed globally
echo [1/4] Checking/Installing pnpm package manager...
call npm install -g pnpm
echo.

:: 3. Clean up root npm clutter if it exists to prevent workspace errors
echo [2/4] Cleaning up conflicting root files...
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del /q "package-lock.json"
echo.

:: 4. Install the main workspace/monorepo packages safely
echo [3/4] Initializing workspace configuration...
call pnpm install
echo.

:: 5. Navigate directly to the frontend package and execute the server cleanly
echo [4/4] Navigating to frontend and opening local server...
cd src\frontend

echo.
echo ===================================================
echo   DEVELOPMENT SERVER RUNNING
echo ===================================================
echo.
echo  * Loading Vite local server...
echo  * If your browser doesn't open automatically, 
echo    go to: http://localhost:5173
echo.
echo ===================================================
echo.

:: Using /B keeps the process running smoothly inside this window
pnpm run dev

pause