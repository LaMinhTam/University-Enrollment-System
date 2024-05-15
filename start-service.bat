@echo off

echo Starting core services: MySQL, MongoDB, Redis, RabbitMQ, and Zipkin...
docker-compose up -d mysql mongodb redis rabbitmq zipkin

echo Waiting for core services to initialize...
timeout /t 60

echo Starting secondary services: Adminer, Mongo Express, Service Registry, and Config Server...
docker-compose up -d adminer mongo-express service-registry config-server

echo Waiting for secondary services to initialize...
timeout /t 60

echo Starting application services...
docker-compose up -d gateway auth-service faculty-service course-service enroll-service schedule-service grade-management-service payment-service

echo All services started successfully!