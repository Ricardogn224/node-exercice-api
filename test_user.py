from test_unitaire_devoir.user import User
import datetime


# Test the is_valid method
user1 = User("abrahamricardogn224@gmail.com", "Abraham", "Ricardo", datetime.date(1972, 12, 12), "123456")
assert user1.is_valid() == True

user2 = User("abrahamricardogn224@gmail.com", "Adam", "Smith", datetime.date(2013, 12, 12), "123456")
assert user2.is_valid() == False

user3 = User("abrahamricardogn224@gmail.com", "John123", "Doe", datetime.date(2005, 1, 1),"123456")
assert user3.is_valid() == True

user4 = User("abrahamricardogn224@gmail.com", "Jane", "Doe", datetime.date(2003, 8, 15),"123456")
assert user4.is_valid() == True

user4 = User("abrahamricardogn224@gmail.com", "", "", datetime.date(2003, 8, 15),"123456")
assert user4.is_valid() == False

print("All assertions passed!")
