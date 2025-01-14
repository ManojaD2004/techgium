from roboflow import Roboflow
rf = Roboflow(api_key="GXfjcaHeUxN9jh4ThRnc")
project = rf.workspace("techgium-workspace").project("face-detect-tz9qj")
version = project.version(3)
dataset = version.download("yolov8")
                