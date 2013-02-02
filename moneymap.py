from flask import Flask, request, render_template, Response
import os

ROOT = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__, static_folder=os.path.join(ROOT, 'public'), static_url_path='/public')
app.config.from_object('config')
app.debug = True

@app.route("/")
def home():
	return render_template('base.html')

if __name__ == '__main__':
	app.run()