import datetime
import unittest
from user import User
from Todo import TodoList, Todo
from unittest import mock
from CheckEmail import CheckEmail


class TodoListTestCase(unittest.TestCase):
    def setUp(self):
        # Create a sample user
        self.user = User("abrahamricardogn224@gmail.com", "Abraham", "Ricardo", datetime.date(1972, 12, 12), "123456")

        # Create a TodoList instance
        self.todo_list = TodoList(self.user)

    def test_add_item(self):
        # Add an item to the list
        self.assertTrue(
            self.todo_list.add(
                "shopping",
                "Buy groceries",
                "Buy fruits, vegetables, and milk.",
                datetime.date.today(),
            )
        )

        # Check if the item is added to the list
        self.assertEqual(len(self.todo_list.lists["shopping"]), 1)

    def test_delete_item(self):
        # Add an item to the list
        self.todo_list.add(
            "shopping",
            "Buy groceries",
            "Buy fruits, vegetables, and milk.",
            datetime.date.today(),
        )

        # Delete the item from the list
        self.assertTrue(self.todo_list.delete("shopping", "Buy groceries"))

        # Check if the item is removed from the list
        self.assertEqual(len(self.todo_list.lists["shopping"]), 0)

    def test_update_item(self):
        # Add an item to the list
        self.todo_list.add(
            "shopping",
            "Buy groceries",
            "Buy fruits, vegetables, and milk.",
            datetime.date.today(),
        )

        # Update the item in the list
        self.assertTrue(
            self.todo_list.update(
                "shopping",
                "Buy groceries",
                "Buy fruits, vegetables, milk, and bread.",
                datetime.date.today(),
            )
        )

        # Check if the item is updated
        updated_item = self.todo_list.show("shopping", "Buy groceries")
        self.assertEqual(updated_item.description, "Buy fruits, vegetables, milk, and bread.")

    def test_show_item(self):
        # Add an item to the list
        self.todo_list.add(
            "shopping",
            "Buy groceries",
            "Buy fruits, vegetables, and milk.",
            datetime.date.today(),
        )

        # Retrieve the item from the list
        item = self.todo_list.show("shopping", "Buy groceries")

        # Check if the correct item is returned
        self.assertEqual(item.titre, "Buy groceries")
        self.assertEqual(item.description, "Buy fruits, vegetables, and milk.")

    def test_check_periode_creation(self):
        # Add an item to the list
        self.todo_list.add(
            "shopping",
            "Buy groceries",
            "Buy fruits, vegetables, and milk.",
            datetime.date.today() - datetime.timedelta(minutes=20),
        )

        # Try adding another item within 30 minutes
        self.assertFalse(
            self.todo_list.add(
                "shopping",
                "Buy clothes",
                "Get a new pair of shoes.",
                datetime.date.today() - datetime.timedelta(minutes=10),
            )
        )

        # Try adding another item after 30 minutes
        self.assertFalse(
            self.todo_list.add(
                "shopping",
                "Buy shoes",
                "Get a new pair of shoes.",
                datetime.date.today() - datetime.timedelta(minutes=40),
            )
        )

    def test_check_number_items(self):
        # Add 10 items to the list
        for i in range(10):
            self.todo_list.add(
                "shopping",
                f"Item {i+1}",
                f"Description for item {i+1}",
                datetime.date.today() - datetime.timedelta(minutes=40),
            )

          

            # Try adding the 9th item
            self.assertFalse(
                self.todo_list.add(
                    "shopping",
                    "Item 9",
                    "Description for item 9",
                    datetime.date.today() - datetime.timedelta(minutes=40),
                )
            )

            self.assertFalse(
                self.todo_list.add(
                    "shopping",
                    "Item 10",
                    "Description for item 10",
                    datetime.date.today() - datetime.timedelta(minutes=40),
                )
            )

    def test_check_description_length(self):
        # Try adding an item with a description less than or equal to 1000 characters
        self.assertTrue(
            self.todo_list.add(
                "shopping",
                "Buy groceries",
                "Buy fruits, vegetables, and milk.",
                datetime.date.today() - datetime.timedelta(minutes=40),
            )
        )

        # Try adding an item with a description longer than 1000 characters
        long_description = "a" * 1001
        self.assertFalse(
            self.todo_list.add(
                "shopping",
                "Buy clothes",
                long_description,
                datetime.date.today() - datetime.timedelta(minutes=30),
            )
        )


if __name__ == "__main__":
    unittest.main()
