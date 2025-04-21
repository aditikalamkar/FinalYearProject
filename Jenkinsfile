pipeline {
    agent any

    tools {
        maven 'maven'
        nodejs 'Node 18'
    }

    environment {
        SPRING_JAR_NAME       = 'AgadgoanApplication-0.0.1-SNAPSHOT.jar'
        DEPLOY_BACKEND_DIR    = '/home/ec2-user/'
        DEPLOY_FRONTEND_DIR   = '/usr/share/nginx/html/'
        EC2_IP                = '52.91.88.239'
        PEM_PATH              = 'C:\\JenkinsKeys\\DevoteeAgadgoanApplication.pem'
        BACKEND_DIR_WINDOWS   = 'D:\\AgadgoanApplication\\DevoteeApplicationBackend'
        FRONTEND_DIR_WINDOWS  = 'D:\\AgadgoanApplication\\DevoteeApplicationFrontend'
        SCP_PATH              = 'C:\\Program Files\\Git\\usr\\bin\\scp.exe'
        SSH_PATH              = 'C:\\Program Files\\Git\\usr\\bin\\ssh.exe'
    }

    stages {

        stage('📦 Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/aditikalamkar/FinalYearProject.git'
            }
        }

        stage('🔧 Build Spring Boot App') {
            steps {
                dir("${env.BACKEND_DIR_WINDOWS}") {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('🛠️ Build Angular App') {
            steps {
                dir("${env.FRONTEND_DIR_WINDOWS}") {
                    bat 'npm install'
                    bat 'npm run build --configuration=production'
                }
            }
        }

        stage('🚀 Deploy to EC2') {
            steps {
                script {
                    def jarPath = "${env.BACKEND_DIR_WINDOWS}\\target\\${env.SPRING_JAR_NAME}"
                    def angularDistPath = "${env.FRONTEND_DIR_WINDOWS}\\dist\\devotee-app\\*"

                    bat """
                        echo Copying Spring Boot JAR to EC2...
                        "${env.SCP_PATH}" -i "${env.PEM_PATH}" -o StrictHostKeyChecking=no "${jarPath}" ec2-user@${env.EC2_IP}:${env.DEPLOY_BACKEND_DIR}

                        echo Copying Angular files to EC2...
                        "${env.SCP_PATH}" -i "${env.PEM_PATH}" -o StrictHostKeyChecking=no -r ${angularDistPath} ec2-user@${env.EC2_IP}:${env.DEPLOY_FRONTEND_DIR}

                        echo Restarting Spring Boot App on EC2...
                        "${env.SSH_PATH}" -i "${env.PEM_PATH}" -o StrictHostKeyChecking=no ec2-user@${env.EC2_IP} ^
                        "pkill -f 'java -jar' || true && nohup java -jar ${env.DEPLOY_BACKEND_DIR}${env.SPRING_JAR_NAME} > spring.log 2>&1 &"

                        echo ✅ Deployment completed successfully.
                    """
                }
            }
        }
    }

    post {
        success {
            echo '🎉 CI/CD Pipeline completed successfully!'
        }
        failure {
            echo '❌ CI/CD Pipeline failed.'
        }
    }
}
