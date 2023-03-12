FROM python:3.10

WORKDIR /backend

COPY requirements.txt .

RUN pip install -r requirements.txt

RUN apt update -y

RUN apt install htop -y

COPY . .

EXPOSE 8000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0", "app:app"]
