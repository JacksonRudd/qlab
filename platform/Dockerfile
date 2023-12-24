# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /usr/src/app



# Install system dependencies required for uWSGI
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    gcc \
    libpcre3 \
    libpcre3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements.txt file into the container at /usr/src/app
COPY ./backend/requirements.txt ./

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/qlab /usr/src/qlab
RUN pip install --no-cache-dir /usr/src/qlab

# Copy the current directory contents into the container at /usr/src/app
COPY ./backend/app ./
COPY ./backend/uwsgi.ini ./

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the app with uWSGI
CMD ["uwsgi", "--ini", "uwsgi.ini"]
