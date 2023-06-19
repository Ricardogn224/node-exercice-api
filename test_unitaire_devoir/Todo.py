import datetime
import sys
from user import User
from CheckEmail import CheckEmail
from unittest import mock
import time


class Todo:
    def __init__(self, titre, description, date):
        self.titre = titre
        self.description = description
        self.date = date


class TodoList:
    def __init__(self, user):
        self.user = user
        self.lists = {}

    def check_periode_creation(self, list_name, date):
        if list_name in self.lists and self.lists[list_name]:
            last_item = self.lists[list_name][-1]
            today = datetime.date.today()
            time_difference = (today - last_item.date).total_seconds() / 60
            if time_difference <= 30:
                print("You can't create a new item in this list. Wait for 30 minutes.")
                return False
        return True

    def check_number_items(self, list_name):
        if list_name in self.lists:
            if len(self.lists[list_name]) == 8:
                print("Print send email to user to warn him that he can't add just 2 items now")
                # Mock the CheckEmail.send_email function
                with mock.patch("CheckEmail.CheckEmail.send_email") as mock_send_email:
                   #send email to user with the mock function
                    mock_send_email(self.user.email, "You can't add just 2 items now")
                
                
                return False
            elif len(self.lists[list_name]) <= 10:
                return True
            
        else:
            return True

    def check_description_length(self, description):
        if len(description) <= 1000:
            return True
        else:
            print("Description is too long")
            return False

    def add(self, list_name, titre, description, date):
        if self.user.is_valid():
            print('------------------------')
            print("User email:", self.user.email)
            print("User is valid?", self.user.is_valid())
            if (
                self.check_description_length(description)
                and self.check_number_items(list_name)
                and self.check_periode_creation(list_name, date)
            ):
                todo_item = Todo(titre, description, date)
                if list_name not in self.lists:
                    self.lists[list_name] = []
                self.lists[list_name].append(todo_item)
                print("Item added successfully")
                return self.lists
            else:
                print("Invalid item")
                print("Item not added")
                return False
        else:
            return False

    def delete(self, list_name, titre):
        if list_name in self.lists:
            for item in self.lists[list_name]:
                if item.titre == titre:
                    self.lists[list_name].remove(item)
                    return self.lists
        return self.lists

    def update(self, list_name, titre, description, date):
        if list_name in self.lists:
            for item in self.lists[list_name]:
                if item.titre == titre:
                    item.description = description
                    item.date = date
                    return self.lists
        return self.lists

    def show(self, list_name, titre):
        if list_name in self.lists:
            for item in self.lists[list_name]:
                if item.titre == titre:
                    return item



   