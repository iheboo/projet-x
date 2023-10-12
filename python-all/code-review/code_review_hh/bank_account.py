class BankAccount:
    
    all_accounts = []
    
    def __init__(self, int_rate=0.01, balance=0, name="main"): 
        self.name = name
        self.int_rate = int_rate
        self.balance = balance
        BankAccount.all_accounts.append(self)
       
    @classmethod
    def display_all_accounts_info(cls):
        for acc in cls.all_accounts:
            acc.display_account_info()

    def deposit(self, amount):
        self.balance += amount
        return self

    def withdraw(self, amount):
        if self.balance > amount:
            self.balance -= amount
        else: 
            print("Insufficient funds")
            self.balance -= 5
        return self

    def display_account_info(self):
        print(f"balance: {self.balance}, int rate: {self.int_rate}")
        return self
      
    def yield_interest(self):
        self.balance += self.balance * self.int_rate
        return self

# account1 = BankAccount()
# account2 = BankAccount(0.05, 500)
# # account2.deposit(200).withdraw(100).display_account_info()
# BankAccount.display_all_accounts_info()
      
