from crypt import methods
import os
from flask import Flask, render_template, request
from matplotlib.figure import Figure
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

app = Flask(__name__)

app._static_folder = os.path.abspath("templates/static/")

@app.route("/", methods = ["GET"])
def index():
    '''
    Función que renderiza la página principal donde se localiza el juego 
    '''
    return render_template("layouts/principal.html")


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=9696)