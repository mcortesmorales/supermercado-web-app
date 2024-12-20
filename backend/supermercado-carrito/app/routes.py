# app/cart_routes.py
from flask import request, jsonify
from app import app
from app.models import CartModel
from transbank.webpay.webpay_plus.transaction import Transaction

Transaction.commerce_code = '597055555532'  # Código de comercio para Webpay Plus en entorno de integración
Transaction.api_key = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C'  # Api Key Secret para pruebas
Transaction.environment = 'TEST'  # Cambia a 'PRODUCTION' en producción

@app.route('/<user_id>', methods=['GET'])
def get_cart(user_id):
    cart = CartModel.get_cart(user_id)
    if cart:
        # Convierte todos los ObjectId a strings en el resultado
        cart['_id'] = str(cart['_id']) if '_id' in cart else cart
        return jsonify(cart), 200
    return jsonify({"message": "Cart not found"}), 404

@app.route('/<user_id>/add', methods=['POST'])
def add_to_cart(user_id):
    item = request.json.get("item")
    result = CartModel.add_item_to_cart(user_id, item)
    if result.modified_count > 0:
        return jsonify({"message": "Item updated"}), 200
    elif result.upserted_id:
        return jsonify({"message": "Item added"}), 200
    return jsonify({"message": "Error adding item"}), 500


@app.route('/<user_id>/remove/<item_id>', methods=['DELETE'])
def remove_from_cart(user_id, item_id):
    CartModel.remove_item_from_cart(user_id, item_id)
    return jsonify({"message": "Item removed"}), 200

@app.route('/<user_id>/clear', methods=['DELETE'])
def clear_cart(user_id):
    CartModel.clear_cart(user_id)
    return jsonify({"message": "Cart cleared"}), 200

@app.route('/<user_id>/create', methods=['POST'])
def create_cart(user_id):
    result = CartModel.create_cart(user_id)
    if result:
        return jsonify({"message": "Cart created", "cart_id": str(result.inserted_id)}), 201
    return jsonify({"message": "Failed to create cart"}), 500

@app.route('/<user_id>/update_quantity', methods=['POST'])
def update_quantity(user_id):
    data = request.get_json()
    item_id = data['product_id']
    quantity = data['quantity']
    
    result = CartModel.update_item_quantity(user_id, item_id, quantity)

    if result.modified_count > 0:
        return jsonify({'message': 'Quantity updated successfully'}), 200
    else:
        return jsonify({'error': 'Product not found in cart or invalid quantity'}), 409

@app.route('/api/pay', methods=['POST'])
def initiate_payment():
    data = request.get_json()
    # Crear transacción con Transbank
    try:
        transaction = Transaction()
        response = transaction.create(
            buy_order=data['buyOrder'],
            session_id=data['sessionId'],
            amount=data['amount'],
            return_url='http://localhost:3000/payment-return'  # URL de retorno
        )
        print("Transacción iniciada con éxito, respuesta:", response)  # Log para ver la respuesta
        return jsonify({"url": response['url'], "token": response['token']})
    except Exception as e:
        print(f"Error al crear la transacción: {str(e)}")  # Log del error
        return jsonify({"error": f"Error al iniciar el pago: {str(e)}"}), 500
