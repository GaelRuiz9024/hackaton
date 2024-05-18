import random
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model
import tkinter as tk
from tkinter import scrolledtext

# Inicializar el lematizador y cargar datos
lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json', encoding='utf-8').read())
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = load_model('chatbot_model.h5')

# Función para limpiar y lematizar las palabras
def clean_up(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

# Función para crear la bolsa de palabras
def bag_words(sentence):
    sentence_words = clean_up(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

# Función para predecir la clase del mensaje
def predict_class(sentence):
    bow = bag_words(sentence)
    res = model.predict(np.array([bow]))[0]
    Error_threshold = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > Error_threshold]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = [{'intent': classes[r[0]], 'probability': str(r[1])} for r in results]
    return return_list

# Función para obtener la respuesta del chatbot
def get_response(intents_list, intents_json):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result

# Función para enviar el mensaje y obtener la respuesta
def send_message():
    message = entry.get()
    chat_history.config(state=tk.NORMAL)
    chat_history.insert(tk.END, "You: " + message + "\n")
    ints = predict_class(message)
    res = get_response(ints, intents)
    chat_history.insert(tk.END, "mexIA: " + res + "\n")
    chat_history.config(state=tk.DISABLED)
    entry.delete(0, tk.END)

# Configurar la ventana principal
window = tk.Tk()
window.title("Chatbot mexIA")

chat_history = scrolledtext.ScrolledText(window, state='disabled', wrap=tk.WORD)
chat_history.pack(pady=10, padx=10)

entry = tk.Entry(window, width=100)
entry.pack(pady=10, padx=10)

send_button = tk.Button(window, text="Send", command=send_message)
send_button.pack(pady=10)

window.mainloop()
