pipeline {
    agent any
    environment {
        REPO = "s10-final/S10P31C103"
        DOCKERHUB_REGISTRY_BACK = "superjaehun/back"
        DOCKERHUB_REGISTRY_FRONT = "superjaehun/front"
        DOCKERHUB_CREDENTIALS = credentials('Docker-hub')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Setup Environment') {
            steps {
                script {
                    sh "ls -al"
                    sh '''
                    if ! command -v docker-compose &> /dev/null
                    then
                        echo "docker-compose not found, installing..."
                        curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                        chmod +x /usr/local/bin/docker-compose
                    else
                        echo "docker-compose is already installed."
                    fi
                    '''
                    dir("${env.WORKSPACE}/FrontEnd") {
                        sh "echo 'VITE_API_URL=https://k10c103.p.ssafy.io/api/v1/' > .env"
                    }
                }
            }
        }
        stage('Stop and Remove Existing Containers') {
            steps {
                script {
                    sh "docker-compose -f ${env.WORKSPACE}/docker-compose.yml down || true"
                }
            }
        }
        stage('Remove Old Images') {
            steps {
                script {
                    sh "docker images -f 'dangling=true' -q | xargs -r docker rmi || true"
                }
            }
        }
        stage("Build with Docker Compose") {
            steps {
                script {
                    sh "docker-compose -f ${env.WORKSPACE}/docker-compose.yml build"
                }
            }
        }
        stage("Login to Docker Hub") {
            steps {
                sh "echo \${DOCKERHUB_CREDENTIALS_PSW} | docker login -u \${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
            }
        }
        stage("Push to Docker Hub") {
            steps {
                script {
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'Docker-hub', usernameVariable: 'DOCKER_USER_ID', passwordVariable: 'DOCKER_USER_PASSWORD']]) {
                        sh "docker push ${DOCKERHUB_REGISTRY_BACK}"
                        sh "docker push ${DOCKERHUB_REGISTRY_FRONT}"
                    }
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'Docker-hub', usernameVariable: 'DOCKER_USER_ID', passwordVariable: 'DOCKER_USER_PASSWORD']]) {
                        sh "docker-compose -f ${env.WORKSPACE}/docker-compose.yml up -d"
                    }
                }
            }
        }
    }
}
