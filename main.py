class Calculatrice:
    def __init__(self, a, b):
        self.a = int(a)
        self.b = int(b)

    def add(self):
        #print("somme : ", self.a + self.b)
        return  self.a + self.b

    def sub(self):
        #print("sub : ", self.a - self.b)
        return self.a - self.b
        
    def div(self):
        if self.b == 0:
            return 0
        else :
            #print("div : ", self.a / self.b)
            return self.a / self.b
        
        
    def avg(self):
        #print("avg : ", (self.a + self.b)/2)
        return  (self.a + self.b)/2
        
    ##########################################""
    def test_addition(self):
        assert Calculatrice(self.a,self.b).add() == 3
        print("somme : ", self.a + self.b)
        
        return "--ok--"
    
    def test_soustraction(self):
        assert Calculatrice(self.a,self.b).sub() == 1
        print("soubstraction : ", self.a - self.b)
        
        return "--ok--"
        
    def test_div(self):
        assert Calculatrice(self.a,self.b).div() == 2
        print("Div : ", self.a / self.b)
        
        return "--ok--"
    
    def test_avg(self):
        assert Calculatrice(self.a,self.b).avg() == 2
        print("Moy : ", (self.a + self.b)/2)
        
        return "--ok--"
        


print(Calculatrice(1,2).test_addition())
print(Calculatrice(2,1).test_soustraction())
print(Calculatrice(2,2).test_avg())
print(Calculatrice(4,2).test_div())
