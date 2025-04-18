@echo off
echo === Dang khoi dong ung dung ===
echo.

start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm run dev"

echo.
echo === Cac ung dung da khoi dong ===
echo Backend dang chay tren http://localhost:5000 (hoac port duoc cau hinh)
echo Frontend dang chay tren http://localhost:3000 (hoac port duoc cau hinh) 