up-all:
	docker-compose up -d
up-express:
	docker-compose up express
up-mongo:
	docker-compose up mongo
up-redis:
	docker-compose up redis
up-mongo-express:
	docker-compose up mongo-express
redis-cli:
	docker exec -it redis redis-cli