# Create a Virtual Env
python3 -m venv deps

# Activate it
source ./deps/bin/activate

# Install deps
pip install -r requirements.txt

yolo task=detect mode=train model=yolov8m.pt data=/home/manojad/FullStackDevs/techgium/python/Face-Detect-3/data.yaml 

yolo task=detect mode=val model=/home/manojad/FullStackDevs/techgium/runs/detect/train2/weights/best.pt data=/home/manojad/FullStackDevs/techgium/python/Face-Detect-2/data.yaml
