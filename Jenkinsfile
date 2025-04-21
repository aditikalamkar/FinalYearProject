pipeline {
    agent any

    tools {
        maven 'maven'          // Pre-configured Maven in Jenkins
        nodejs 'Node 18'       // Pre-configured NodeJS in Jenkins
    }

    environment {
        SPRING_JAR_NAME       = 'AgadgoanApplication-0.0.1-SNAPSHOT.jar'
        DEPLOY_BACKEND_DIR    = '/home/ec2-user/'
        DEPLOY_FRONTEND_DIR   = '/usr/share/nginx/html/'
        EC2_IP                = '52.91.88.239'
        PEM_PATH              = '~/Downloads/DevoteeAgadgoanApplication.pem'
        BACKEND_DIR_WINDOWS   = 'D:\\AgadgoanApplication\\DevoteeApplicationBackend'
        FRONTEND_DIR_WINDOWS  = 'D:\\AgadgoanApplication\\DevoteeApplicationFrontend'
    }

    stages {

        stage('📦 Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/aditikalamkar/FinalYearProject.git'
            }
        }

        stage('🔧 Build Spring Boot App') {
            steps {
                dir("${BACKEND_DIR_WINDOWS}") {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('🛠️ Build Angular App') {
            steps {
                dir("${FRONTEND_DIR_WINDOWS}") {
                    bat 'echo 📁 Current Dir: %cd%'
                    bat 'dir'
                    bat 'npm install'
                    bat 'npm run build --configuration=production'
                }
            }
        }

        stage('🚀 Deploy to EC2') {
            steps {
                sh '''
                    echo "🚀 Deploying Spring Boot JAR to EC2..."
                    scp -i ${PEM_PATH} "${BACKEND_DIR_WINDOWS}/target/${SPRING_JAR_NAME}" ec2-user@${EC2_IP}:${DEPLOY_BACKEND_DIR}

                    echo "🌐 Deploying Angular build to EC2..."
                    scp -i ${PEM_PATH} -r "${FRONTEND_DIR_WINDOWS}/dist/devotee-app/"* ec2-user@${EC2_IP}:${DEPLOY_FRONTEND_DIR}

                    echo "🔁 Restarting backend app remotely..."
                    ssh -i ${PEM_PATH} ec2-user@${EC2_IP} "
                        pkill -f 'java -jar' || true
                        nohup java -jar ${DEPLOY_BACKEND_DIR}${SPRING_JAR_NAME} > spring.log 2>&1 &
                    "

                    echo "✅ Deployment to EC2 complete!"
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 CI/CD Pipeline on Windows completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed on Windows.'
        }
    }
}
