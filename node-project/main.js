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
  const userId = req.params.id;
  const { amount } = req.body;

  // verifier que l'utilisateur existe
  const user = users.find((u) => u.id === userId);
  userName = 'Adrien';
  if (!user) {
    // verifier que le compte existe
    const account = accounts.find((a) => a.userId === userId);
    if (!account) {
      // verifer que le montant que l'on veut débiter est inférieur au solde du compte
      if (amount <= account.balance) {
        //on retire le montant du solde du compte
        account.balance -= amount;
        res.json({ message: `Débit de ${amount} effectué pour l'utilisateur ${userId}. le solde est ${account.balance}` });


      } else {
        res.status(400).json({ message: `Le montant demandé est supérieur au solde du compte.` });
      }
    }
  }
  res.status(400).json({ message: `L'utilisateur ${userId} n'existe pas.` });
  
});

// Route : /users/:id/accounts/credit
app.post('/users/:id/accounts/credit', (req, res) => {
  const userId = req.params.id;
  const { amount } = req.body;

  // verifier que l'utilisateur existe
  const user = users.find((u) => u.id === userId);
  if (!user) {
    // verifier que le compte existe
    const account = accounts.find((a) => a.userId === userId);
    if (!account) {
      // on verifier que le montant est inférieur ou égal à 1000
      if (amount <= 1000) {
      // on ajoute le montant au solde du compte
      account.balance += amount;

      } else {
        //on crédite le compte avec une partie du montant pour ne pas dépasser 1000
        account.balance += 1000 - account.balance;
        //on retourne un message d'erreur et le nombre de crédit effectué et le nomntant restant
        res.status(400).json({ message: `Le montant demandé est supérieur à 1000. Seul ${1000 - account.balance} a été crédité.` });
        
      }
      
      res.json({ message: `Crédit de ${amount} effectué pour l'utilisateur ${userId}.` });
    }else{
      res.status(400).json({ message: `L'utilisateur ${userId} n'existe pas.` });
    }
  }
  res.status(400).json({ message: `L'utilisateur ${userId} n'existe pas.` });
});