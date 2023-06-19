import re
import time
import datetime
import sys



class User :
    def __init__(self, email, nom, prenom, date,password):
        self.email = email
        self.nom = nom
        self.prenom = prenom
        self.date = date
        self.password = password

        
    # on crée une fonction is valid qui va nous permettre de vérifier si l'age est valide et leamil est renseignée au bon format avec une expression régulière en calculant l'age
    # Define a mock function to validate email
    def mock_email_validation(self, email):
        if email == "abrahamricardogn224@gmail.com":
            return True
        else:
            return False
    
    def is_valid(self):
        today = datetime.date.today()-datetime.timedelta(days=1)
        age = today.year - self.date.year - ((today.month, today.day) < (self.date.month, self.date.day))
        #message de succes
        """ print('-------------------------------------')
        print('l email est :' , self.email)
        print('le nom est :' , self.nom)
        print('le prenom est :' , self.prenom)
        print('la date est :' , self.date)
        print('l age est :' , age)
        print('la date du jour est :' , today)
        print('-------------------------------------') """
        
        if age > 13  and  self.mock_email_validation(self.email) and re.match(r"[a-zA-Z]+", self.nom) and re.match(r"[a-zA-Z]+", self.prenom):
            return True
        else:
            return False


""" # On teste notre fonction is_valid
user1 = User("abrahamricardogn224@gmail.com", "Abraham", "Ricardo", datetime.date(1972, 12, 12 ),"123456")
print(user1.is_valid()) """