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
                withCredentials([string(credentialsId: 'backend-env', variable: 'BACKEND_ENV')]) {
                    sh '''
                        mkdir -p backend
                        printf "%s" "$BACKEND_ENV" > backend/.env
                        chmod 600 backend/.env
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose up -d --force-recreate
                '''
            }
        }

        stage('Verify') {
            steps {
                sh 'docker compose ps'
            }
        }
    }
}