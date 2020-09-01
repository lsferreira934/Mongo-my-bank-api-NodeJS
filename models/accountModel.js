import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);
//Criação do modelo
const accountSchema = mongoose.Schema({
  agencia: {
    type: Number,
    require: true,
  },
  conta: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
    uppercase: true,
  },
  balance: {
    type: Number,
    require: true,
    min: 0,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});
//Definido o Modelo da coleção - precisa ser duplicado a coleção para não receber o "s"
const accountModel = mongoose.model('accounts', accountSchema, 'accounts');

export { accountModel };
