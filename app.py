from flask import Flask, render_template, request, redirect, session, url_for, flash
import requests
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Replace with your Firebase project API key
FIREBASE_API_KEY = "AIzaSyDujN_Iwu_MI_Jn1JWxqd8mxQ426ElKOPU"

# Firebase endpoints
SIGNUP_URL = (
    f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FIREBASE_API_KEY}"
)
SIGNIN_URL = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_API_KEY}"

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/courses')
def courses():
    return render_template('courses.html')

@app.route('/courses-detail')
def course_detail():
    return render_template('course-detail.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact-us')
def contact_us():
    return render_template('contact-us.html')

@app.route("/sign-up", methods=["GET", "POST"])
def sign_up():
    if request.method == "POST":
        full_name = request.form["full_name"]
        email = request.form["email"]
        password = request.form["password"]

        payload = {
            "email": email,
            "password": password,
            "displayName": full_name,
            "returnSecureToken": True,
        }
        res = requests.post(SIGNUP_URL, json=payload)
        data = res.json()
        if "error" in data:
            flash(data["error"]["message"], "danger")
            return redirect(url_for("sign_up"))

        # store idToken in session
        session["user"] = {
            "idToken": data["idToken"],
            "displayName": data.get("displayName"),
            "email": data.get("email"),
        }
        # flash("Signed up successfully!", "success")
        return redirect(url_for("courses"))
    return render_template("sign-up.html")

@app.route("/sign-in", methods=["GET", "POST"])
def sign_in():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        payload = {"email": email, "password": password, "returnSecureToken": True}
        res = requests.post(SIGNIN_URL, json=payload)
        data = res.json()
        if "error" in data:
            flash(data["error"]["message"], "danger")
            return redirect(url_for("sign_in"))

        session["user"] = {
            "idToken": data["idToken"],
            "displayName": data.get("displayName"),
            "email": data.get("email"),
        }
        # flash('Logged in successfully!', 'success')
        return redirect(url_for("courses"))

    return render_template("sign-in.html")

# To get user in every template
@app.context_processor
def inject_user():
    # Return a dict of variables that get merged into the template context
    return {
        "current_user": session.get("user")  # None if not logged in
    }

@app.route("/sign-out")
def sign_out():
    session.pop("user", None)
    # flash("You have been logged out.", "info")
    return redirect(url_for("home"))

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)