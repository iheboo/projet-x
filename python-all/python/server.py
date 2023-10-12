from flask import Flask, render_template, session, redirect, request
import random
app= Flask (__name__)

app.secret_key = "password"
@app.route("/")
def index():
    if "answer" not in session:
        session["answer"]=random.randint(1,5)
    return render_template("index.html")
    
@app.route("/guess", methods=["POST"])
def process_guess():
    session['guess']= int(request.form["number"])
    return redirect("/") 

@app.route('/reset')
def reset():
    session.clear()
    return redirect('/')



 


if __name__=="__main__":
    app.run(debug=True)