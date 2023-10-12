from flask_app import app
from flask import redirect, render_template,session,request
from flask_app.models.dojo import Dojo



@app.route("/dojos")
def root():
    get_all_dojos=Dojo.show_dojo()
    return render_template("index.html",get_all_dojos=get_all_dojos)
    
@app.route('/create/dojo', methods=["POST"])
def create():
    Dojo.create_dojo(request.form)
    return redirect("/dojos")
@app.route('/dojos/<dojo_id>')
def show_dojo_and_ninja(dojo_id):
    data={
        'id':dojo_id
    }
    show=Dojo.show_ninjas_with_dojo(data)
    return render_template('show_dojo.html',show=show )
