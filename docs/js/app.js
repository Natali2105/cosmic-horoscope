// Инициализация знаков зодиака (с английскими значениями для API)
const zodiacSigns = [
  { name: "Овен", icon: "♈", value: "aries" },
  { name: "Телец", icon: "♉", value: "taurus" },
  { name: "Близнецы", icon: "♊", value: "gemini" },
  { name: "Рак", icon: "♋", value: "cancer" },
  { name: "Лев", icon: "♌", value: "leo" },
  { name: "Дева", icon: "♍", value: "virgo" },
  { name: "Весы", icon: "♎", value: "libra" },
  { name: "Скорпион", icon: "♏", value: "scorpio" },
  { name: "Стрелец", icon: "♐", value: "sagittarius" },
  { name: "Козерог", icon: "♑", value: "capricorn" },
  { name: "Водолей", icon: "♒", value: "aquarius" },
  { name: "Рыбы", icon: "♓", value: "pisces" }
];

// Локальные гороскопы как резервный вариант
const localHoroscopes = {
  aries: {
    daily: "Сегодня звезды благоприятствуют новым начинаниям. Смело действуйте!",
    weekly: "Неделя начнется активно. Во второй половине возможны неожиданные события.",
    monthly: "Месяц принесет важные встречи. Будьте открыты для новых возможностей."
  },
  taurus: {
    daily: "Сегодня сосредоточьтесь на финансовых вопросах. Избегайте импульсивных трат.",
    weekly: "Неделя будет стабильной. Хорошее время для планирования.",
    monthly: "Месяц потребует терпения. Результаты придут позже, но будут значительными."
  },
  // ... добавьте аналогично для всех знаков ...
  pisces: {
    daily: "День хорош для творчества. Прислушайтесь к интуиции.",
    weekly: "Неделя эмоциональных переживаний. Найдите время для отдыха.",
    monthly: "Месяц духовного роста. Обратите внимание на знаки судьбы."
  }
};

// Функция для получения гороскопа
async function getHoroscope(signValue, period = 'daily') {
  try {
    // Пробуем получить реальный гороскоп
    const apiUrl = `https://aztro.sameerkumar.website/?sign=${signValue}&day=${period}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('API не отвечает');
    const data = await response.json();
    
    return {
      description: data.description,
      mood: data.mood || 'Хорошее',
      luckyNumber: data.lucky_number || Math.floor(Math.random() * 10) + 1,
      luckyTime: data.lucky_time || 'день'
    };
  } catch (error) {
    console.log('Используем локальный гороскоп:', error);
    // Возвращаем локальный гороскоп если API не работает
    return {
      description: localHoroscopes[signValue]?.[period] || "Гороскоп временно недоступен",
      mood: ['Хорошее', 'Отличное', 'Нейтральное'][Math.floor(Math.random() * 3)],
      luckyNumber: Math.floor(Math.random() * 10) + 1,
      luckyTime: ['утро', 'день', 'вечер'][Math.floor(Math.random() * 3)]
    };
  }
}

// Выбор знака зодиака
let currentSign = null;

function selectSign(signName, signValue) {
  currentSign = { name: signName, value: signValue };
  document.getElementById('userSign').textContent = signName;
  document.getElementById('getHoroscopeBtn').disabled = false;
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
  // Заполнение сетки знаков зодиака
  const grid = document.getElementById('zodiacGrid');
  zodiacSigns.forEach(sign => {
    const element = document.createElement('div');
    element.className = 'zodiac-sign';
    element.innerHTML = `<i>${sign.icon}</i><span>${sign.name}</span>`;
    element.addEventListener('click', () => selectSign(sign.name, sign.value));
    grid.appendChild(element);
  });

  // Обработчик кнопки "Показать гороскоп"
  document.getElementById('getHoroscopeBtn').addEventListener('click', async () => {
    if (!currentSign) return;
    
    const periodMap = {
      daily: 'daily',
      weekly: 'weekly',
      monthly: 'monthly'
    };
    const period = document.querySelector('.tab-btn.active').dataset.period;
    
    // Показать загрузку
    const contentEl = document.getElementById('horoscopeContent');
    contentEl.innerHTML = `
      <div class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Загружаем ваш гороскоп...</p>
      </div>
    `;
    
    // Получить гороскоп
    const horoscope = await getHoroscope(currentSign.value, periodMap[period]);
    
    // Отобразить результат
    contentEl.innerHTML = `
      <h4>${currentSign.name} • ${period === 'daily' ? 'Сегодня' : period === 'weekly' ? 'На неделю' : 'На месяц'}</h4>
      <div class="prediction">${horoscope.description}</div>
      <div class="details">
        <p><i class="fas fa-smile"></i> <strong>Настроение:</strong> ${horoscope.mood}</p>
        <p><i class="fas fa-star"></i> <strong>Счастливое число:</strong> ${horoscope.luckyNumber}</p>
        <p><i class="fas fa-clock"></i> <strong>Лучшее время:</strong> ${horoscope.luckyTime}</p>
      </div>
    `;
  });

  // Переключение табов
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
