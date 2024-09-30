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
    data = request.get_json()  # Obtiene los datos del producto desde la solicitud
    new_product = {
        'name': data['name'],
        'price': data['price'],
        'description': data.get('description', ''),  # Opcional
        'stock': data['stock']
    }
    result = add_product(new_product)  # Inserta el producto en MongoDB

    # Agrega el id generado por MongoDB al producto
    new_product['_id'] = str(result.inserted_id)

    # Responde con el producto recién creado
    return jsonify(new_product), 201


@app.route('/product/<string:product_id>', methods=['PUT'])
def update_product_route(product_id):
    product_data = request.json

    new_product = {
        'name': product_data['name'],
        'price': product_data['price'],
        'description': product_data.get('description', ''),  # Opcional
        'stock': product_data['stock']
    }

    result = update_product(ObjectId(product_id), new_product)

    new_product['_id'] = product_id

    return jsonify(new_product), 200

@app.route('/product/<string:product_id>', methods=['DELETE'])
def delete_product_route(product_id):
    delete_product(ObjectId(product_id))
    return jsonify({'message': 'Product deleted'}), 200