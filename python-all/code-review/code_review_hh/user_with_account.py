from bank_account import BankAccount

class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        # self.accounts = [BankAccount(int_rate=0.02, balance=0)]
        self.account = BankAccount(int_rate=0.02, balance=0)
        self.saving_account = BankAccount(int_rate=0.01, balance=500)
   
    def make_deposit(self, amount, acc="main"):
        if acc == "main":
            self.account.deposit(amount)
            self.account.display_account_info()
        elif acc == "saving":
            self.saving_account.deposit(amount)
            self.saving_account.display_account_info()
        else: print("Account not valid")
       
        return self
    
    def make_withdraw(self, amount, acc="main"):
        if acc == "main":
            self.account.withdraw(amount)
            self.account.display_account_info()
        elif acc == "saving":
            self.saving_account.withdraw(amount)
            self.saving_account.display_account_info()
        else: print("Account not valid")
        return self
    
    def display_user_account_info(self):
        print(f"{self.name} has ${self.account.balance} in his account")
        print(f"{self.name} has ${self.saving_account.balance} in his saving account")
        return self
    

user1 = User("john",'a@a.com')
user1.make_deposit(500, "saving").display_user_account_info()
