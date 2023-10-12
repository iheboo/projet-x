class BankAccount:

    all_accounts = []

    def __init__(self, int_rate, balance): 
        self.int_rate = int_rate
        self.balance = balance
        BankAccount.all_accounts.append(self)

    @classmethod
    def display_all_accounts(cls):
        for a in cls.all_accounts:
            print(f"Balance: {a.balance}, Interest rate: {a.int_rate}")

    def deposit(self, amount):
        self.balance += amount
        return self

    def withdraw(self, amount):
        if self.balance > amount:
            self.balance -= amount
        else: 
            print("Insufficient funds: Charging a $5 fee")
            self.balance -= 5
        return self

    def display_account_info(self):
        print(f"Balance: ${self.balance} \nInterest rate: {self.int_rate}")
        return self

    def yield_interest(self):
        self.balance += self.balance * self.int_rate
        return self
 


# account1 = BankAccount(0.01, 500)
# account2 = BankAccount(0.05, 1000)

# # account1.display_account_info()
# # account2.display_account_info()

# # account1.deposit(200).deposit(100).deposit(50).withdraw(120).yield_interest().display_account_info()
# account2.deposit(120).deposit(80).withdraw(200).withdraw(30).withdraw(500).withdraw(1000).yield_interest().display_account_info()
# BankAccount.display_all_accounts()