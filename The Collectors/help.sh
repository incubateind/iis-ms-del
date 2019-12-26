#!/bin/bash

set -e


script=$0

USAGE="
USAGE: $script [COMMAND]

COMMAND:

	start		start development environment
	stop		stop all containers
	bash		start bash on the container
	build		rebuild docker images without cache
	rs		restart razzle inside docker
	logs		follow application logs
	yarn		proxy yarn command to container
"

start(){
    stop
		COMPOSE_HTTP_TIMEOUT=240 docker-compose -f docker-compose.yml up -d --build --force-recreate
		docker exec -it help sequelize db:migrate
		logs
}

stop(){
	docker-compose down -v --remove-orphans
}

restart(){
  docker restart help
	logs
}

bash(){
	docker exec -it help /bin/bash
}

build(){
	docker-compose -f docker-compose.yml build --no-cache
}

logs(){
	docker logs -f help
}

execCmd(){
	docker exec -it help $@
}

case "$1" in
	start)
		start
		;;
	stop)
		stop
		;;
	logs)
		logs
		;;
	bash)
		bash
		;;
	build)
		build
		;;
  rs)
		restart
		;;
	yarn)
		execCmd $@
		;;
esac
