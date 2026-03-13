@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: ============= НАСТРОЙКА ЦВЕТОВ =============
for /F %%a in ('echo prompt $E ^| cmd') do set "ESC=%%a"
set "R=%ESC%[91m"
set "G=%ESC%[92m"
set "Y=%ESC%[93m"
set "B=%ESC%[94m"
set "M=%ESC%[95m"
set "C=%ESC%[96m"
set "W=%ESC%[97m"
set "GR=%ESC%[90m"
set "RESET=%ESC%[0m"

:: ============= ПРОВЕРКА АДМИНА =============
net session >nul 2>&1
if %errorlevel% neq 0 (
    cls
    echo.
    echo    %R%╔═══════════════════════════════════════════════════════════════╗%RESET%
    echo    %R%║%RESET%                        %W%ОШИБКА%RESET%                            %R%║%RESET%
    echo    %R%╚═══════════════════════════════════════════════════════════════╝%RESET%
    echo.
    echo %R%[!]%RESET% Требуются права администратора!
    echo %Y%[i]%RESET% Запустите программу от имени администратора
    echo.
    echo %GR%Нажмите любую клавишу для выхода...%RESET%
    pause >nul
    exit /b 1
)

:: ============= ГЛАВНОЕ МЕНЮ =============
:main_menu
title System Cleaner Pro v3.0 - Главное меню
mode con: cols=70 lines=30
cls

echo.
echo    %B%╔═══════════════════════════════════════════════════════════╗%RESET%
echo    %B%║%RESET%                   %C%SYSTEM CLEANER PRO v3.0%RESET%                %B%║%RESET%
echo    %B%║%RESET%             %GR%Профессиональная очистка Windows%RESET%            %B%║%RESET%
echo    %B%╚═══════════════════════════════════════════════════════════╝%RESET%
echo.

echo %G%[1]%RESET% 🚀 Быстрая очистка
echo %GR%    Автоматическая очистка временных файлов и кэша%RESET%
echo.

echo %G%[2]%RESET% 🔧 Расширенная очистка
echo %GR%    Полная очистка с выбором компонентов%RESET%
echo.

echo %G%[3]%RESET% 🌐 Очистка браузеров
echo %GR%    Очистка кэша только браузеров%RESET%
echo.

echo %G%[4]%RESET% 💻 Очистка системы
echo %GR%    Очистка системных файлов и кэшей%RESET%
echo.

echo %G%[5]%RESET% 🛠️ Дополнительные инструменты
echo %GR%    Инструменты для оптимизации системы%RESET%
echo.

echo %G%[6]%RESET% ⚙️ Настройки
echo %GR%    Настройки программы%RESET%
echo.

echo %G%[7]%RESET% ❓ Справка
echo %GR%    Информация и помощь%RESET%
echo.

echo %R%[0]%RESET% 🚪 Выход
echo.

set /p choice="%G%[?]%RESET% Выберите действие (0-7): "

if "%choice%"=="0" goto exit_program
if "%choice%"=="1" goto fast_clean
if "%choice%"=="2" goto advanced_clean
if "%choice%"=="3" goto browser_clean
if "%choice%"=="4" goto system_clean
if "%choice%"=="5" goto tools_menu
if "%choice%"=="6" goto settings_menu
if "%choice%"=="7" goto help_menu

goto main_menu

:: ============= БЫСТРАЯ ОЧИСТКА =============
:fast_clean
cls
echo.
echo    %B%╔═══════════════════════════════════════════════════════════╗%RESET%
echo    %B%║%RESET%                    %C%БЫСТРАЯ ОЧИСТКА%RESET%                      %B%║%RESET%
echo    %B%╚═══════════════════════════════════════════════════════════╝%RESET%
echo.

echo %Y%[!]%RESET% Выполняется быстрая очистка системы...
echo %GR%──────────────────────────────────────────────────────%RESET%
echo.

echo %C%[1/8]%RESET% Очистка временных файлов Windows...
del /f /s /q "%TEMP%\*" >nul 2>&1
del /f /s /q "%WINDIR%\Temp\*" >nul 2>&1
echo %G%[✓]%RESET% Готово

echo %C%[2/8]%RESET% Очистка кэша браузеров...
if exist "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache" (
    rd /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache" >nul 2>&1
    echo %G%[✓]%RESET% Google Chrome очищен
)

if exist "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Cache" (
    rd /s /q "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Cache" >nul 2>&1
    echo %G%[✓]%RESET% Microsoft Edge очищен
)

echo %C%[3/8]%RESET% Очистка корзины...
for %%d in (C D E F G H I J K L M N O P Q R S T U V W X Y Z) do (
    if exist "%%d:\$Recycle.Bin" (
        rd /s /q "%%d:\$Recycle.Bin" >nul 2>&1
    )
)
echo %G%[✓]%RESET% Готово

echo %C%[4/8]%RESET% Очистка DNS кэша...
ipconfig /flushdns >nul 2>&1
echo %G%[✓]%RESET% Готово

echo %C%[5/8]%RESET% Очистка миниатюр...
del /f /s /q "%LOCALAPPDATA%\Microsoft\Windows\Explorer\thumbcache_*.db" >nul 2>&1
echo %G%[✓]%RESET% Готово

echo %C%[6/8]%RESET% Очистка Prefetch...
del /f /s /q "%WINDIR%\Prefetch\*" >nul 2>&1
echo %G%[✓]%RESET% Готово

echo %C%[7/8]%RESET% Очистка отчетов об ошибках...
if exist "%LOCALAPPDATA%\Microsoft\Windows\WER" (
    rd /s /q "%LOCALAPPDATA%\Microsoft\Windows\WER" >nul 2>&1
)
echo %G%[✓]%RESET% Готово

echo %C%[8/8]%RESET% Запуск очистки диска...
cleanmgr /sagerun:1 >nul 2>&1
echo %G%[✓]%RESET% Готово

echo.
echo %GR%──────────────────────────────────────────────────────%RESET%
echo %G%[✓]%RESET% Быстрая очистка успешно завершена!
echo %GR%Освобождено место на диске!%RESET%
echo.
echo %GR%Нажмите любую клавишу для возврата в меню...%RESET%
pause >nul
goto main_menu

:: ============= ВЫХОД =============
:exit_program
cls
echo.
echo    %B%╔═══════════════════════════════════════════════════════════╗%RESET%
echo    %B%║%RESET%                       %C%ВЫХОД%RESET%                              %B%║%RESET%
echo    %B%╚═══════════════════════════════════════════════════════════╝%RESET%
echo.

echo %G%[✓]%RESET% System Cleaner Pro v3.0
echo %GR%Спасибо за использование!%RESET%
echo.
echo %GR%Программа завершает работу...%RESET%
timeout /t 2 /nobreak >nul
exit