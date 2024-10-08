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
        'stock': data['stock'],
        'imageUrl': data['imageUrl'],
        'category':data['category']
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
        'stock': product_data['stock'],
        'imageUrl': product_data['imageUrl'],
        'category':product_data['category']
    }

    result = update_product(ObjectId(product_id), new_product)

    new_product['_id'] = product_id

    return jsonify(new_product), 200

@app.route('/product/<string:product_id>', methods=['DELETE'])
def delete_product_route(product_id):
    delete_product(ObjectId(product_id))
    return jsonify({'message': 'Product deleted'}), 200

@app.route('/products/category/<string:category>', methods=['GET'])
def get_products_by_category(category):
    # Filtrar los productos por categoría usando una consulta en MongoDB
    products = mongo.db.products.find({"category": category})
    products_list = [product for product in products]  # Convertir a lista
    return jsonify(products_list), 200
