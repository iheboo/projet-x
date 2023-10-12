from flask_app import app
from flask import render_template, session,request, redirect
from flask_app.models.ninja import Ninja
from flask_app.models.dojo import Dojo
@app.route('/ninjas')
def new_ninjas():
    see_all_dojos=Dojo.show_dojo()
    return render_template('new_ninja.html',see_all_dojos=see_all_dojos)
@app.route('/create/ninja', methods=["POST"])
def create_ninja():
    session["first_name"]=request.form["first_name"]
    session["last_name"]=request.form["last_name"]
    session["age"]=request.form["age"]
    data={
        'first_name':request.form['first_name'],
        'last_name':request.form['last_name'],
        'age':request.form['age'],
        'dojo_id':request.form['dojo_id']
    }
    Ninja.create_ninja(data)
    print(Ninja.create_ninja(data))
    return redirect ('/dojos')

