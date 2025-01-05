from ultralytics import YOLO
from PIL import Image

model = YOLO("yolo11n.pt")

# results = model("./bus.jpg")

im1 = Image.open("./bus.jpg")
results = model.predict(source=im1, save=True)  

# Visualize the results
# for result in results:
#     result.show()