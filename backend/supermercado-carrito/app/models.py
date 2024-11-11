# app/cart_model.py
from bson import ObjectId
from app import mongo
# app/cart_model.py
class CartModel:
    @staticmethod
    def create_cart(user_id):
        cart = {
            "user_id": user_id,
            "items": []
        }
        return mongo.db.carts.insert_one(cart)

    @staticmethod
    def add_item_to_cart(user_id, item):
        cart = mongo.db.carts.find_one({"user_id": user_id})
        
        # Verificar si el artículo ya está en el carrito
        existing_item = next((i for i in cart['items'] if i['_id'] == item['_id']), None)
        
        if existing_item:
            # Si el artículo ya existe, actualizamos su cantidad
            return mongo.db.carts.update_one(
                {"user_id": user_id, "items._id": item['_id']},
                {"$inc": {"items.$.quantity": 1}}  # Incrementamos la cantidad en 1
            )
        else:
            # Si no existe, lo agregamos al carrito
            return mongo.db.carts.update_one(
                {"user_id": user_id},
                {"$push": {"items": {**item, "quantity": 1}}}  # Añadimos la cantidad inicial de 1
            )

    @staticmethod
    def get_cart(user_id):
        return mongo.db.carts.find_one({"user_id": user_id})

    @staticmethod
    def remove_item_from_cart(user_id, item_id):
        """Elimina un artículo del carrito"""
        return mongo.db.carts.update_one(
            {"user_id": user_id},  # Filtro por user_id
            {"$pull": {"items": {"_id": item_id}}}  # Elimina el item con el _id especificado
        )

    @staticmethod
    def clear_cart(user_id):
        return mongo.db.carts.update_one(
            {"user_id": user_id},
            {"$set": {"items": []}}
        )

    @staticmethod
    def update_item_quantity(user_id, item_id, quantity):
        """Actualiza la cantidad de un artículo en el carrito"""
        if quantity <= 0:
            return {"error": "Quantity must be greater than 0"}
        
        return mongo.db.carts.update_one(
        {"user_id": user_id, "items._id": item_id},  # Filtro por user_id y el _id del item
        {"$set": {"items.$.quantity": quantity}}  # Actualización de la cantidad del item
    )
