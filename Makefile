DOCKER_COMPOSE_FILE := docker-compose.yml
WEB_BASE_IMAGE_REPOSITORY := registry.restream.ru:5000/ramis-vakazov/device-mon-backend
APP_DIR := /apt/app/device-mon-backend

.PHONY: update-image
update-image:
	docker build --no-cache --pull --tag "$(WEB_BASE_IMAGE_REPOSITORY)" .
	docker push "$(WEB_BASE_IMAGE_REPOSITORY)"

.PHONY: push
push:
	docker push "$(WEB_BASE_IMAGE_REPOSITORY)"

.PHONY: build-image
build-image:
	docker build -t "$(WEB_BASE_IMAGE_REPOSITORY)" .

.PHONY: run
run:
	docker run -it \
	--rm \
	--name site-integration-playwright-test \
	--privileged \
	-v $(PWD):$(APP_DIR) \
	"$(WEB_BASE_IMAGE_REPOSITORY)"
	yarn test

.PHONY: clean
clean:
	docker rmi "$(WEB_BASE_IMAGE_REPOSITORY)"

.PHONY: copy_compose
copy_compose:
	scp /Users/ramisvakazov/projects/nestjs-device-mon/docker/docker-compose.yml root@10.50.168.65:projects/docker-compose.yml
