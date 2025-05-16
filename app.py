from flask import Flask, render_template

app = Flask(__name__)

@app.route('/', endpoint='home')
def home():
    return render_template('home.html')

@app.route('/courses', endpoint='courses')
def courses():
    return render_template('courses.html')

@app.route('/about', endpoint='about')
def about():
    return render_template('about.html')

@app.route('/contact-us', endpoint='contact_us')
def contact_us():
    return render_template('contact-us.html')

@app.route("/sign-up")
def sign_up():
    return render_template('sign-up.html')

@app.route("/sign-in")
def sign_in():
    return render_template('sign-in.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)