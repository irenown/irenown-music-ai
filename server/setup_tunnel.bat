@echo off
echo ==========================================
echo   iRenown Cloudflare Tunnel Setup
echo ==========================================
echo.
echo [1/2] Authenticating... (This will open your browser)
.\cloudflared.exe tunnel login
echo.
echo [2/2] Creating Tunnel 'irenown-backend'...
.\cloudflared.exe tunnel create irenown-backend
echo.
echo Setup Complete!
echo You can now run 'start_tunnel.bat' to go live.
pause
