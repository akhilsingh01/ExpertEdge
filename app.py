from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def Expert_Edge():
    return render_template('home.html')

@app.route("/courses")
def courses():
    return render_template('courses.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)