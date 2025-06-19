/*вариант с api - не работает
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

//Запасной вариант на случай ошбок
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
  //ост знаки
  pisces: {
    daily: "День хорош для творчества. Прислушайтесь к интуиции.",
    weekly: "Неделя эмоциональных переживаний. Найдите время для отдыха.",
    monthly: "Месяц духовного роста. Обратите внимание на знаки судьбы."
  }
};

//получение гороскопа
async function getHoroscope(signValue, period = 'daily') {
  try {
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
    //Лок гороскоп если API не работает
    return {
      description: localHoroscopes[signValue]?.[period] || "Гороскоп временно недоступен",
      mood: ['Хорошее', 'Отличное', 'Нейтральное'][Math.floor(Math.random() * 3)],
      luckyNumber: Math.floor(Math.random() * 10) + 1,
      luckyTime: ['утро', 'день', 'вечер'][Math.floor(Math.random() * 3)]
    };
  }
}

let currentSign = null;

function selectSign(signName, signValue) {
  currentSign = { name: signName, value: signValue };
  document.getElementById('userSign').textContent = signName;
  document.getElementById('getHoroscopeBtn').disabled = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('zodiacGrid');
  zodiacSigns.forEach(sign => {
    const element = document.createElement('div');
    element.className = 'zodiac-sign';
    element.innerHTML = `<i>${sign.icon}</i><span>${sign.name}</span>`;
    element.addEventListener('click', () => selectSign(sign.name, sign.value));
    grid.appendChild(element);
  });

  //кнопка показать гороскоп
  document.getElementById('getHoroscopeBtn').addEventListener('click', async () => {
    if (!currentSign) return;
    
    const periodMap = {
      daily: 'daily',
      weekly: 'weekly',
      monthly: 'monthly'
    };
    const period = document.querySelector('.tab-btn.active').dataset.period;
    
    //загрузка
    const contentEl = document.getElementById('horoscopeContent');
    contentEl.innerHTML = `
      <div class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Загружаем ваш гороскоп...</p>
      </div>
    `;
    
    const horoscope = await getHoroscope(currentSign.value, periodMap[period]);
    
    //показ рез-та
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

  //переключение табов
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});*/

//Actro API не работает. АЛЬТЕРНАТИВА


const zodiacData = {
  aries: {
    name: "Овен",
    icon: "♈",
    daily: "Сегодня звезды благоприятствуют смелым действиям! Идеальный день для новых начинаний.",
    weekly: "Неделя начнется активно - используйте эту энергию. К выходным возможны неожиданные повороты.",
    monthly: "Месяц принесет важные встречи. Особое внимание уделите второй неделе - там будут ключевые события."
  },
  taurus: {
    name: "Телец",
    icon: "♉",
    daily: "День стабильности. Хорошее время для решения финансовых вопросов.",
    weekly: "Спокойная неделя. Лучшее время для завершения старых дел.",
    monthly: "Месяц терпения. Результаты придут позже, но будут значительными."
  },
  //для всех знаков
  pisces: {
    name: "Рыбы",
    icon: "♓",
    daily: "День творчества и интуиции. Прислушайтесь к внутреннему голосу.",
    weekly: "Эмоциональная неделя. Найдите время для отдыха и медитации.",
    monthly: "Месяц духовного роста. Обращайте внимание на знаки судьбы."
  }
};

//случ данные
function generateMeta() {
  const moods = ["Отличное", "Хорошее", "Нейтральное", "Волнующее"];
  const times = ["утро", "день", "вечер", "ночь"];
  
  return {
    mood: moods[Math.floor(Math.random() * moods.length)],
    luckyNumber: Math.floor(Math.random() * 9) + 1,
    luckyTime: times[Math.floor(Math.random() * times.length)]
  };
}

function getHoroscope(sign, period) {
  const meta = generateMeta();
  return {
    description: zodiacData[sign][period],
    mood: meta.mood,
    luckyNumber: meta.luckyNumber,
    luckyTime: meta.luckyTime
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('zodiacGrid');
  Object.keys(zodiacData).forEach(sign => {
    const data = zodiacData[sign];
    const element = document.createElement('div');
    element.className = 'zodiac-sign';
    element.innerHTML = `<i>${data.icon}</i><span>${data.name}</span>`;
    element.addEventListener('click', () => {
      document.getElementById('userSign').textContent = data.name;
      document.getElementById('getHoroscopeBtn').disabled = false;
      currentSign = sign;
    });
    grid.appendChild(element);
  });

  let currentSign = null;

  document.getElementById('getHoroscopeBtn').addEventListener('click', () => {
    if (!currentSign) return;
    
    const period = document.querySelector('.tab-btn.active').dataset.period;
    const horoscope = getHoroscope(currentSign, period);
    
    document.getElementById('horoscopeContent').innerHTML = `
      <h4>${zodiacData[currentSign].name} • ${getPeriodName(period)}</h4>
      <div class="prediction">${horoscope.description}</div>
      <div class="details">
        <p><i class="fas fa-smile"></i> <strong>Настроение:</strong> ${horoscope.mood}</p>
        <p><i class="fas fa-star"></i> <strong>Счастливое число:</strong> ${horoscope.luckyNumber}</p>
        <p><i class="fas fa-clock"></i> <strong>Лучшее время:</strong> ${horoscope.luckyTime}</p>
      </div>
    `;
  });

  function getPeriodName(period) {
    return {
      daily: 'Сегодня',
      weekly: 'На неделю',
      monthly: 'На месяц'
    }[period];
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});



