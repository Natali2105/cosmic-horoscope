const express = require('express');
const cors = require('cors');
const { createSberServer } = require('@salutejs/server');

const app = express();
app.use(cors());
app.use(express.json());

//данные гороскопа
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

//инициализация Sber-сервера
const sberApp = createSberServer({
  scenarioPath: './scenario.json'
});

//обработчик для получения гороскопа
sberApp.intent('get_horoscope', ({ req, res }) => {
  try {
    if (!req.slots.sign || !req.slots.sign.value) {
      return res.status(400).json({
        status: 'error',
        message: "Не указан знак зодиака"
      });
    }

    const sign = req.slots.sign.value.toLowerCase();
    const period = req.slots.period?.value || 'daily';
    
    const periodMap = {
      'сегодня': 'daily',
      'на день': 'daily',
      'день': 'daily',
      'на неделю': 'weekly',
      'неделю': 'weekly',
      'неделя': 'weekly',
      'на месяц': 'monthly',
      'месяц': 'monthly',
      'месяца': 'monthly'
    };
    
    const englishPeriod = periodMap[period] || 'daily';
    
    if (!zodiacData[sign]) {
      return res.status(404).json({
        status: 'error',
        message: "Извините, не могу найти гороскоп для этого знака"
      });
    }
    
    if (!zodiacData[sign][englishPeriod]) {
      return res.status(404).json({
        status: 'error',
        message: "Извините, не могу найти гороскоп для указанного периода"
      });
    }
    
    const horoscope = {
      status: 'success',
      sign: zodiacData[sign].name,
      period: period,
      prediction: zodiacData[sign][englishPeriod],
      mood: ["Отличное", "Хорошее", "Нейтральное", "Волнующее"][Math.floor(Math.random() * 4)],
      luckyNumber: Math.floor(Math.random() * 9) + 1,
      luckyTime: ["утро", "день", "вечер", "ночь"][Math.floor(Math.random() * 4)]
    };
    
    res.json(horoscope);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

//обработчик для проверки совместимости
sberApp.intent('check_compatibility', ({ req, res }) => {
  try {
    if (!req.slots.sign1 || !req.slots.sign1.value || !req.slots.sign2 || !req.slots.sign2.value) {
      return res.status(400).json({
        status: 'error',
        message: "Не указаны оба знака зодиака"
      });
    }

    const sign1 = req.slots.sign1.value.toLowerCase();
    const sign2 = req.slots.sign2.value.toLowerCase();
    
    if (!zodiacData[sign1] || !zodiacData[sign2]) {
      return res.status(404).json({
        status: 'error',
        message: "Извините, не могу найти один из знаков зодиака"
      });
    }
    
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
    
    res.json({
      status: 'success',
      sign1: zodiacData[sign1].name,
      sign2: zodiacData[sign2].name,
      compatibility: compatibility,
      message: message
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

//запуск голосового сеанса
app.post('/sber/start_voice', (req, res) => {
  try {
    const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    res.json({
      status: 'listening',
      sessionId: sessionId
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

//проверка статуса голосового сеанса
app.get('/sber/check_response/:sessionId', (req, res) => {
  try {
    setTimeout(() => {
      res.json({
        status: 'completed',
        response: {
          intent: 'get_horoscope',
          slots: {
            sign: 'aries',
            period: 'daily'
          }
        }
      });
    }, 3000);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

app.use('/sber', sberApp.getRouter());

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
