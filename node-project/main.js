const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//liste des utilisateurs
const users = [
  { id: 1, name: 'John Doe', accounts: [1, 2] },
];

//liste des comptes
const accounts = [
  { id: 1, userId: 1, balance: 100 },
  { id: 2, userId: 1, balance: 200 },
];

// Route : /users/:id/accounts/debit
app.post('/users/:id/accounts/debit', (req, res) => {
  const userId = parseInt(req.params.id);
  const amount = parseInt(req.body.amount);

  // Verifier que l'utilisateur existe
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: `L'utilisateur ${userId} n'existe pas.` });
  }

  // Verifier que le compte existe
  const account = accounts.find((a) => a.userId === userId);
  if (!account) {
    return res.status(404).json({ message: `Aucun compte trouvé pour l'utilisateur ${userId}.` });
  }

  // Verifier que le montant à débiter est inférieur ou égal au solde du compte
  if (amount <= account.balance) {
    // Retirer le montant du solde du compte
    account.balance -= amount;
    return res.json({ message: `Débit de ${amount} effectué pour l'utilisateur ${userId}. Le solde est maintenant de ${account.balance}.` });
  } else {
    return res.status(400).json({ message: `Le montant demandé est supérieur au solde du compte.` });
  }
});

// Route : /users/:id/accounts/credit
app.post('/users/:id/accounts/credit', (req, res) => {
  const userId = parseInt(req.params.id);
  const amount = parseInt(req.body.amount);

  // Verifier que l'utilisateur existe
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: `L'utilisateur ${userId} n'existe pas.` });
  }

  // Verifier que le compte existe
  const account = accounts.find((a) => a.userId === userId);
  if (!account) {
    return res.status(404).json({ message: `Aucun compte trouvé pour l'utilisateur ${userId}.` });
  }
  console.log(account.amount);
  // Verifier que le montant à créditer est inférieur ou égal à 1000
  if (amount <= 1000) {
    // Ajouter le montant au solde du compte
    account.balance += amount;
    
    return res.json({ message: `Crédit de ${amount} effectué pour l'utilisateur ${userId}.` });
  } else {
    // Créditer le compte avec une partie du montant pour ne pas dépasser 1000
    account.balance += 1000 - account.balance;
    // Retourner un message d'erreur et le montant crédité et le montant restant
    return res.status(400).json({ message: `Le montant demandé est supérieur à 1000. Seul ${1000 - account.balance} a été crédité.` });
  }
});

// /users/:id/accounts
app.get('/users/:id/accounts', (req, res) => {
  const userId = parseInt(req.params.id);

  // Verifier que l'utilisateur existe
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: `L'utilisateur ${userId} n'existe pas.` });
  }

  // Filtrer les comptes de l'utilisateur
  const accountsUser = accounts.filter((a) => a.userId === userId);
  res.json(accountsUser);
});

app.listen(3000, () => {
  console.log('Server started');
});
