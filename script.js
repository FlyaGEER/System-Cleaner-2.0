// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('System Cleaner Pro Website loaded');
    
    // Инициализация всех компонентов
    initFAQ();
    initDownloadTracking();
    initModal();
    initSmoothScroll();
    updateCopyrightYear();
    initAnimations();
    initZipDownload();
    
    // Показываем приветственное сообщение
    if (!localStorage.getItem('welcomeShown')) {
        setTimeout(() => {
            showNotification('Добро пожаловать на сайт System Cleaner Pro 3.0!', 'info');
            localStorage.setItem('welcomeShown', 'true');
        }, 1000);
    }
});

// Добавьте эту функцию в ваш script.js
function initZipDownload() {
    // Отслеживаем клики по ссылке на EXE файл
    const exeLink = document.querySelector('a[href*="SystemCleaner_Setup.exe"]');
    if (exeLink) {
        exeLink.addEventListener('click', function(e) {
            // Показываем сообщение о скачивании
            showDownloadNotification('Установщик начал скачиваться! Запустите его от имени администратора.');
            
            // Увеличиваем счетчик скачиваний
            let downloads = parseInt(localStorage.getItem('exeDownloads')) || 0;
            downloads++;
            localStorage.setItem('exeDownloads', downloads);
        });
    }
    
    // Отслеживаем клики по BAT файлу (предупреждение)
    const batLinks = document.querySelectorAll('a[href*=".bat"]');
    batLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('SystemCleaner.bat')) {
                e.preventDefault();
                showBatWarning();
                return false;
            }
        });
    });
}

function showDownloadNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <div>
            <strong>Скачивание началось!</strong>
            <p>${message}</p>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 3s;
        animation-fill-mode: forwards;
        max-width: 400px;
    `;
    
    // Добавляем стили анимации
    const style = document.createElement('style');
    if (!document.querySelector('#download-notification-styles')) {
        style.id = 'download-notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3500);
}

function showBatWarning() {
    const warning = document.createElement('div');
    warning.className = 'bat-warning-modal';
    warning.innerHTML = `
        <div class="modal-overlay" onclick="closeBatWarning()"></div>
        <div class="modal-content">
            <h3><i class="fas fa-exclamation-triangle"></i> Внимание!</h3>
            <p>Вы скачиваете <strong>SystemCleaner.bat</strong> — это текстовый файл программы.</p>
            <p>Браузер может открыть его как текст вместо скачивания.</p>
            
            <div class="recommendation">
                <i class="fas fa-lightbulb"></i>
                <p>Рекомендуем скачать <strong>установочную версию (EXE)</strong> — удобная установка!</p>
            </div>
            
            <div class="modal-buttons">
                <button class="btn-secondary" onclick="closeBatWarning()">
                    Отмена
                </button>
                <a href="downloads/SystemCleaner.bat" download class="btn-primary" onclick="closeBatWarning()">
                    Скачать BAT файл
                </a>
            </div>
        </div>
    `;
    
    // Добавляем стили для модального окна
    const style = document.createElement('style');
    if (!document.querySelector('#bat-warning-styles')) {
        style.id = 'bat-warning-styles';
        style.textContent = `
            .bat-warning-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .bat-warning-modal .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
                cursor: pointer;
            }
            .bat-warning-modal .modal-content {
                position: relative;
                background: white;
                border-radius: 16px;
                padding: 30px;
                width: 90%;
                max-width: 500px;
                z-index: 10000;
                animation: modalSlideUp 0.4s ease;
            }
            .bat-warning-modal h3 {
                color: #2c3e50;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .bat-warning-modal p {
                color: #555;
                margin-bottom: 15px;
                line-height: 1.6;
            }
            .bat-warning-modal .recommendation {
                background: #f0fff4;
                border: 1px solid #c6f6d5;
                border-radius: 10px;
                padding: 15px;
                margin: 20px 0;
                display: flex;
                gap: 12px;
            }
            .bat-warning-modal .recommendation i {
                color: #48bb78;
                font-size: 20px;
                margin-top: 2px;
            }
            .bat-warning-modal .recommendation p {
                margin: 0;
                color: #276749;
            }
            .bat-warning-modal .modal-buttons {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            .bat-warning-modal .btn-secondary,
            .bat-warning-modal .btn-primary {
                flex: 1;
                padding: 12px;
                border-radius: 8px;
                border: none;
                font-weight: 600;
                cursor: pointer;
                text-decoration: none;
                text-align: center;
                font-size: 14px;
                transition: all 0.3s ease;
            }
            .bat-warning-modal .btn-secondary {
                background: #e2e8f0;
                color: #4a5568;
            }
            .bat-warning-modal .btn-secondary:hover {
                background: #cbd5e0;
            }
            .bat-warning-modal .btn-primary {
                background: linear-gradient(45deg, #4299e1, #667eea);
                color: white;
            }
            .bat-warning-modal .btn-primary:hover {
                background: linear-gradient(45deg, #667eea, #4299e1);
            }
            @keyframes modalSlideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
            }
        }
    `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(warning);
}

function closeBatWarning() {
    const warning = document.querySelector('.bat-warning-modal');
    if (warning) {
        warning.remove();
    }
}

// FAQ аккордеон
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Закрываем все открытые вопросы
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Открываем/закрываем текущий вопрос
            if (!isActive) {
                faqItem.classList.add('active');
            }
            
            // На мобильных прокручиваем к открытому вопросу
            if (window.innerWidth < 768 && !isActive) {
                setTimeout(() => {
                    faqItem.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 300);
            }
        });
    });
}

// Отслеживание скачиваний и показ инструкции
function initDownloadTracking() {
    let totalDownloads = parseInt(localStorage.getItem('systemCleanerDownloads')) || 0;
    
    // Создаем счетчик на странице
    createDownloadCounter(totalDownloads);
    
    // Обработка всех ссылок для скачивания
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', function(e) {
            const fileName = this.getAttribute('download') || this.href.split('/').pop();
            const isBatFile = fileName.endsWith('.bat');
            const isExeFile = fileName.endsWith('.exe');
            
            // Увеличиваем счетчик
            totalDownloads++;
            localStorage.setItem('systemCleanerDownloads', totalDownloads);
            updateDownloadCounter(totalDownloads);
            
            // Анимация кнопки
            animateDownloadButton(this);
            
            // Для BAT файлов показываем инструкцию
            if (isBatFile && !this.classList.contains('secondary-btn')) {
                return true; // Разрешаем скачивание, предупреждение показывается в initZipDownload
            }
            
            // Для EXE файлов показываем успешное сообщение
            if (isExeFile) {
                showNotification('Установщик скачивается! Запустите его от имени администратора.', 'success');
            }
            
            // Продолжаем стандартную загрузку
            return true;
        });
    });
}

function createDownloadCounter(count) {
    const downloadSection = document.querySelector('.download-section');
    if (downloadSection && !document.querySelector('.download-counter')) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'download-counter';
        counterDiv.innerHTML = `
            <div class="counter-inner">
                <i class="fas fa-download"></i>
                <div class="counter-text">
                    <span class="counter-title">Программа скачана</span>
                    <span class="counter-value">${count} раз</span>
                </div>
            </div>
        `;
        
        // Добавляем стили для счетчика
        const style = document.createElement('style');
        style.textContent = `
            .download-counter {
                background: linear-gradient(135deg, #4299e1, #667eea);
                color: white;
                padding: 20px;
                border-radius: 12px;
                margin: 30px auto;
                max-width: 400px;
                box-shadow: 0 10px 25px rgba(66, 153, 225, 0.3);
                animation: fadeIn 0.5s ease;
            }
            .counter-inner {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .counter-inner i {
                font-size: 32px;
                color: #bee3f8;
            }
            .counter-text {
                display: flex;
                flex-direction: column;
            }
            .counter-title {
                font-size: 12px;
                opacity: 0.9;
                margin-bottom: 4px;
            }
            .counter-value {
                font-size: 28px;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
        
        downloadSection.appendChild(counterDiv);
    }
}

function updateDownloadCounter(count) {
    const counterValue = document.querySelector('.counter-value');
    if (counterValue) {
        counterValue.textContent = count;
    }
}

function animateDownloadButton(button) {
    const originalTransform = button.style.transform;
    const originalBoxShadow = button.style.boxShadow;
    
    button.style.transform = 'scale(0.95)';
    button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    
    // Эффект пульсации
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = rect.left + rect.width / 2 - size / 2 + 'px';
    ripple.style.top = rect.top + rect.height / 2 - size / 2 + 'px';
    
    document.body.appendChild(ripple);
    
    // Восстанавливаем кнопку
    setTimeout(() => {
        button.style.transform = originalTransform;
        button.style.boxShadow = originalBoxShadow;
        ripple.remove();
    }, 300);
}

// Показ инструкции для BAT файлов
function showBatInstruction(fileName) {
    const modal = document.createElement('div');
    modal.className = 'bat-instruction-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeBatInstruction()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-exclamation-triangle"></i> Важная информация!</h3>
                <button class="close-btn" onclick="closeBatInstruction()">&times;</button>
            </div>
            <div class="modal-body">
                <p>Вы скачиваете <strong>${fileName}</strong> — это программа для Windows.</p>
                
                <div class="instruction-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Сохраните файл</h4>
                        <p>Сохраните файл в удобную папку на компьютере</p>
                    </div>
                </div>
                
                <div class="instruction-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Запустите правильно</h4>
                        <p><strong>Нажмите правой кнопкой мыши</strong> на файле и выберите:</p>
                        <div class="code-block">
                            "Запуск от имени администратора"
                        </div>
                    </div>
                </div>
                
                <div class="instruction-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Используйте меню</h4>
                        <p>В программе используйте цифры <strong>1-7</strong> для навигации</p>
                    </div>
                </div>
                
                <div class="recommendation">
                    <i class="fas fa-lightbulb"></i>
                    <p>Рекомендуем скачать <strong>установочную версию (EXE)</strong> — удобная установка!</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeBatInstruction()">
                    <i class="fas fa-times"></i> Отмена
                </button>
                <a href="downloads/SystemCleaner.bat" download class="btn-primary" onclick="closeBatInstruction()">
                    <i class="fas fa-download"></i> Скачать BAT файл
                </a>
            </div>
        </div>
    `;
    
    // Добавляем стили
    const style = document.createElement('style');
    style.textContent = `
        .bat-instruction-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            cursor: pointer;
        }
        .bat-instruction-modal .modal-content {
            position: relative;
            background: white;
            border-radius: 16px;
            width: 90%;
            max-width: 500px;
            z-index: 10000;
            animation: slideUp 0.4s ease;
        }
        .bat-instruction-modal .modal-header {
            padding: 20px;
            background: linear-gradient(45deg, #ed8936, #dd6b20);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 16px 16px 0 0;
        }
        .bat-instruction-modal .modal-header h3 {
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            line-height: 1;
        }
        .bat-instruction-modal .modal-body {
            padding: 25px;
        }
        .bat-instruction-modal .instruction-step {
            display: flex;
            gap: 15px;
            margin: 20px 0;
            padding: 15px;
            background: #f7fafc;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
        }
        .step-number {
            width: 32px;
            height: 32px;
            background: #4299e1;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }
        .step-content h4 {
            margin: 0 0 8px 0;
            color: #2d3748;
        }
        .step-content p {
            margin: 0;
            color: #4a5568;
            font-size: 14px;
        }
        .code-block {
            background: #2d3748;
            color: #e2e8f0;
            padding: 10px 15px;
            border-radius: 6px;
            font-family: 'Consolas', monospace;
            font-size: 14px;
            margin-top: 8px;
            border-left: 4px solid #4299e1;
        }
        .recommendation {
            background: #f0fff4;
            border: 1px solid #c6f6d5;
            border-radius: 10px;
            padding: 15px;
            display: flex;
            gap: 12px;
            margin-top: 20px;
        }
        .recommendation i {
            color: #48bb78;
            font-size: 20px;
            margin-top: 2px;
        }
        .recommendation p {
            margin: 0;
            color: #276749;
            font-size: 14px;
        }
        .bat-instruction-modal .modal-footer {
            padding: 20px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 10px;
        }
        .bat-instruction-modal .btn-secondary,
        .bat-instruction-modal .btn-primary {
            flex: 1;
            padding: 12px;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-decoration: none;
            font-size: 14px;
        }
        .bat-instruction-modal .btn-secondary {
            background: #e2e8f0;
            color: #4a5568;
        }
        .bat-instruction-modal .btn-primary {
            background: linear-gradient(45deg, #4299e1, #667eea);
            color: white;
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes rippleEffect {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
}

function closeBatInstruction() {
    const modal = document.querySelector('.bat-instruction-modal');
    if (modal) {
        modal.remove();
    }
}

// Модальное окно
function initModal() {
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');
    
    // Получаем кнопки для открытия модальных окон
    const privacyBtn = document.getElementById('privacyBtn');
    const termsBtn = document.getElementById('termsBtn');
    
    // Функция для закрытия модальных окон
    const closeModals = () => {
        if (privacyModal) privacyModal.style.display = 'none';
        if (termsModal) termsModal.style.display = 'none';
    };
    
    // Обработчики для кнопок открытия
    if (privacyBtn && privacyModal) {
        privacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            privacyModal.style.display = 'block';
        });
    }
    
    if (termsBtn && termsModal) {
        termsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            termsModal.style.display = 'block';
        });
    }
    
    // Закрытие по клику на крестик
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    // Закрытие по клику вне окна
    window.addEventListener('click', (e) => {
        if (privacyModal && e.target === privacyModal) {
            privacyModal.style.display = 'none';
        }
        if (termsModal && e.target === termsModal) {
            termsModal.style.display = 'none';
        }
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Обновление года в футере
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-bottom p');
    
    if (copyrightText && copyrightText.textContent.includes('2024')) {
        copyrightText.innerHTML = copyrightText.innerHTML.replace('2024', currentYear);
    }
}

// Анимации элементов
function initAnimations() {
    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.download-card, .capability, .step, .material-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // Проверка видимости при загрузке
    setTimeout(() => {
        document.querySelectorAll('.download-card, .capability, .step, .material-card').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 100);
}

// Система уведомлений
function showNotification(message, type = 'info') {
    // Удаляем старые уведомления
    const oldNotifications = document.querySelectorAll('.site-notification');
    oldNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `site-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Стили уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 9998;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        animation-fill-mode: forwards;
        max-width: 400px;
    `;
    
    // Добавляем стили анимации
    const style = document.createElement('style');
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#48bb78',
        'error': '#f56565',
        'warning': '#ed8936',
        'info': '#4299e1'
    };
    return colors[type] || '#4299e1';
}

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Произошла ошибка:', e.error);
    
    // Показываем пользователю уведомление об ошибке
    if (window.location.hostname !== 'localhost') {
        showNotification('Произошла ошибка при загрузке страницы. Пожалуйста, обновите страницу.', 'error');
    }
});

// Запуск после полной загрузки
window.addEventListener('load', function() {
    console.log('Страница полностью загружена');
});

// Делаем функции глобально доступными
window.closeBatWarning = closeBatWarning;
window.closeBatInstruction = closeBatInstruction;