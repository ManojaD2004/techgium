from ultralytics import YOLO

model = YOLO("yolo11n.pt")

results = model("./bus.jpg")

# Visualize the results
for result in results:
    result.show()