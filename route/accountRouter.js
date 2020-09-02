import express from 'express';
import { accountModel } from '../models/accountModel.js'; // importação do modelo schema
import cors from 'cors';
const app = express();

app.set('view engine', 'pug');

app.use((req, res, next) => {
  res.header('acess-Control-Allow-Origin', '*');
  app.use(cors());
  next();
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: _dirname });
});

//------------------------------------------------------------------------------
//
app.get('/allacc', async (req, res) => {
  try {
    const account = await accountModel.find();
    res.send(account);
  } catch (err) {
    res.status(500).send(` ${err}`);
  }
});

//------------------------------------------------------------------------------
// 4 ok
app.put('/deposito/:ag/:cc/:vl', async (req, res) => {
  try {
    const ag = req.params.ag;
    const cc = req.params.cc;
    const vl = req.params.vl;
    let account = await accountModel.findOne({
      agencia: ag,
      conta: cc,
    });

    accountVerification(account);

    account = await accountModel.findOneAndUpdate(
      {
        agencia: ag,
        conta: cc,
      },
      { $inc: { balance: vl } },
      {
        new: true,
      }
    );
    res.send({
      agencia: account.agencia,
      conta: account.conta,
      name: account.name,
      balance: account.balance,
    });
  } catch (err) {
    res.status(500).send(` ${err}`);
  }
});
//------------------------------------------------------------------------------
// 5 ok
app.put('/saque/:ag/:cc/:vl', async (req, res) => {
  try {
    const ag = req.params.ag;
    const cc = req.params.cc;
    const vl = req.params.vl;
    let account = await accountModel.findOne({
      agencia: ag,
      conta: cc,
    });

    accountVerification(account);

    const cashWithdrawal = account.balance - vl - 1;
    const converter = cashWithdrawal.toString();
    const signRemove =
      cashWithdrawal < 0
        ? converter.replace('-', '')
        : converter.replace('+', '');

    const sign = cashWithdrawal < 0 ? '-' : '+';
    if (cashWithdrawal < 0) {
      throw new Error(
        `SALDO INSUFICIENTE PARA SAQUE! 
         SALDO: R$${account.balance}
         SAQUE: -R$${vl}
         TARIFA: -R$ 1
         TOTAL: ${sign}R$${signRemove}`
      );
    }
    account = await accountModel.findOneAndUpdate(
      {
        agencia: ag,
        conta: cc,
      },
      { $set: { balance: cashWithdrawal } },
      {
        new: true,
      }
    );
    res.send({
      agencia: account.agencia,
      conta: account.conta,
      name: account.name,
      balance: account.balance,
    });
  } catch (err) {
    res.status(500).send(` ${err}`);
  }
});

//------------------------------------------------------------------------------
// 6 ok
app.get('/saldo/:ag/:cc', async (req, res) => {
  try {
    const ag = req.params.ag;
    const cc = req.params.cc;
    const account = await accountModel.findOne({
      agencia: ag,
      conta: cc,
    });

    accountVerification(account);

    res.send({
      agencia: account.agencia,
      conta: account.conta,
      name: account.name,
      balance: account.balance,
    });
  } catch (err) {
    res.status(500).send(` ${err}`);
  }
});

//------------------------------------------------------------------------------
// 7
app.delete('/delete/:ag/:cc', async (req, res) => {
  try {
    const ag = req.params.ag;
    const cc = req.params.cc;
    const account = await accountModel.findOne({
      agencia: ag,
      conta: cc,
    });

    accountVerification(account);

    const accountDelete = await accountModel.findOneAndDelete({
      agencia: ag,
      conta: cc,
    });

    let accountCount = await accountModel.countDocuments({ agencia: ag });

    res.send({ contas_ativas: accountCount });
  } catch (err) {
    res.status(500).send(` ${err}`);
  }
});

//------------------------------------------------------------------------------
// 8 ok
app.put('/transferencia/:cco/:ccd/:vl', async (req, res) => {
  try {
    const cco = req.params.cco;
    const ccd = req.params.ccd;
    const vl = req.params.vl;
    let rate = 0;
    const sourceAccount = await accountModel.findOne({
      conta: cco,
    });
    const targetAccount = await accountModel.findOne({
      conta: ccd,
    });

    accountVerification(sourceAccount);
    accountVerification(targetAccount);

    sourceAccount.agencia === targetAccount.agencia ? (rate = 0) : (rate = 8);

    const converter = sourceAccount.balance.toString();
    const signRemove =
      sourceAccount.balance < 0
        ? converter.replace('-', '')
        : converter.replace('+', '');

    const sign = sourceAccount.balance < 0 ? '-' : '+';
    if (sourceAccount.balance < 0) {
      throw new Error(
        `SALDO INSUFICIENTE PARA TRANSFERÊNCIA!
         SALDO: R$${sourceAccount.balance}
         VALOR TRANSF: -R$${vl}
         TARIFA: -R$ ${rate}
         TOTAL: ${sign}R$${signRemove}`
      );
    }

    const cashWithdrawal =
      Number(sourceAccount.balance) - Number(vl) - Number(rate);
    const moneyDeposit = Number(targetAccount.balance) + Number(vl);

    const sourceAccountFinal = await accountModel.findOneAndUpdate(
      {
        conta: cco,
      },
      { $set: { balance: cashWithdrawal } },
      {
        new: true,
      }
    );
    const targetAccountFinal = await accountModel.findOneAndUpdate(
      {
        conta: ccd,
      },
      { $set: { balance: moneyDeposit } }
    );

    res.send({
      agencia: sourceAccountFinal.agencia,
      conta: sourceAccountFinal.conta,
      name: sourceAccountFinal.name,
      balance: sourceAccountFinal.balance,
    });
  } catch (err) {
    res.status(500).send(` ${err}`);
  }
});
//------------------------------------------------------------------------------
// 9 ok
app.get('/media/:ag', async (req, res) => {
  try {
    const ag = Number(req.params.ag);
    const account = await accountModel.find({
      agencia: ag,
    });

    if (!account) {
      throw new Error('AGÊNCIA INVÁLIDA!');
    }

    const accounAverege = await accountModel.aggregate([
      {
        $match: { agencia: ag },
      },
      { $group: { _id: null, media: { $avg: '$balance' } } },
    ]);

    res.send(accounAverege);
  } catch (err) {
    res.status(500).send(` ${err}`);
  }
});
//------------------------------------------------------------------------------
// 10
app.get('/clientemenor/:qt', async (req, res) => {
  try {
    const qt = Number(req.params.qt);
    const account = await accountModel
      .find({}, { _id: 0, agencia: 1, conta: 1, balance: 1 })
      .sort({ balance: 1 })
      .limit(qt);

    res.send(account);
  } catch (err) {
    res.status(500).send(` ${err}`);
  }
});
//------------------------------------------------------------------------------
// 11 ok
app.get('/clientemaior/:qt', async (req, res) => {
  try {
    const qt = Number(req.params.qt);
    const account = await accountModel
      .find({}, { _id: 0, agencia: 1, conta: 1, balance: 1 })
      .sort({ balance: -1, name: 1 })
      .limit(qt);

    res.send(account);
  } catch (err) {
    res.status(500).send(` ${err}`);
  }
});

//------------------------------------------------------------------------------
// 11 ok
app.get('/clientemaior/:qt', async (req, res) => {
  try {
    const qt = Number(req.params.qt);
    const account = await accountModel
      .find({}, { _id: 0, agencia: 1, conta: 1, balance: 1 })
      .sort({ balance: -1, name: 1 })
      .limit(qt);

    res.send(account);
  } catch (err) {
    res.status(500).send(` ${err}`);
  }
});
//------------------------------------------------------------------------------
// 12 ok
app.get('/private', async (req, res) => {
  try {
    const accounts = await accountModel.find();
    const agencies = await accountModel.distinct('agencia');
    let biggestList = [];

    agencies.forEach((agency) => {
      let biggestBalances = 0;
      let biggest = [];
      accounts.forEach((account) => {
        if (account.balance > biggestBalances && account.agencia === agency) {
          biggestBalances = account.balance;
          biggest = account;
        }
      });
      biggestList.push(biggest);
    });

    biggestList.forEach(async (item) => {
      await accountModel.findOneAndUpdate(
        { _id: item._id },
        { agencia: 99 },
        { new: true }
      );
    });
    const privateAgency = await accountModel.find({ agencia: 99 });
    res.send(privateAgency);
  } catch (err) {
    res.status(500).send(` ${err}`);
  }
});

function accountVerification(account) {
  if (!account) {
    throw new Error('CONTA E OU AGÊNCIA INVÁLIDO!');
  }
}

export { app as accountRouter };
