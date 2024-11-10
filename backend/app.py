from app import create_app
from flask import request
from flask_cors import CORS

app = create_app()
CORS(app)

# @app.before_request
# def handle_preflight():
#     if request.method == "OPTIONS":
#         response = jsonify({'status': 'ok'})
#         response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#         response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#         response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#         response.headers.add('Access-Control-Allow-Credentials', 'true')
#         response.headers.add('Access-Control-Max-Age', '86400')
#         return response
    

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

    if request.method == 'OPTIONS':
        response.status_code = 200
    return response

if __name__ == '__main__':
    app.run(debug=True)