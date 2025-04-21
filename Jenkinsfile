pipeline {
    agent any

    tools {
        maven 'Maven 3.9.9'  
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
                dir('D:\\AgadgoanApplication\\DevoteeApplicationBackend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Angular App') {
            steps {
                dir('D:\\AgadgoanApplication\\DevoteeApplicationFrontend') {
                    bat 'echo 📁 Current Dir: %cd%'
                    bat 'dir'
                    bat 'npm install'
                    bat 'npm run build --configuration=production'
                }
            }
        }

stage('Deploy to EC2') {
    steps {
        sh '''
            echo "🚀 Deploying Spring Boot JAR to EC2..."
            scp -i ~/Downloads/DevoteeAgadgoanApplication.pem D:/AgadgoanApplication/DevoteeApplicationBackend/target/AgadgoanApplication-0.0.1-SNAPSHOT.jar ec2-user@52.91.88.239:/home/ec2-user/

            echo "🌐 Deploying Angular build to EC2..."
            scp -i ~/Downloads/DevoteeAgadgoanApplication.pem -r D:/AgadgoanApplication/DevoteeApplicationFrontend/dist/devotee-app/* ec2-user@52.91.88.239:/usr/share/nginx/html/

            echo "🔁 Restarting backend app remotely..."
            ssh -i ~/Downloads/DevoteeAgadgoanApplication.pem ec2-user@52.91.88.239 "pkill -f 'java -jar' || true && nohup java -jar /home/ec2-user/AgadgoanApplication-0.0.1-SNAPSHOT.jar > spring.log 2>&1 &"

            echo "✅ Deployment to EC2 complete!"
        '''
    }
}

    }

    post {
        success {
            echo '🎉 CI/CD Pipeline on Windows completed!'
        }
        failure {
            echo '❌ Pipeline failed on Windows.'
        }
    }
}
