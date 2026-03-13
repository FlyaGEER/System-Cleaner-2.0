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
    initFileDownloads(); // Новая функция для скачивания файлов
    
    // Показываем приветственное сообщение
    if (!localStorage.getItem('welcomeShown')) {
        setTimeout(() => {
            showNotification('Добро пожаловать на сайт System Cleaner Pro 3.0!', 'info');
            localStorage.setItem('welcomeShown', 'true');
        }, 1000);
    }
});

// Новая функция для скачивания файлов
function initFileDownloads() {
    // Скачивание EXE файла
    const exeLink = document.querySelector('a[href*="SystemCleaner_Setup.exe"]');
    if (exeLink) {
        exeLink.addEventListener('click', function(e) {
            // Просто скачиваем файл, ничего не блокируем
            console.log('Скачивание EXE файла');
            
            // Показываем уведомление
            showNotification('Скачивание установщика началось!', 'success');
            
            // Увеличиваем счетчик
            let totalDownloads = parseInt(localStorage.getItem('systemCleanerDownloads')) || 1247;
            totalDownloads++;
            localStorage.setItem('systemCleanerDownloads', totalDownloads);
            updateDownloadCounter(totalDownloads);
            
            return true; // Разрешаем скачивание
        });
    }
    
    // Скачивание BAT файла
    const batLink = document.querySelector('a[href*="SystemCleaner.bat"]');
    if (batLink) {
        batLink.addEventListener('click', function(e) {
            // Просто скачиваем файл, ничего не блокируем
            console.log('Скачивание BAT файла');
            
            // Показываем уведомление
            showNotification('Скачивание BAT файла началось!', 'info');
            
            // Увеличиваем счетчик
            let totalDownloads = parseInt(localStorage.getItem('systemCleanerDownloads')) || 1247;
            totalDownloads++;
            localStorage.setItem('systemCleanerDownloads', totalDownloads);
            updateDownloadCounter(totalDownloads);
            
            return true; // Разрешаем скачивание
        });
    }
    
    // Скачивание дополнительных файлов
    document.querySelectorAll('.extra-item').forEach(link => {
        link.addEventListener('click', function() {
            const fileName = this.querySelector('strong')?.textContent || 'файл';
            showNotification(`Скачивание ${fileName} началось!`, 'info');
            
            // Увеличиваем счетчик
            let totalDownloads = parseInt(localStorage.getItem('systemCleanerDownloads')) || 1247;
            totalDownloads++;
            localStorage.setItem('systemCleanerDownloads', totalDownloads);
            updateDownloadCounter(totalDownloads);
        });
    });
}

// FAQ аккордеон
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-q');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqCard = this.closest('.faq-card');
            if (!faqCard) return;
            
            const isActive = faqCard.classList.contains('active');
            
            // Закрываем все открытые вопросы
            document.querySelectorAll('.faq-card.active').forEach(item => {
                if (item !== faqCard) {
                    item.classList.remove('active');
                }
            });
            
            // Открываем/закрываем текущий вопрос
            if (!isActive) {
                faqCard.classList.add('active');
            } else {
                faqCard.classList.remove('active');
            }
            
            // На мобильных прокручиваем к открытому вопросу
            if (window.innerWidth < 768 && !isActive) {
                setTimeout(() => {
                    faqCard.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 300);
            }
        });
    });
    
    console.log('FAQ initialized with', faqQuestions.length, 'questions');
}

// Отслеживание скачиваний
function initDownloadTracking() {
    let totalDownloads = parseInt(localStorage.getItem('systemCleanerDownloads')) || 1247;
    
    // Создаем счетчик на странице
    createDownloadCounter(totalDownloads);
}

function createDownloadCounter(count) {
    const downloadSection = document.querySelector('.download');
    if (downloadSection && !document.querySelector('.download-counter')) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'download-counter';
        counterDiv.innerHTML = `
            <div class="counter-inner">
                <i class="fas fa-download"></i>
                <div class="counter-text">
                    <span class="counter-title">Всего скачиваний</span>
                    <span class="counter-value">${count.toLocaleString()}</span>
                </div>
            </div>
        `;
        
        // Добавляем стили для счетчика
        if (!document.querySelector('#counter-styles')) {
            const style = document.createElement('style');
            style.id = 'counter-styles';
            style.textContent = `
                .download-counter {
                    background: linear-gradient(135deg, #2ef7e5, #1fc0b0);
                    color: #0a0c12;
                    padding: 20px;
                    border-radius: 16px;
                    margin: 30px auto 20px;
                    max-width: 400px;
                    box-shadow: 0 10px 25px rgba(46, 247, 229, 0.3);
                    animation: fadeIn 0.5s ease;
                    border: 1px solid rgba(255,255,255,0.2);
                }
                .counter-inner {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    justify-content: center;
                }
                .counter-inner i {
                    font-size: 40px;
                    color: #0a0c12;
                    opacity: 0.8;
                }
                .counter-text {
                    display: flex;
                    flex-direction: column;
                }
                .counter-title {
                    font-size: 14px;
                    opacity: 0.8;
                    margin-bottom: 4px;
                    font-weight: 500;
                }
                .counter-value {
                    font-size: 32px;
                    font-weight: 800;
                    line-height: 1;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        downloadSection.insertBefore(counterDiv, downloadSection.firstChild);
    }
}

function updateDownloadCounter(count) {
    const counterValue = document.querySelector('.counter-value');
    if (counterValue) {
        counterValue.textContent = count.toLocaleString();
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
            privacyModal.style.display = 'flex';
        });
    }
    
    if (termsBtn && termsModal) {
        termsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            termsModal.style.display = 'flex';
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
    const copyrightText = document.querySelector('.copyright');
    
    if (copyrightText) {
        copyrightText.innerHTML = copyrightText.innerHTML.replace(/\d{4}/, currentYear);
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
    document.querySelectorAll('.card, .cap-card, .step-card, .extra-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // Проверка видимости при загрузке
    setTimeout(() => {
        document.querySelectorAll('.card, .cap-card, .step-card, .extra-item').forEach(el => {
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
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
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