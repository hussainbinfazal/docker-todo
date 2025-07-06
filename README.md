# Complete Docker Commands Reference - Dev to Prod

## Image Management

### Building Images
```bash
# Build image from Dockerfile
docker build -t myapp:latest .

# Build with specific Dockerfile
docker build -f Dockerfile.prod -t myapp:prod .

# Build with build arguments
docker build --build-arg NODE_ENV=production -t myapp:prod .

# Build without cache
docker build --no-cache -t myapp:latest .

# Build and tag multiple versions
docker build -t myapp:latest -t myapp:v1.0 .
```

### Image Operations
```bash
# List images
docker images
docker image ls

# Remove image
docker rmi myapp:latest

# Remove unused images
docker image prune

# Remove all unused images
docker image prune -a

# Tag image
docker tag myapp:latest myapp:v1.0

# Save image to tar file
docker save -o myapp.tar myapp:latest

# Load image from tar file
docker load -i myapp.tar

# Image history
docker history myapp:latest

# Inspect image
docker inspect myapp:latest
```

## Container Management

### Running Containers
```bash
# Run container
docker run myapp:latest

# Run in detached mode
docker run -d myapp:latest

# Run with port mapping
docker run -p 3000:3000 myapp:latest

# Run with environment variables
docker run -e NODE_ENV=production myapp:latest

# Run with volume mount
docker run -v /host/path:/container/path myapp:latest

# Run with name
docker run --name myapp-container myapp:latest

# Run interactively
docker run -it myapp:latest /bin/bash

# Run with restart policy
docker run --restart unless-stopped myapp:latest

# Run with resource limits
docker run --memory=512m --cpus=1.0 myapp:latest
```

### Container Operations
```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop container_name

# Start container
docker start container_name

# Restart container
docker restart container_name

# Remove container
docker rm container_name

# Remove running container forcefully
docker rm -f container_name

# Execute command in running container
docker exec -it container_name /bin/bash

# Copy files to/from container
docker cp file.txt container_name:/path/to/file.txt
docker cp container_name:/path/to/file.txt ./file.txt

# View container logs
docker logs container_name

# Follow logs in real-time
docker logs -f container_name

# View container stats
docker stats container_name

# Inspect container
docker inspect container_name
```

## Registry Operations

### Docker Hub
```bash
# Login to Docker Hub
docker login

# Tag for Docker Hub
docker tag myapp:latest username/myapp:latest

# Push to Docker Hub
docker push username/myapp:latest

# Pull from Docker Hub
docker pull username/myapp:latest

# Search Docker Hub
docker search nginx
```

### Private Registry
```bash
# Login to private registry
docker login registry.company.com

# Tag for private registry
docker tag myapp:latest registry.company.com/myapp:latest

# Push to private registry
docker push registry.company.com/myapp:latest

# Pull from private registry
docker pull registry.company.com/myapp:latest
```

## Docker Compose

### Basic Operations
```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Build and start
docker-compose up --build

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs

# Follow logs
docker-compose logs -f

# Scale services
docker-compose up --scale web=3

# Execute command in service
docker-compose exec web /bin/bash
```

### Environment-Specific
```bash
# Use specific compose file
docker-compose -f docker-compose.prod.yml up

# Use multiple compose files
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# Use environment file
docker-compose --env-file .env.prod up
```

## Volume Management

### Volume Operations
```bash
# Create volume
docker volume create myvolume

# List volumes
docker volume ls

# Inspect volume
docker volume inspect myvolume

# Remove volume
docker volume rm myvolume

# Remove unused volumes
docker volume prune

# Mount volume
docker run -v myvolume:/data myapp:latest

# Bind mount
docker run -v /host/path:/container/path myapp:latest
```

## Network Management

### Network Operations
```bash
# Create network
docker network create mynetwork

# List networks
docker network ls

# Inspect network
docker network inspect mynetwork

# Remove network
docker network rm mynetwork

# Connect container to network
docker network connect mynetwork container_name

# Disconnect container from network
docker network disconnect mynetwork container_name

# Run container on specific network
docker run --network mynetwork myapp:latest
```

## System Management

### System Operations
```bash
# Show system info
docker system info

# Show disk usage
docker system df

# Remove unused resources
docker system prune

# Remove everything unused
docker system prune -a

# Remove unused containers
docker container prune

# Remove unused networks
docker network prune

# Remove unused volumes
docker volume prune
```

## Development Workflow

### Local Development
```bash
# Build development image
docker build -t myapp:dev .

# Run with live reload
docker run -p 3000:3000 -v $(pwd):/app myapp:dev

# Run tests
docker run --rm myapp:dev npm test

# Run with Docker Compose
docker-compose -f docker-compose.dev.yml up
```

### Debugging
```bash
# Debug container
docker run -it --entrypoint /bin/bash myapp:latest

# Debug running container
docker exec -it container_name /bin/bash

# Check container processes
docker top container_name

# Monitor container resources
docker stats container_name

# Export container filesystem
docker export container_name > container.tar
```

## Production Deployment

### Production Build
```bash
# Build production image
docker build -f Dockerfile.prod -t myapp:prod .

# Multi-stage build
docker build --target production -t myapp:prod .

# Build with specific platform
docker build --platform linux/amd64 -t myapp:prod .
```

### Production Deployment
```bash
# Deploy with Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# Deploy with stack
docker stack deploy -c docker-compose.prod.yml myapp

# Update service
docker service update --image myapp:v2.0 myapp_web

# Scale service
docker service scale myapp_web=5
```

## Docker Swarm (Production Orchestration)

### Swarm Management
```bash
# Initialize swarm
docker swarm init

# Join swarm as worker
docker swarm join --token TOKEN IP:PORT

# Join swarm as manager
docker swarm join --token TOKEN IP:PORT

# List nodes
docker node ls

# Leave swarm
docker swarm leave
```

### Service Management
```bash
# Create service
docker service create --name web --replicas 3 -p 8080:80 nginx

# List services
docker service ls

# Scale service
docker service scale web=5

# Update service
docker service update --image nginx:latest web

# Remove service
docker service rm web

# Service logs
docker service logs web
```

## Security & Best Practices

### Security Commands
```bash
# Run as non-root user
docker run --user 1000:1000 myapp:latest

# Run with read-only filesystem
docker run --read-only myapp:latest

# Run with no new privileges
docker run --security-opt=no-new-privileges myapp:latest

# Scan image for vulnerabilities
docker scan myapp:latest

# Run with limited capabilities
docker run --cap-drop=ALL --cap-add=NET_ADMIN myapp:latest
```

### Health Checks
```bash
# Add health check in Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Check container health
docker inspect --format='{{.State.Health.Status}}' container_name
```

## Monitoring & Logging

### Monitoring
```bash
# Real-time events
docker events

# Container resource usage
docker stats

# System-wide information
docker system info

# Container processes
docker top container_name
```

### Logging
```bash
# View logs
docker logs container_name

# Follow logs
docker logs -f container_name

# Show last N lines
docker logs --tail 50 container_name

# Show logs since timestamp
docker logs --since 2023-01-01T00:00:00 container_name

# Show logs with timestamps
docker logs -t container_name
```

## Backup & Restore

### Backup
```bash
# Backup container
docker commit container_name backup_image

# Backup volume
docker run --rm -v myvolume:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data .

# Export container
docker export container_name > backup.tar
```

### Restore
```bash
# Restore from backup
docker import backup.tar restored_image

# Restore volume
docker run --rm -v myvolume:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /data
```

## Common Environment Variables

```bash
# Set environment variables
-e NODE_ENV=production
-e PORT=3000
-e DATABASE_URL=postgresql://user:pass@db:5432/mydb
-e REDIS_URL=redis://redis:6379

# Use environment file
--env-file .env.prod
```

## Useful Aliases

```bash
# Add to ~/.bashrc or ~/.zshrc
alias dps='docker ps'
alias dpa='docker ps -a'
alias di='docker images'
alias dr='docker run'
alias drit='docker run -it'
alias drm='docker rm'
alias drmi='docker rmi'
alias dstop='docker stop'
alias dstart='docker start'
alias dlogs='docker logs'
alias dexec='docker exec -it'
alias dcu='docker-compose up'
alias dcd='docker-compose down'
alias dcb='docker-compose build'
alias dcl='docker-compose logs'
```

This reference covers the complete Docker workflow from development to production, including all essential commands for image management, container operations, networking, volumes, security, monitoring, and deployment strategies.