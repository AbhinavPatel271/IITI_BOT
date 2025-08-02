FROM pathwaycom/pathway:latest

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Optional if using OpenCV or PDF/image processing
RUN apt-get update && apt-get install -y libgl1

COPY . .

EXPOSE 8000

CMD [ "python", "main.py" ]