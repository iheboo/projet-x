from bank_account import BankAccount

class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.account = BankAccount(int_rate=0.02, balance=0)
        self.saving_account = BankAccount(int_rate=0.01, balance=800)
    
    # other methods
    
    def make_deposit(self, amount, acc = "main"):
        if acc == "main":
            self.account.deposit(amount)
            print(f"{self.name} added ${amount} to his account. Now his account balance is ${self.account.balance}")
        elif acc == "saving":
            self.saving_account.deposit(amount)
            print(f"{self.name} added ${amount} to his 'saving' account. Now his 'saving' account balance is ${self.saving_account.balance}")
        else: print("Account type not existant")
        return self

    def make_withdrawal(self, amount, acc = "main"):
        if acc == "main":
            self.account.withdraw(amount)
            print(f"{self.name} withdraw ${amount} from his account. Now his account balance is ${self.account.balance}")
        elif acc == "saving":
            self.saving_account.withdraw(amount)
            print(f"{self.name} withdraw ${amount} from his 'saving' account. Now his 'saving' account balance is ${self.saving_account.balance}")
        else: print("Account type not existant")
        return self
    
    def display_user_balance(self, acc="main"):
        if acc == "main":
            print(f"{self.name} account balance: ${self.account.balance}")
        elif acc == "saving":
            print(f"{self.name} 'saving' account balance: ${self.saving_account.balance}")
        else: print("Account type not existant")
        return self


user1 = User("John", "j@d.com")
user1.make_deposit(500, "hi")
user1.display_user_balance("saving")