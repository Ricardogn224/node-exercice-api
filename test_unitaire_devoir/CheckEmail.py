import re

class CheckEmail:
    def __init__(self, email):
        self.email = email
        self.send_email(email, "You can't add just 2 items now")

    def is_valid(self):
        if re.match(r"[^@]+@[^@]+\.[^@]+", self.email):
            return True
        else:
            return False

    def send_email(self, email, message):
        print(f"Sending email to {email}, with message: {message}")

