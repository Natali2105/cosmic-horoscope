/*вариант с api - не работает

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
    daily: "Сегодня звезды благоприятствуют смелым действиям! Идеальный день для новых начинаний и решительных поступков.",
    weekly: "Неделя начнется с мощного энергетического подъема - используйте эту энергию продуктивно. К выходным возможны неожиданные повороты событий.",
    monthly: "Месяц принесет важные встречи и знакомства. Особое внимание уделите второй неделе - там будут ключевые события, которые повлияют на ваше ближайшее будущее."
  },
  taurus: {
    name: "Телец",
    icon: "♉",
    daily: "День стабильности и размеренности. Хорошее время для решения финансовых вопросов и планирования бюджета.",
    weekly: "Спокойная и продуктивная неделя. Лучшее время для завершения старых дел и реализации отложенных планов.",
    monthly: "Месяц терпения и постепенного прогресса. Результаты придут позже, чем вы ожидаете, но будут более значительными и долговечными."
  },
  gemini: {
    name: "Близнецы",
    icon: "♊",
    daily: "День активного общения и новых знакомств. Будьте открыты для неожиданных контактов и спонтанных встреч.",
    weekly: "Неделя интеллектуального роста и обучения. Возможны важные переговоры или получение интересной информации.",
    monthly: "Месяц перемен и многозадачности. Вам придется успевать делать несколько дел одновременно, но вы справитесь блестяще."
  },
  cancer: {
    name: "Рак",
    icon: "♋",
    daily: "День эмоций и чувств. Прислушайтесь к своей интуиции - сегодня она особенно сильна.",
    weekly: "Неделя семейных дел и домашних забот. Хорошее время для укрепления отношений с близкими людьми.",
    monthly: "Месяц душевного равновесия и гармонии. Обратите внимание на свой внутренний мир и психологический комфорт."
  },
  leo: {
    name: "Лев",
    icon: "♌",
    daily: "День творчества и самовыражения. Не бойтесь показать свои таланты - сегодня вас оценят по достоинству.",
    weekly: "Неделя признания и успеха. Ваши достижения будут замечены, возможно получение награды или похвалы.",
    monthly: "Месяц лидерства и уверенности в себе. Вы сможете повести за собой людей и вдохновить их на великие дела."
  },
  virgo: {
    name: "Дева",
    icon: "♍",
    daily: "День анализа и планирования. Хорошее время для систематизации информации и наведения порядка.",
    weekly: "Неделя здоровья и продуктивности. Идеальное время для начала диеты, тренировок или полезных привычек.",
    monthly: "Месяц детальной работы и совершенствования. Мелкие, но регулярные усилия приведут к значительным результатам."
  },
  libra: {
    name: "Весы",
    icon: "♎",
    daily: "День гармонии и партнерства. Хорошее время для примирения и налаживания отношений.",
    weekly: "Неделя баланса и справедливости. Вы сможете объективно оценить ситуацию и найти оптимальное решение.",
    monthly: "Месяц эстетики и красоты. Окружите себя приятными вещами и людьми, это поднимет ваше настроение."
  },
  scorpio: {
    name: "Скорпион",
    icon: "♏",
    daily: "День страсти и решительности. Ваша энергия на пике - используйте ее для преодоления препятствий.",
    weekly: "Неделя трансформации и изменений. Возможны неожиданные повороты, которые изменят вашу жизнь к лучшему.",
    monthly: "Месяц глубины и проницательности. Вы сможете разгадать самые сложные загадки и понять скрытые мотивы людей."
  },
  sagittarius: {
    name: "Стрелец",
    icon: "♐",
    daily: "День приключений и новых впечатлений. Откройтесь миру и позвольте себе спонтанные решения.",
    weekly: "Неделя расширения горизонтов. Возможны поездки, обучение или знакомство с интересными людьми.",
    monthly: "Месяц оптимизма и философских размышлений. Вы найдете ответы на важные жизненные вопросы."
  },
  capricorn: {
    name: "Козерог",
    icon: "♑",
    daily: "День дисциплины и ответственности. Трудолюбие и упорство принесут ощутимые результаты.",
    weekly: "Неделя карьерного роста и профессиональных достижений. Ваши усилия будут замечены начальством.",
    monthly: "Месяц стабильности и долгосрочного планирования. Хорошее время для инвестиций и решения финансовых вопросов."
  },
  aquarius: {
    name: "Водолей",
    icon: "♒",
    daily: "День оригинальных идей и нестандартных решений. Доверьтесь своей интуиции и креативности.",
    weekly: "Неделя дружбы и коллективной работы. Вместе с единомышленниками вы сможете реализовать интересные проекты.",
    monthly: "Месяц инноваций и технологий. Вы будете в курсе последних тенденций и сможете применить их на практике."
  },
  pisces: {
    name: "Рыбы",
    icon: "♓",
    daily: "День творчества и духовного роста. Прислушайтесь к своему внутреннему голосу - он подскажет верное решение.",
    weekly: "Эмоциональная и чувствительная неделя. Найдите время для отдыха, медитации и творческого самовыражения.",
    monthly: "Месяц интуиции и сострадания. Вы сможете понять окружающих без слов и оказать им нужную поддержку."
  }
};

// Кэш для хранения результатов
const horoscopeCache = {};
const compatibilityCache = {};

// Получение гороскопа с кэшированием
function getHoroscope(sign, period) {
  const cacheKey = `${sign}_${period}`;
  
  if (!horoscopeCache[cacheKey]) {
    const meta = generateMeta();
    horoscopeCache[cacheKey] = {
      description: zodiacData[sign][period],
      mood: meta.mood,
      luckyNumber: meta.luckyNumber,
      luckyTime: meta.luckyTime
    };
  }
  
  return horoscopeCache[cacheKey];
}

// Проверка совместимости с кэшированием
function checkCompatibility(sign1, sign2) {
  const cacheKey = `${sign1}_${sign2}`;
  
  if (!compatibilityCache[cacheKey]) {
    const compatibility = Math.floor(Math.random() * 90) + 10;
    let message = '';
    
    if (compatibility < 30) {
      message = 'Низкая совместимость. Возможны трудности в отношениях.';
    } else if (compatibility < 60) {
      message = 'Средняя совместимость. Отношения возможны, но потребуют усилий.';
    } else if (compatibility < 85) {
      message = 'Хорошая совместимость! У вас много общего.';
    } else {
      message = 'Отличная совместимость! Идеальное сочетание!';
    }
    
    compatibilityCache[cacheKey] = {
      score: compatibility,
      message: message
    };
  }
  
  return compatibilityCache[cacheKey];
}

function generateMeta() {
  const moods = ["Отличное", "Хорошее", "Нейтральное", "Волнующее"];
  const times = ["утро", "день", "вечер", "ночь"];
  
  return {
    mood: moods[Math.floor(Math.random() * moods.length)],
    luckyNumber: Math.floor(Math.random() * 9) + 1,
    luckyTime: times[Math.floor(Math.random() * times.length)]
  };
}

function getPeriodName(period) {
  const periodNames = {
    daily: 'Сегодня',
    weekly: 'На неделю',
    monthly: 'На месяц'
  };
  return periodNames[period] || period;
}

document.addEventListener('DOMContentLoaded', () => {
  let currentSign = null;
  let currentPeriod = 'daily';

  // Инициализация голосового помощника
  const voiceBtn = document.getElementById('voiceBtn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      startVoiceAssistant();
    });
  }

  async function startVoiceAssistant() {
    try {
      voiceBtn.innerHTML = '<i class="fas fa-microphone-alt"></i> Слушаю...';
      voiceBtn.classList.add('listening');
      
      setTimeout(() => {
        resetVoiceButton();
        
        // Пример обработки голосовой команды
        const command = prompt("Что вы хотите узнать? Например: 'Гороскоп для Овна на неделю' или 'Совместимость Овна и Тельца'");
        
        if (command) {
          processVoiceCommand(command.toLowerCase());
        }
      }, 1000);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось запустить голосовой помощник');
      resetVoiceButton();
    }
  }

  function processVoiceCommand(text) {
    // Обработка запроса на гороскоп
    if (text.includes('гороскоп') || text.includes('предсказание') || text.includes('что ждет')) {
      const signs = {
        'овен': 'aries', 'овна': 'aries',
        'телец': 'taurus', 'тельца': 'taurus',
        'близнец': 'gemini', 'близнецов': 'gemini',
        'рак': 'cancer', 'рака': 'cancer',
        'лев': 'leo', 'льва': 'leo',
        'дева': 'virgo', 'девы': 'virgo',
        'весы': 'libra', 'весов': 'libra',
        'скорпион': 'scorpio', 'скорпиона': 'scorpio',
        'стрелец': 'sagittarius', 'стрельца': 'sagittarius',
        'козерог': 'capricorn', 'козерога': 'capricorn',
        'водолей': 'aquarius', 'водолея': 'aquarius',
        'рыбы': 'pisces', 'рыб': 'pisces'
      };
      
      let foundSign = null;
      let period = currentPeriod;
      
      // Поиск знака зодиака в команде
      for (const [rusSign, engSign] of Object.entries(signs)) {
        if (text.includes(rusSign)) {
          foundSign = engSign;
          break;
        }
      }
      
      // Определение периода
      if (text.includes('недел') || text.includes('неделю')) period = 'weekly';
      if (text.includes('месяц') || text.includes('месяца')) period = 'monthly';
      
      if (foundSign) {
        currentSign = foundSign;
        currentPeriod = period;
        updateActiveTab(period);
        updateSelectedSign(foundSign);
        showHoroscope(foundSign, period);
      } else {
        alert('Не удалось распознать знак зодиака. Попробуйте сказать, например: "Гороскоп для Овна на неделю"');
      }
    } 
    // Обработка запроса на совместимость
    else if (text.includes('совместимость') || text.includes('совместимы')) {
      const signs = {
        'овен': 'aries', 'овна': 'aries',
        'телец': 'taurus', 'тельца': 'taurus',
        'близнец': 'gemini', 'близнецов': 'gemini',
        'рак': 'cancer', 'рака': 'cancer',
        'лев': 'leo', 'льва': 'leo',
        'дева': 'virgo', 'девы': 'virgo',
        'весы': 'libra', 'весов': 'libra',
        'скорпион': 'scorpio', 'скорпиона': 'scorpio',
        'стрелец': 'sagittarius', 'стрельца': 'sagittarius',
        'козерог': 'capricorn', 'козерога': 'capricorn',
        'водолей': 'aquarius', 'водолея': 'aquarius',
        'рыбы': 'pisces', 'рыб': 'pisces'
      };
      
      let sign1 = null;
      let sign2 = null;
      
      // Поиск знаков зодиака в команде
      for (const [rusSign, engSign] of Object.entries(signs)) {
        if (text.includes(rusSign)) {
          if (!sign1) {
            sign1 = engSign;
          } else {
            sign2 = engSign;
            break;
          }
        }
      }
      
      if (sign1 && sign2) {
        showCompatibilityResult(sign1, sign2);
      } else {
        alert('Не удалось распознать знаки зодиака. Попробуйте сказать, например: "Совместимость Овна и Тельца"');
      }
    } else {
      alert('Команда не распознана. Попробуйте сказать, например: "Гороскоп для Овна на неделю" или "Совместимость Овна и Тельца"');
    }
  }

  function resetVoiceButton() {
    if (voiceBtn) {
      voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Голосовой поиск';
      voiceBtn.classList.remove('listening');
    }
  }

  function updateActiveTab(period) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.period === period) {
        btn.classList.add('active');
      }
    });
  }

  function updateSelectedSign(sign) {
    const zodiacSigns = document.querySelectorAll('.zodiac-sign');
    zodiacSigns.forEach(el => {
      el.classList.remove('selected');
      if (el.querySelector('i').textContent === zodiacData[sign].icon) {
        el.classList.add('selected');
      }
    });
  }

  function showHoroscope(sign, period) {
    const horoscope = getHoroscope(sign, period);
    const horoscopeContent = document.getElementById('horoscopeContent');
    
    if (horoscopeContent) {
      horoscopeContent.innerHTML = `
        <h4>${zodiacData[sign].name} • ${getPeriodName(period)}</h4>
        <div class="prediction">${horoscope.description}</div>
        <div class="details">
          <p><i class="fas fa-smile"></i> <strong>Настроение:</strong> ${horoscope.mood}</p>
          <p><i class="fas fa-star"></i> <strong>Счастливое число:</strong> ${horoscope.luckyNumber}</p>
          <p><i class="fas fa-clock"></i> <strong>Лучшее время:</strong> ${horoscope.luckyTime}</p>
        </div>
      `;
    }

    // Обновляем подсветку выбранного знака
    updateSelectedSign(sign);
    
    const horoscopeResult = document.getElementById('horoscopeResult');
    if (horoscopeResult) horoscopeResult.scrollIntoView({ behavior: 'smooth' });
  }

  function showCompatibilityResult(sign1, sign2) {
    const result = checkCompatibility(sign1, sign2);
    const compatibilityResult = document.getElementById('compatibilityResult');
    
    if (compatibilityResult) {
      compatibilityResult.innerHTML = `
        <div class="compatibility-score">
          <div class="score-circle" style="--score: ${result.score}">
            <span>${result.score}%</span>
          </div>
          <p>${zodiacData[sign1].name} и ${zodiacData[sign2].name}</p>
          <p class="compatibility-message">${result.message}</p>
        </div>
      `;
      compatibilityResult.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Заполнение сетки знаков зодиака
  const zodiacGrid = document.getElementById('zodiacGrid');
  if (zodiacGrid) {
    Object.keys(zodiacData).forEach(sign => {
      const data = zodiacData[sign];
      const element = document.createElement('div');
      element.className = 'zodiac-sign';
      element.innerHTML = `<i>${data.icon}</i><span>${data.name}</span>`;
      element.addEventListener('click', () => {
        currentSign = sign;
        updateSelectedSign(sign);
        zodiacGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      zodiacGrid.appendChild(element);
    });
  }

  // Заполнение выпадающих списков для совместимости
  const fillSelect = (selectElement) => {
    if (!selectElement) return;
    
    selectElement.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Выберите знак';
    selectElement.appendChild(defaultOption);
    
    Object.keys(zodiacData).forEach(sign => {
      const option = document.createElement('option');
      option.value = sign;
      option.textContent = zodiacData[sign].name;
      selectElement.appendChild(option);
    });
  };

  fillSelect(document.getElementById('sign1'));
  fillSelect(document.getElementById('sign2'));

  // Обработчик кнопки проверки совместимости
  const checkCompatibilityBtn = document.getElementById('checkCompatibilityBtn');
  if (checkCompatibilityBtn) {
    checkCompatibilityBtn.addEventListener('click', () => {
      const sign1 = document.getElementById('sign1')?.value;
      const sign2 = document.getElementById('sign2')?.value;
      
      if (!sign1 || !sign2) {
        alert('Пожалуйста, выберите оба знака зодиака');
        return;
      }
      
      showCompatibilityResult(sign1, sign2);
    });
  }

  // Обработчик кнопки показа гороскопа
  const getHoroscopeBtn = document.getElementById('getHoroscopeBtn');
  if (getHoroscopeBtn) {
    getHoroscopeBtn.addEventListener('click', () => {
      if (!currentSign) {
        alert('Пожалуйста, выберите знак зодиака');
        return;
      }
      
      const activeTab = document.querySelector('.tab-btn.active');
      if (!activeTab) {
        alert('Пожалуйста, выберите период (день, неделя или месяц)');
        return;
      }
      
      const period = activeTab.dataset.period;
      showHoroscope(currentSign, period);
      
      // Явно обновляем подсветку знака при нажатии кнопки
      updateSelectedSign(currentSign);
    });
  }

  // Переключение вкладок
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        currentPeriod = this.dataset.period;
        tabButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Активация первой вкладки по умолчанию
    tabButtons[0].classList.add('active');
  }
});
