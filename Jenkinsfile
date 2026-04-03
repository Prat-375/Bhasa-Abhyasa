pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Create env file') {
            steps {
                withCredentials([file(credentialsId: 'backend-env-file', variable: 'ENV_FILE')]) {
                    sh '''
                        mkdir -p backend
                        cp "$ENV_FILE" backend/.env
                        chmod 600 backend/.env

                        grep -q '^MONGO_URI=' backend/.env && echo "MONGO_URI exists" || (echo "MONGO_URI missing" && exit 1)
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose down || true
                    docker rm -f ba-backend ba-frontend || true
                    docker compose up -d --build --force-recreate
                '''
            }
        }

        stage('Wait for Backend') {
            steps {
                sh '''
                    echo "Waiting for backend to become healthy..."

                    timeout=120
                    elapsed=0

                    while true; do
                        status=$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}no-healthcheck{{end}}' ba-backend 2>/dev/null || echo "missing")

                        echo "Current backend status: $status"

                        if [ "$status" = "healthy" ]; then
                            echo "Backend is healthy"
                            break
                        fi

                        if [ "$status" = "unhealthy" ] || [ "$status" = "missing" ]; then
                            echo "Backend failed to start"
                            docker compose ps -a
                            docker logs ba-backend || true
                            exit 1
                        fi

                        if [ $elapsed -ge $timeout ]; then
                            echo "Timed out waiting for backend"
                            docker compose ps -a
                            docker logs ba-backend || true
                            exit 1
                        fi

                        sleep 5
                        elapsed=$((elapsed + 5))
                    done
                '''
            }
        }

        stage('Verify') {
            steps {
                sh '''
                    docker compose ps -a
                '''
            }
        }
    }
}