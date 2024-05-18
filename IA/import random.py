import random
import json
import pickle
import numpy as np
import tensorflow as tf
import tensorflowjs as tfjs
from tensorflow.keras import regularizers
import nltk
from nltk.stem import WordNetLemmatizer

# Inicialización del lematizador
lemmatizer = WordNetLemmatizer()

# Cargar datos de intents
with open('intents.json', encoding='utf-8') as file:
    intents = json.load(file)

words = []
classes = []
documents = []
ignore_letters = ['?', '!', '.', ',']

# Procesar intents
for intent in intents['intents']:
    for pattern in intent['patterns']:
        word_list = nltk.word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])

words = [lemmatizer.lemmatize(word.lower()) for word in words if word not in ignore_letters]
words = sorted(set(words))

classes = sorted(set(classes))

# Guardar palabras y clases en archivos pickle
with open('words.pkl', 'wb') as file:
    pickle.dump(words, file)

with open('classes.pkl', 'wb') as file:
    pickle.dump(classes, file)

# Preparar datos de entrenamiento
training = []
output_empty = [0] * len(classes)

for document in documents:
    bag = []
    word_patterns = document[0]
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)

    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training.append(bag + output_row)

random.shuffle(training)
training = np.array(training)

train_x = training[:, :len(words)]
train_y = training[:, len(words):]

# Definir el modelo
model = tf.keras.Sequential()
model.add(tf.keras.layers.Dense(256, input_shape=(len(train_x[0]),), activation='relu', kernel_regularizer=regularizers.l1(0.0001)))
model.add(tf.keras.layers.Dropout(0.5))
model.add(tf.keras.layers.Dense(128, activation='relu', kernel_regularizer=regularizers.l1(0.0001)))
model.add(tf.keras.layers.Dropout(0.5))
model.add(tf.keras.layers.Dense(len(train_y[0]), activation='softmax'))

# Compilar el modelo
sgd = tf.keras.optimizers.SGD(learning_rate=0.01, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

# Entrenar el modelo
model.fit(train_x, train_y, epochs=700, batch_size=32, verbose=1)

# Convertir el modelo a TensorFlow.js
tfjs_target_dir = 'tfjs_model'
tfjs.converters.save_keras_model(model, tfjs_target_dir)

print('Modelo convertido a TensorFlow.js correctamente.')
