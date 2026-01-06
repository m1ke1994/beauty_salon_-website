FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    LANG=ru_RU.UTF-8 \
    LC_ALL=ru_RU.UTF-8 \
    PYTHONUTF8=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends locales \
    && sed -i 's/^# *ru_RU.UTF-8/ru_RU.UTF-8/' /etc/locale.gen \
    && locale-gen \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]