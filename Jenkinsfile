// pipeline {
//     agent any
//     environment {
//         REPO = "s10-final/S10P31C103"
//         DOCKERHUB_REGISTRY_BACK = "superjaehun/project:back"
//         DOCKERHUB_REGISTRY_FRONT = "superjaehun/project:front"
//         DOCKERHUB_CREDENTIALS = credentials('Docker-hub')
//     }
//     stages {
//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }
//         stage('Setup Environment') {
//             steps {
//                 script {
//                     sh "ls -al"
//                     sh '''
//                     if ! command -v docker-compose &> /dev/null
//                     then
//                         echo "docker-compose not found, installing..."
//                         curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
//                         chmod +x /usr/local/bin/docker-compose
//                     else
//                         echo "docker-compose is already installed."
//                     fi
//                     '''
//                 }
//             }
//         }
//         stage('Create .env file for Frontend') {
//             steps {
//                 dir("${env.WORKSPACE}/FrontEnd") {
//                     sh "echo 'VITE_API_URL=https://k10c103.p.ssafy.io/api/v1/' > .env"
//                 }
//             }
//         }
//         stage('Stop and Remove Existing Containers') {
//             steps {
//                 script {
//                     sh "docker-compose -f ${env.WORKSPACE}/docker-compose.yml down || true"
//                 }
//             }
//         }
//         stage('Remove Old Images') {
//             steps {
//                 script {
//                     sh "docker images -f 'dangling=true' -q | xargs -r docker rmi || true"
//                 }
//             }
//         }
//         stage('Build with Docker Compose') {
//             steps {
//                 script {
//                     sh "docker-compose -f ${env.WORKSPACE}/docker-compose.yml build"
//                 }
//             }
//         }
//         stage('Login to Docker Hub') {
//             steps {
//                 sh "echo \${DOCKERHUB_CREDENTIALS_PSW} | docker login -u \${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
//             }
//         }
//         stage('Push to Docker Hub') {
//             steps {
//                 script {
//                     sh "docker tag weeting_back ${DOCKERHUB_REGISTRY_BACK}"
//                     sh "docker tag weeting_front ${DOCKERHUB_REGISTRY_FRONT}"
//                     sh "docker push ${DOCKERHUB_REGISTRY_BACK}"
//                     sh "docker push ${DOCKERHUB_REGISTRY_FRONT}"
//                 }
//             }
//         }
//         stage('Deploy with Docker Compose') {
//             steps {
//                 script {
//                     sh "docker-compose -f ${env.WORKSPACE}/docker-compose.yml up -d"
//                 }
//             }
//         }
//     }

//     post {
//         success {
//             script {
//                 def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
//                 def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
//                 mattermostSend (color: 'good', 
//                 message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
//                 endpoint: 'https://meeting.ssafy.com/hooks/78w7rgew5bryuby44g9izun9xe', 
//                 channel: 'C103-Jenkins'
//                 )
//             }
//         }
//         failure {
//             script {
//                 def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
//                 def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
//                 mattermostSend (color: 'danger', 
//                 message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
//                 endpoint: 'https://meeting.ssafy.com/hooks/78w7rgew5bryuby44g9izun9xe', 
//                 channel: 'C103-Jenkins'
//                 )
//             }
//         }
//     }
// }
