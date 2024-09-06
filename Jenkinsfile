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
                script {
                    sonarHome = tool 'SonarScanner'
                }
                withSonarQubeEnv('Sonar-scanner') {
                    bat '${sonarHome}/bin/sonar-scanner'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    bat 'npm run build -- --prod'
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