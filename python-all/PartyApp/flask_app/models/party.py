from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app import DATABASE
from datetime import datetime


class Party:
    def __init__(self,data):
        self.id = data['id']
        self.user_id = data['user_id'] #! Must Have
        self.title = data['title']
        self.location = data['location']
        self.description = data['description']
        self.date = data['date']
        self.all_ages = data['all_ages']
        
    


    # =======================Queries=======================

    # - CREATE
    @classmethod
    def create_party(cls, data):
        query = """
            INSERT INTO parties (user_id,title,location,description,all_ages,date)
            VALUES (%(user_id)s,%(title)s,%(location)s,%(description)s,%(all_ages)s,%(date)s);
        """
        return connectToMySQL(DATABASE).query_db(query,data)
    
    # - GET ALL
    @classmethod
    def get_all_parties(cls):
        query = """
            SELECT * FROM parties LEFT JOIN users ON parties.user_id = users.id; 
        """
        results = connectToMySQL(DATABASE).query_db(query)
        # print(results)
        parties = []
        for row in results:
            party = cls(row)
            party.poster = f"{row['first_name']} {row['last_name']}"
            parties.append(party)
        return parties
    
    # - GET ALL for User
    @classmethod
    def get_user_parties(cls,data):
        query = """
            SELECT * FROM parties WHERE user_id = %(user_id)s; 
        """
        results = connectToMySQL(DATABASE).query_db(query, data)
        # print(results)
        parties = []
        for row in results:
            party = cls(row)
            parties.append(party)
        return parties

    # - GET ONE BY ID
    @classmethod
    def get_by_id(cls,data):
        query = """
            SELECT * FROM parties WHERE id = %(id)s; 
        """
        results = connectToMySQL(DATABASE).query_db(query,data)
        if len(results)<1:
            return False
        return cls(results[0])
    # - UPDATE
    @classmethod
    def update_party(cls, data):
        query = """
            UPDATE parties SET title =%(title)s,location =%(location)s,
            description =%(description)s,date =%(date)s,all_ages =%(all_ages)s
            WHERE id =%(id)s;
        """
        return connectToMySQL(DATABASE).query_db(query, data)
    # ! VALIDATIONS
    @staticmethod
    def validate(data):
        is_valid = True

        if len(data['title']) < 2:
            is_valid = False
            flash("Title must be at least 2 characters", "add")
        
        if len(data['location']) < 2:
            is_valid = False
            flash("Location must be at least 2 characters", "add")
        
        if len(data['description']) < 6:
            is_valid = False
            flash("Description must be at least 6 characters", "add")

        if data['date'] == "":
            is_valid = False
            flash("Date is required", "add")
        else:
            
                input_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
                current_date = datetime.now().date()
                
                if input_date <= current_date:
                     is_valid = False
                     flash("Input date is in the past", "add")
          

        return is_valid
