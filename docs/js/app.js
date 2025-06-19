// Инициализация знаков зодиака
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

// Функция для получения реального гороскопа
async function getRealHoroscope(signValue, period = 'today') {
  try {
    const response = await fetch(`https://aztro.sameerkumar.website/?sign=${signValue}&day=${period}`, {
      method: 'POST'
    });
    
    if (!response.ok) throw new Error('API не отвечает');
    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    return {
      description: 'Не удалось загрузить гороскоп. Попробуйте позже.',
      mood: 'Неизвестно',
      lucky_number: '--',
      lucky_time: '--'
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
      daily: 'today',
      weekly: 'week',
      monthly: 'month'
    };
    const period = periodMap[document.querySelector('.tab-btn.active').dataset.period];
    
    // Показать загрузку
    const contentEl = document.getElementById('horoscopeContent');
    contentEl.innerHTML = `
      <div class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Загружаем ваш гороскоп...</p>
      </div>
    `;
    
    // Получить реальный гороскоп
    const horoscope = await getRealHoroscope(currentSign.value, period);
    
    // Отобразить результат
    contentEl.innerHTML = `
      <h4>${currentSign.name} • ${period === 'today' ? 'Сегодня' : period === 'week' ? 'На неделю' : 'На месяц'}</h4>
      <div class="prediction">${horoscope.description}</div>
      <div class="details">
        <p><i class="fas fa-smile"></i> <strong>Настроение:</strong> ${horoscope.mood}</p>
        <p><i class="fas fa-star"></i> <strong>Счастливое число:</strong> ${horoscope.lucky_number}</p>
        <p><i class="fas fa-clock"></i> <strong>Лучшее время:</strong> ${horoscope.lucky_time}</p>
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

  // Голосовой ввод
  document.getElementById('voiceBtn').addEventListener('click', async () => {
    try {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'ru-RU';
      
      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        const foundSign = zodiacSigns.find(s => 
          command.includes(s.name.toLowerCase()) || 
          command.includes(s.value.toLowerCase())
        );
        if (foundSign) selectSign(foundSign.name, foundSign.value);
      };
      
      recognition.start();
    } catch (e) {
      alert('Голосовой ввод не поддерживается в вашем браузере');
    }
  });
});
