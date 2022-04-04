const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/calculator', (req, res) => {
  const { num1, num2, operation } = req.query;

  if(num1 && num2 && operation) {
    const result = eval(`${num1} ${operation} ${num2}`);

    res.send(`${num1} ${operation} ${num2} = ${result.toString()}`);
  }

  res.send('Se necesitan dos números para realizar la operación y indicar el tipo de operacion a realizar');
});
app.get('/process-text', (req, res) => {
  const { text, process } = req.query;

  if(text && process) {
    if(process === 'separate') {
      const { separator } = req.query;
      separator == null && res.send('Falta indicar el separador');

      res.send(`El texto separado es: ${text.split(separator)}`);
    } else if(process === 'get') {
      const { get_string } = req.query;
      get_string == null && res.send('Falta indicar el string a obtener');

      const index = text.indexOf(get_string);

      if(index > 0) {
        const data = text.substring(index, (index + get_string.length));
        console.log(data);

        res.send(`${data}`);
      }
      res.send('El string no se encuentra en el texto');
    }
  }

  res.send('Se necesita un texto e indicar el proceso para realizar la operación');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
