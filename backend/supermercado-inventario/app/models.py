from app import mongo

def get_all_products():
    product_list = []
    products = mongo.db.products.find()
    for product in products:
        product['_id'] = str(product['_id'])  # Convierte ObjectId a string
        product_list.append(product)
    return product_list
    

def get_product_by_id(product_id):
    return mongo.db.products.find_one({'_id': product_id})

def add_product(product_data):
    return mongo.db.products.insert_one(product_data)

def update_product(product_id, product_data):
    return mongo.db.products.update_one({'_id': product_id}, {'$set': product_data})

def delete_product(product_id):
    return mongo.db.products.delete_one({'_id': product_id})