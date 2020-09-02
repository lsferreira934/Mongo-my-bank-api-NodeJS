import expres from 'express';
import { accountRouter } from './route/accountRouter.js';
import mongoose from 'mongoose';

const app = expres();

async function conectMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Banco de dados: Conectado!`);
  } catch (err) {
    console.log(`Banco de dados: Não conectado!
                ${err}`);
  }
}

conectMongo();

app.use(expres.json());
app.use(accountRouter);

app.listen(process.env.PORT_LOCAL, async () => {
  try {
    console.log('API Iniciada');
  } catch (err) {
    throw new Error('Não foi possivel iniciar a API' + err);
  }
});
