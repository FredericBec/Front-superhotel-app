pipeline {
    agent any
    tools {
        nodejs "NODEJS"
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/develop']], 
                          userRemoteConfigs: [[url: 'https://github.com/FredericBec/Front-superhotel-app']]])
            }
        }

        stage('Dependencies'){
            steps {
                script{
                    bat 'npm install'
                }
            }
        }

        stage('Unit Tests') {
            steps {
                script{
                    bat 'npm test'
                }
            }
        }

        stage('Code analysis') {
            steps {
                bat 'C:/sonar-scanner-6.1.0.4477-windows-x64/bin/sonar-scanner -Dsonar.projectKey=Front-superhotel -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=sqp_bdecf197fa6f895306ead10cdb80dca898cc874c'
            }
        }

        stage('Build') {
            steps {
                script {
                    bat 'npm run build'
                }
            }
        }

        stage('Archive build') {
            steps {
                script {
                    archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: false
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
        success {
            echo 'Le build a réussi !'
        }
        failure {
            echo 'Le build a échoué !'
        }
        unstable {
            script {
                waitForQualityGate abortPipeline: true // Optionnel : attendre le résultat de la Quality Gate SonarQube
            }
        }
    }
}