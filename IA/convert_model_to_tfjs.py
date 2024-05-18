import tensorflowjs as tfjs
import tensorflow as tf

# Cargar el modelo guardado
model = tf.keras.models.load_model('chatbot_model.h5')

# Convertir el modelo a TensorFlow.js
tfjs.converters.save_keras_model(model, 'tfjs_model')

print('Modelo convertido a TensorFlow.js correctamente.')