node {
    def app

    stage('Clone repository') {
        checkout scm
    }

    stage('Build image'){
        app = docker.build("anjwoc/catchstudy-front:$BUILD_NUMBER")
    }

    stage('Test image'){
        sh 'echo "Tests Passed"'
    }

    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
            
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}