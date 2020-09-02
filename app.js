import expres from 'express';
import { accountRouter } from './route/accountRouter.js';
import mongoose from 'mongoose';

async function conectMongo() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_MONGO}:${process.env.PWD_MONGO}@cluster0.m3izc.mongodb.net/${process.env.DB_MONGO}?retryWrites=true&w=majority`,
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

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    console.log(`API Iniciada na Porta: ${PORT}`);
  } catch (err) {
    throw new Error('Não foi possivel iniciar a API' + err);
  }
});
