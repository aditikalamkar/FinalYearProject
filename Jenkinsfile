pipeline {
    agent any

    tools {
        maven 'Maven 3.8.1'  
        nodejs 'Node 18'      
    }

    environment {
        SPRING_JAR_NAME = 'AgadgoanApplication-0.0.1-SNAPSHOT.jar'
        DEPLOY_BACKEND_DIR = '/home/ec2-user/'
        DEPLOY_FRONTEND_DIR = '/usr/share/nginx/html/'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/aditikalamkar/FinalYearProject.git'
            }
        }

        stage('Build Spring Boot App') {
            steps {
                dir('DevoteeApplicationBackend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Angular App') {
            steps {
                dir('DevoteeApplicationFrontend') {
                    sh 'npm install'
                    sh 'npm run build --configuration=production'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                    echo "🚀 Deploying Spring Boot backend..."
                    cp DevoteeApplicationBackend/target/${SPRING_JAR_NAME} ${DEPLOY_BACKEND_DIR}

                    echo "🌐 Deploying Angular frontend..."
                    rm -rf ${DEPLOY_FRONTEND_DIR}/*
                    cp -r DevoteeApplicationFrontend/dist/devotee-app/* ${DEPLOY_FRONTEND_DIR}

                    echo "🔁 Restarting backend with PM2..."
                    pm2 delete spring-app || true
                    pm2 start "java -jar ${DEPLOY_BACKEND_DIR}${SPRING_JAR_NAME}" --name spring-app

                    echo "✅ Frontend deployed to NGINX at ${DEPLOY_FRONTEND_DIR}"
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 CI/CD Deployment Successful!'
        }
        failure {
            echo '❌ CI/CD Pipeline Failed.'
        }
    }
}
