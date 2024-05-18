from gtts import gTTS
import os

mytext = 'Bienvenido a mexor, la plataforma de aprendizaje virtual que se adapta a tus necesidades'

language = 'es'
myobj = gTTS(text=mytext, lang=language, slow=False)
myobj.save("welcome.mp3")

os.system("start welcome.mp3")