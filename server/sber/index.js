const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

//обработчик для голосовых запросов от Sber
app.post('/get_horoscope', (req, res) => {
  const { sign, period } = req.body;
  
  //здесь можно добавить логику обработки, но для фронтенд-решения просто возвращаем успех
  res.json({
    status: 'success',
    message: 'Запрос обработан на клиенте'
  });
});

//заглушка для проверки работоспособности
app.get('/ping', (req, res) => {
  res.json({ status: 'ok', message: 'Сервер работает' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
