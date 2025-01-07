docker build -t techgium-server ./

docker run -it --rm -p 9000:9000 -v ./images:/app/images -v ./runs:/app/runs  techgium-server