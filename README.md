# my-bank-api
API desenvolvida para teste no NodeJS+ Mongoose
![foto 2](https://user-images.githubusercontent.com/56802012/92013938-d7011780-ed24-11ea-9a5d-7c256f9c9b18.jpg)

# Por quê?
API feita para estudo usando arquivos "accounts.json", realizando manipulações CRUD. Projeto criado para aplicação de conhecimento em Javascript.

# Como utilizar?
É necessário criar um banco de dados mongoDB Atlas e importar o arquivo "accounts.json",  no arquivo "sample-env" é adicionando seu usuário e senha do banco de dados junto com a porta de comunicação.

# Desafio
(✔) Criar um banco de dados no MongoDB Atlas, uma coleção e importar os dados
arquivo “accounts.json” em sua coleção.

(✔) Implementar um modelo (schema) para esta coleção, considerando que todos os
campos são requeridos e o campo balance não pode ser menor que 0. 

(✔) Criar o projeto my-bank-api para implementação dos endpoints.

(✔) Crie um endpoint para registrar um depósito em uma conta. Este endpoint deverá
receber como parâmetros a “agencia”, o número da “conta” e o valor do depósito.
Ele deverá atualizar o “balance” da conta, incrementando-o com o valor recebido
como parâmetro. O endpoint deverá validar se a conta informada existe, caso não
exista deverá retornar um erro, caso exista retornar o saldo atual da conta.

(✔) Crie um endpoint para registrar um saque em uma conta. Este endpoint deverá
receber como parâmetros a “agência”, o número da “conta” e o valor do saque. Ele
deverá atualizar o “balance” da conta, decrementando-o com o valor recebido com
parâmetro e cobrando uma tarifa de saque de (1). O endpoint deverá validar se a
conta informada existe, caso não exista deverá retornar um erro, caso exista retornar
o saldo atual da conta. Também deverá validar se a conta possui saldo suficiente
para aquele saque, se não tiver deverá retornar um erro, não permitindo assim que
o saque fique negativo.

(✔ )Crie um endpoint para consultar o saldo da conta. Este endpoint deverá receber
como parâmetro a “agência” e o número da “conta”, e deverá retornar seu “balance”.
Caso a conta informada não exista, retornar um erro.

(✔) Crie um endpoint para excluir uma conta. Este endpoint deverá receber como
parâmetro a “agência” e o número da “conta” da conta e retornar o número de contas
ativas para esta agência.

(✔) Crie um endpoint para realizar transferências entre contas. Este endpoint deverá
receber como parâmetro o número da “conta” origem, o número da “conta” destino e
o valor de transferência. Este endpoint deve validar se as contas são da mesma
agência para realizar a transferência, caso seja de agências distintas o valor de tarifa
de transferencia (8) deve ser debitado na “conta” origem. O endpoint deverá retornar
o saldo da conta origem.

(✔) Crie um endpoint para consultar a média do saldo dos clientes de determinada
agência. O endpoint deverá receber como parametro a “agência” e deverá retornar
o balance médio da conta.

(✔) Crie um endpoint para consultar os clientes com o menor saldo em conta. O endpoint
devera receber como parâmetro um valor numérico para determinar a quantidade de
clientes a serem listados, e o endpoint deverá retornar em ordem crescente pelo
saldo a lista dos clientes (agência, conta, saldo).

(✔ )Crie um endpoint para consultar os clientes mais ricos do banco. O endpoint deverá
receber como parâmetro um valor numérico para determinar a quantidade de clientes
a serem listados, e o endpoint deverá retornar em ordem decrescente pelo saldo,
crescente pelo nome, a lista dos clientes (agência, conta, nome e saldo).

(✔) Crie um endpoint que irá transferir o cliente com maior saldo em conta de cada
agência para a agência private agencia=99. O endpoint deverá retornar a lista dos
clientes da agencia private.


#### Postman
![foto 1](https://user-images.githubusercontent.com/56802012/92013585-60641a00-ed24-11ea-86fa-3342e00fda0f.jpg)



