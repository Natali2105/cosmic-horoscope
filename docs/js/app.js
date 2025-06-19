// Инициализация знаков зодиака
const zodiacSigns = [
  { name: "Овен", icon: "♈", dates: "21 марта - 19 апреля" },
  { name: "Телец", icon: "♉", dates: "20 апреля - 20 мая" },
  { name: "Близнецы", icon: "♊", dates: "21 мая - 20 июня" },
  { name: "Рак", icon: "♋", dates: "21 июня - 22 июля" },
  { name: "Лев", icon: "♌", dates: "23 июля - 22 августа" },
  { name: "Дева", icon: "♍", dates: "23 августа - 22 сентября" },
  { name: "Весы", icon: "♎", dates: "23 сентября - 22 октября" },
  { name: "Скорпион", icon: "♏", dates: "23 октября - 21 ноября" },
  { name: "Стрелец", icon: "♐", dates: "22 ноября - 21 декабря" },
  { name: "Козерог", icon: "♑", dates: "22 декабря - 19 января" },
  { name: "Водолей", icon: "♒", dates: "20 января - 18 февраля" },
  { name: "Рыбы", icon: "♓", dates: "19 февраля - 20 марта" }
];

// Генерация гороскопов (заглушка)
function generateHoroscope(sign, period) {
  const predictions = [
    "Звезды советуют вам сегодня...",
    "Меркурий в ретроградном движении..."
  ];
  return predictions[Math.floor(Math.random() * predictions.length)];
}
//выбор знака зодиака
function selectSign(signName) {
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
    element.addEventListener('click', () => selectSign(sign.name));
    grid.appendChild(element);
  });

  // Обработчик кнопки "Показать гороскоп"
  document.getElementById('getHoroscopeBtn').addEventListener('click', () => {
    const selectedSign = document.getElementById('userSign').textContent;
    if (selectedSign !== 'Не выбран') {
      const period = document.querySelector('.tab-btn.active').dataset.period;
      const horoscope = generateHoroscope(selectedSign, period);
      document.getElementById('horoscopeContent').innerHTML = `
        <h4>Гороскоп для ${selectedSign}</h4>
        <p>${horoscope}</p>
      `;
    }
  });

  document.getElementById('voiceBtn').addEventListener('click', async () => {
  try {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      if (command.includes('гороскоп')) {
        // Анализ команды и поиск знака зодиака
        const sign = zodiacSigns.find(s => command.includes(s.name.toLowerCase()));
        if (sign) selectSign(sign.name);
      }
    };
    recognition.start();
  } catch (e) {
    alert('Голосовой ввод не поддерживается в вашем браузере');
  }
});
  
});



// Добавьте эту функцию для получения реального гороскопа
async function getRealHoroscope(sign, period = 'today') {
  try {
    const response = await fetch(`https://aztro.sameerkumar.website/?sign=${sign.toLowerCase()}&day=${period}`, {
      method: 'POST'
    });
    
    if (!response.ok) {
      throw new Error('Ошибка получения гороскопа');
    }
    
    const data = await response.json();
    return {
      prediction: data.description,
      mood: data.mood,
      luckyNumber: data.lucky_number,
      luckyTime: data.lucky_time
    };
  } catch (error) {
    console.error('Ошибка:', error);
    return {
      prediction: 'Не удалось получить гороскоп. Попробуйте позже.',
      mood: '',
      luckyNumber: '',
      luckyTime: ''
    };
  }
}

// Обновите обработчик кнопки
document.getElementById('getHoroscopeBtn').addEventListener('click', async () => {
  const selectedSign = document.getElementById('userSign').textContent;
  if (selectedSign !== 'Не выбран') {
    const period = document.querySelector('.tab-btn.active').dataset.period;
    
    // Показать загрузку
    document.getElementById('horoscopeContent').innerHTML = '<p>Загрузка гороскопа...</p>';
    
    // Получить реальный гороскоп
    const horoscope = await getRealHoroscope(selectedSign, period);
    
    // Отобразить результат
    document.getElementById('horoscopeContent').innerHTML = `
      <h4>Гороскоп для ${selectedSign}</h4>
      <p>${horoscope.prediction}</p>
      <div class="horoscope-details">
        <p><strong>Настроение:</strong> ${horoscope.mood}</p>
        <p><strong>Счастливое число:</strong> ${horoscope.luckyNumber}</p>
        <p><strong>Благоприятное время:</strong> ${horoscope.luckyTime}</p>
      </div>
    `;
  }
});


// В app.js
function getHoroscopeCacheKey(sign, period) {
  return `horoscope_${sign}_${period}_${new Date().toISOString().split('T')[0]}`;
}

async function getCachedHoroscope(sign, period) {
  const cacheKey = getHoroscopeCacheKey(sign, period);
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const freshHoroscope = await getRealHoroscope(sign, period);
  localStorage.setItem(cacheKey, JSON.stringify(freshHoroscope));
  return freshHoroscope;
}
