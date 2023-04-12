pipeline {
    agent any
    environment {
        BRANCH_NAME="${env.BRANCH_NAME}".toLowerCase()
    }
    stages {
        stage('Build') {
            steps {
                sh 'docker-compose down'
                nodejs('16.19.0') {
                    sh 'npm install --registry https://registry.npm.taobao.org'
                    sh 'npm run build:prod'
                }
                sh 'docker build -t ${BRANCH_NAME}:${BUILD_NUMBER} .'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'docker-compose up -d'
            }
        }
    }
}