FROM pathwaycom/pathway:latest

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Optional: for OpenCV, PDF, or image support
RUN apt-get update && apt-get install -y libgl1

# Copy entire project into the container
COPY . .

EXPOSE 3000

CMD [ "python", "main.py" ]
