const express = require('express');
const { createSberServer } = require('@salutejs/server');

const app = express();

//импорт данных гороскопа из фронтенда
const zodiacData = {
  // Вставьте сюда содержимое объекта zodiacData из docs/js/app.js
};

function generateHoroscope(sign, period = 'daily') {
  if (!zodiacData[sign]) return "Извините, не могу найти гороскоп для этого знака";
  
  return {
    prediction: zodiacData[sign][period],
    mood: ["Отличное", "Хорошее", "Нейтральное", "Волнующее"][Math.floor(Math.random() * 4)],
    luckyNumber: Math.floor(Math.random() * 9) + 1,
    luckyTime: ["утро", "день", "вечер", "ночь"][Math.floor(Math.random() * 4)]
  };
}

//интеграция с Sber
const sberApp = createSberServer({
  scenarioPath: './server/sber/scenario.json'
});

sberApp.intent('get_horoscope', ({ req, res }) => {
  const sign = req.slots.sign.value;
  const period = req.slots.period?.value || 'daily';
  const horoscope = generateHoroscope(sign, period);
  
  res.json({
    status: 'success',
    ...horoscope
  });
});

app.use('/sber', sberApp.getRouter());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
