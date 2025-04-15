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

        stage('Build Spring Boot') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Angular App') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build --prod'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "✅ Deploying Spring Boot JAR..."
                    cp backend/target/${SPRING_JAR_NAME} ${DEPLOY_BACKEND_DIR}

                    echo "✅ Deploying Angular frontend..."
                    rm -rf ${DEPLOY_FRONTEND_DIR}/*
                    cp -r frontend/dist/frontend/* ${DEPLOY_FRONTEND_DIR}

                    echo "♻️ Restarting Spring Boot backend with PM2..."
                    pm2 delete spring-app || true
                    pm2 start "java -jar ${DEPLOY_BACKEND_DIR}${SPRING_JAR_NAME}" --name spring-app

                    echo "🌐 Serving frontend with NGINX (recommended)..."
                    # PM2 is optional here; if using Nginx, you can skip PM2 for Angular.
                    # pm2 delete angular-app || true
                    # pm2 serve ${DEPLOY_FRONTEND_DIR} 80 --name angular-app --spa

                    echo "NGINX should be configured to serve the Angular frontend from ${DEPLOY_FRONTEND_DIR}"
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment Successful!'
        }
        failure {
            echo '💥 Deployment Failed.'
        }
    }
}
