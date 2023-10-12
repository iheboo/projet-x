from flask import render_template,request, redirect
from flask_app import app
from flask_app.models.survey import Survey


@app.route('/')
def index():
    return render_template('index.html')
@app.route('/add/survey',methods=['POST'])
def create_survey():
    if Survey.is_valid(request.form):
        Survey.save(request.form)
        return redirect('/results')
    return redirect('/')
@app.route('/results')
def show():
    all_Survey=Survey.get_last_survey()
    return render_template('show.html',Survey=all_Survey)