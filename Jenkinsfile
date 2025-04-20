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
        EC2_IP = '52.91.88.239'
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
                sshagent(credentials: ['ec2-ssh']) {
                    sh '''
                        echo "🚀 Uploading Spring Boot JAR to EC2..."
                        scp -o StrictHostKeyChecking=no DevoteeApplicationBackend/target/${SPRING_JAR_NAME} ec2-user@${EC2_IP}:${DEPLOY_BACKEND_DIR}

                        echo "🌐 Uploading Angular build to EC2..."
                        scp -o StrictHostKeyChecking=no -r DevoteeApplicationFrontend/dist/devotee-app/* ec2-user@${EC2_IP}:${DEPLOY_FRONTEND_DIR}

                        echo "🔁 Restarting Spring Boot App on EC2 using PM2..."
                        ssh -o StrictHostKeyChecking=no ec2-user@${EC2_IP} <<EOF
                            pm2 delete spring-app || true
                            pm2 start "java -jar ${DEPLOY_BACKEND_DIR}${SPRING_JAR_NAME}" --name spring-app
EOF

                        echo "✅ Deployment completed successfully on EC2!"
                    '''
                }
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
