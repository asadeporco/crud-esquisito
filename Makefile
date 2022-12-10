up-all: up-express up-mongo up-redis
up-express:
	docker-compose up express
up-mongo:
	docker-compose up mongo
up-redis:
	docker-compose up redis
up-mongo-express:
	docker-compose up mongo-express