from ultralytics import YOLO
from PIL import Image
import sys
import os

model = YOLO("/home/manojad/FullStackDevs/techgium/runs/detect/train5/weights/best.pt")

# results = model("./bus.jpg")

im1 = Image.open("./manu6.jpeg")

# Define the directory where you want to save the result

save_directory = "../runs"  

# Replace with your desired directory path
# os.makedirs(save_directory, exist_ok=True)


# Run prediction and save results in the specified directory
results = model.predict(source=im1, save=True, save_dir=save_directory)

# Visualize the results
# for result in results:
#     result.show()
