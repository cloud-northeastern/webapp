# Cloud-Native webapp on AWS using IaC

This project exemplifies a backend-focused assignment management system, leveraging cloud technology for scalability and efficiency. Seamlessly executing CRUD operations, it ensures a dynamic and user-friendly experience. The system integrates with Google Cloud Platform (GCP) for secure student submission uploads to cloud storage and sends automated email notifications providing submission status updates to student.

## About this repository

This repository contains code for building a Cloud-native web application, creating an Amazon Machine Image, setting up Amazon CloudWatch logging and metrics, enabling Systemd autorun of the web app on an Amazon EC2 instance, and implementing GitHub Actions workflows for integration testing and CI/CD in production.

## Tech Stack

| **Category**                 | **Technology/Tool**                                     |
|------------------------------|---------------------------------------------------------|
| **Programming Language**     | JavaScript (Node.js)                                           |
| **Database**                 | PostgreSQL                                              |
| **Cloud Services**           | AWS (EC2, RDS, VPC, IAM, Route53, CloudWatch, SNS, Lambda, ALB, ASG) Google Cloud Platform(Storage Bucket) |
| **Infrastructure as Code**   | Pulumi                                                  |
| **Image Creation**           | Packer (Custom AMIs)                                     |
| **Version Control**          | Git                                                     |
| **CI/CD**                    | GitHub Actions                                          |
| **Additional Tools**         | Mailgun, Google Cloud Platform (GCP)                     |

## Setting up webapp, iac-pulumi, and serverless repositiories
1. Clone webapp repository
2. Clone iac-pulumi repository
3. Clone serverless respository


## How do these repositories work together:
> Clone all three repositories in the organziation. You just need to have prerequisites for pulumi on your local.

1. You need to have following things on your system:
     - Pulumi
     - AWS CLI
     - PostgreSQL

2. Once all the packages have been installed, download the serverless folder and keep in the same directory as webapp and it will auto zip the serverless folder and upload to the pulumi code on IAC

3. Run the `pulumi up` command from your pulumi code folder in the terminal to up the infrastructure

4. Once the infrastructure is up, if you now push any changes to webapp repository and merge the pull request, GitHub Worflow Action will automatically change AMI used by ASG to the newly built AMI
