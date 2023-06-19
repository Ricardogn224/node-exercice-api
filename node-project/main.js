const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const usersFilePath = './users.json';
const accountsFilePath = './accounts.json';

let users = [];
let accounts = [];

// Load users and accounts data from JSON files
function loadUserData() {
  try {
    const usersData = fs.readFileSync(usersFilePath, 'utf8');
    users = JSON.parse(usersData);
  } catch (error) {
    // If the file doesn't exist, create an empty array
    users = [];
    saveUserData(); // Save empty user data to JSON file
  }
}

function loadAccountData() {
  try {
    const accountsData = fs.readFileSync(accountsFilePath, 'utf8');
    accounts = JSON.parse(accountsData);
  } catch (error) {
    // If the file doesn't exist, create an empty array
    accounts = [];
    saveAccountData(); // Save empty account data to JSON file
  }
}

// Save users and accounts data to JSON files
function saveUserData() {
  const usersData = JSON.stringify(users, null, 2);
  fs.writeFileSync(usersFilePath, usersData, 'utf8');
}

function saveAccountData() {
  const accountsData = JSON.stringify(accounts, null, 2);
  fs.writeFileSync(accountsFilePath, accountsData, 'utf8');
}

// Load initial user and account data
loadUserData();
loadAccountData();

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
    saveAccountData(); // Save updated account data to JSON file
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

  // Verifier que le montant à créditer est inférieur ou égal à 1000
  if (amount <= 1000) {
    // Ajouter le montant au solde du compte
    account.balance += amount;
    saveAccountData(); // Save updated account data to JSON file
    return res.json({ message: `Crédit de ${amount} effectué pour l'utilisateur ${userId}. Le solde est maintenant de ${account.balance}.` });
  } else {
    // Créditer le compte avec une partie du montant pour ne pas dépasser 1000
    account.balance += 1000 - account.balance;
    saveAccountData(); // Save updated account data to JSON file
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
