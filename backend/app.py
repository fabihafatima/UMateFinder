from app import create_app
from flask import request, jsonify
# from flask_cors import CORS

app = create_app()
# CORS(app)

# @app.before_request
# def handle_preflight():
#     if request.method == "OPTIONS":
#         response = jsonify({'status': 'ok'})
#         response.headers.add('Access-Control-Allow-Origin', '*')
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
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Credentials": "true"
    })

    return response

if __name__ == '__main__':
    app.run(debug=True)