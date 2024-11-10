from app import create_app
from flask_cors import CORS

app = create_app()
CORS(app)

@app.after_request
def add_cors_headers(response):
    """
    Add CORS headers to allow requests from any origin.
    """
    response.headers.update({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Origin, X-Requested-With, Accept, X-Filter",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    })
    return response

if __name__ == '__main__':
    app.run(debug=True)