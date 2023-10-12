from flask import Flask, render_template, redirect, request, session

# Create the Flask application
app = Flask(__name__)
# Set a secret key for session management
app.secret_key = 'test@1234@'

# Root route
@app.route('/')
def index():
    return render_template('index.html')

# Add data
@app.route('/add/dojo', methods=['POST'])
def create():
    # Store form data in session variables
    session['name'] = request.form['name']
    session['location'] = request.form['location']
    session['language'] = request.form['language']
    session['comment'] = request.form['comment']
    # Redirect to the display route
    return redirect('/display')

# Display route
@app.route('/display')
def show():
    return render_template('show.html')

# Run the application if this file is executed directly
if __name__ == "__main__":
    app.run(debug=True)
