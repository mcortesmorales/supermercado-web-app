from flask import request, jsonify
from app import app
from app.models import get_all_products, get_product_by_id, add_product, update_product, delete_product
from bson.objectid import ObjectId

@app.route('/products', methods=['GET'])
def products():
    products = get_all_products()
    return jsonify(products), 200

@app.route('/product/<string:product_id>', methods=['GET'])
def product(product_id):
    product = get_product_by_id(ObjectId(product_id))
    if product:
        return jsonify(product), 200
    return jsonify({'error': 'Product not found'}), 404

@app.route('/product', methods=['POST'])
def create_product():
    product_data = request.json
    product_id = add_product(product_data)
    return jsonify({'id': str(product_id.inserted_id)}), 201

@app.route('/product/<string:product_id>', methods=['PUT'])
def update_product_route(product_id):
    product_data = request.json
    update_product(ObjectId(product_id), product_data)
    return jsonify({'message': 'Product updated'}), 200

@app.route('/product/<string:product_id>', methods=['DELETE'])
def delete_product_route(product_id):
    delete_product(ObjectId(product_id))
    return jsonify({'message': 'Product deleted'}), 200