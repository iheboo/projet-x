from flask_app.config.mysqlconnection import MySQLConnection
from flask_app import DATABASE
from flask_app.models.ninja import Ninja
class Dojo:
    def __init__(self,data):
        self.id=data['id']
        self.dojo_name=data['dojo_name']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.ninjas_list=[]
  # Create a new dojo in the database
    @classmethod
    def create_dojo(cls,data):
        query="INSERT INTO dojos (dojo_name) VALUES (%(dojo_name)s);"
        result= MySQLConnection(DATABASE).query_db(query,data)
        return result
    # dissplay all dojo
    @classmethod
    def show_dojo(cls):
        query="SELECT * FROM dojos"
        result_dojo=MySQLConnection(DATABASE).query_db(query)
        dojo_table=[]
        for row in result_dojo :
            dojo_table.append(cls(row))
        return dojo_table
    @classmethod
    def show_ninjas_with_dojo(cls,data):
        query="SELECT * FROM dojos LEFT JOIN ninjas ON dojos.id=ninjas.dojo_id WHERE dojo.id=%(id)s"
        results=MySQLConnection(DATABASE).query_db(query,data)
        ninjas=[]
        if results:
            this_dojo=cls(results[0])
            for row in results:
                 #create a dictionary containing the ninjas data
                 ninja_data={
                     'id':row['redblit.ninjas.id'],
                     'first_name':row['first_name'],
                     'last_name':row['last_name'],
                     'age':row['age'],
                     'created_at': row['redblit.ninjas.created_at'],
                     'updated_at': row['redblit.ninjas.updated_at']
                 }
                 ninjas.append(Ninja(ninja_data))
                 this_dojo.ninjas_list=ninjas
                 return ninjas
            return []
