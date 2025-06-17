const express = require('express');
const { createSberServer } = require('@salutejs/server');

const app = express();
app.use(express.static('public'));

//Интеграция с Sber
const sberApp = createSberServer({
  scenarioPath: './server/sber/scenario.json'
});

sberApp.intent('get_horoscope', ({ req, res }) => {
  const sign = req.query.sign || 'Овен';
  const prediction = generateHoroscope(sign); //функция генерации
  res.json({ prediction });
});

app.use('/sber', sberApp.getRouter());

function generateHoroscope(sign) {
  //Реализация аналогичная фронтенду
}

app.listen(3000, () => console.log('Server started on port 3000'));
