const request = require('supertest');
const fs = require('fs');
const app = require('./main.js');

beforeEach(() => {
  fs.writeFileSync('./users.json', '[]', 'utf8');
  fs.writeFileSync('./accounts.json', '[]', 'utf8');
});

test('POST /users/:id/accounts/debit should debit the account balance if the amount is less than or equal to the account balance', async () => {
  const user = { id: 1 };
  const account = { userId: 1, balance: 100 };
  fs.writeFileSync('./users.json', JSON.stringify([user]), 'utf8');
  fs.writeFileSync('./accounts.json', JSON.stringify([account]), 'utf8');

  const response = await request(app)
    .post('/users/1/accounts/debit')
    .send({ amount: 50 });

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toContain('Débit de 50 effectué');

  const updatedAccountData = fs.readFileSync('./accounts.json', 'utf8');
  const updatedAccounts = JSON.parse(updatedAccountData);
  const updatedAccount = updatedAccounts.find(a => a.userId === 1);
  expect(updatedAccount.balance).toBe(50);
});

test('POST /users/:id/accounts/debit should return an error if the user does not exist', async () => {
  const response = await request(app)
    .post('/users/1/accounts/debit')
    .send({ amount: 50 });

  expect(response.statusCode).toBe(404);
  expect(response.body.message).toContain("L'utilisateur 1 n'existe pas.");
});

test('POST /users/:id/accounts/debit should return an error if the account does not exist', async () => {
  const user = { id: 1 };
  fs.writeFileSync('./users.json', JSON.stringify([user]), 'utf8');

  const response = await request(app)
    .post('/users/1/accounts/debit')
    .send({ amount: 50 });

  expect(response.statusCode).toBe(404);
  expect(response.body.message).toContain("Aucun compte trouvé pour l'utilisateur 1.");
});

test('POST /users/:id/accounts/debit should return an error if the amount is greater than the account balance', async () => {
  const user = { id: 1 };
  const account = { userId: 1, balance: 100 };
  fs.writeFileSync('./users.json', JSON.stringify([user]), 'utf8');
  fs.writeFileSync('./accounts.json', JSON.stringify([account]), 'utf8');

  const response = await request(app)
    .post('/users/1/accounts/debit')
    .send({ amount: 150 });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toContain('Le montant demandé est supérieur au solde du compte.');
});

test('GET /users/:id/accounts should return the accounts of the user if the user exists', async () => {
  const user = { id: 1 };
  const account1 = { userId: 1, balance: 100 };
  const account2 = { userId: 1, balance: 200 };
  fs.writeFileSync('./users.json', JSON.stringify([user]), 'utf8');
  fs.writeFileSync('./accounts.json', JSON.stringify([account1, account2]), 'utf8');

  const response = await request(app).get('/users/1/accounts');

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveLength(2);
  expect(response.body[0].userId).toBe(1);
  expect(response.body[1].userId).toBe(1);
});

test('GET /users/:id/accounts should return an error if the user does not exist', async () => {
  const response = await request(app).get('/users/1/accounts');

  expect(response.statusCode).toBe(404);
  expect(response.body.message).toContain("L'utilisateur 1 n'existe pas.");
});
