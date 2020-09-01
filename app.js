import expres from 'express';
import { accountRouter } from './route/accountRouter.js';
import mongoose from 'mongoose';

require('dotenv').config();

async function conectMongo() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}
        @cluster0.m3izc.mongodb.net/bank?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`Banco de dados: Conectado!`);
  } catch (err) {
    console.log(`Banco de dados: Não conectado!
                ${err}`);
  }
}

conectMongo();

const app = expres();
app.use(expres.json());
app.use(accountRouter);

app.listen(process.env.PORT, async () => {
  try {
    console.log('API Iniciada');
  } catch (err) {
    throw new Error('Não foi possivel iniciar a API' + err);
  }
});
