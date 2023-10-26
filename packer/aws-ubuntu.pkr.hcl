packer {
  required_version = ">= 1.7"
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = "~> 1"
    }
  }
}


variable "region" {}
variable "source_ami_name" {}
variable "instance_type" {}
variable "ssh_username" {}
variable "ami_users" {}
variable "ami_description" {}
variable "root_device_type" {}
variable "virtualization_type" {}
variable "architecture" {}


locals {
  timestamp = regex_replace(timestamp(), "[- TZ:]", "")
}

source "amazon-ebs" "debian_base" {
  region = var.region
  source_ami_filter {
    filters = {
      name                = var.source_ami_name
      root-device-type    = var.root_device_type
      virtualization-type = var.virtualization_type
      architecture        = var.architecture
    }
    most_recent = true
    owners      = ["aws-marketplace"]
  }
  instance_type   = var.instance_type
  ssh_username    = var.ssh_username
  ami_users       = [var.ami_users]
  ami_name        = "custom-debian-${local.timestamp}"
  ami_description = var.ami_description
}

build {
  name = "my-ami"
  sources = [
    "source.amazon-ebs.debian_base"
  ]

  provisioner "shell" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get upgrade -y",
      "sudo apt-get install -y software-properties-common",
      "sudo apt install -y nodejs npm",
      "sudo apt install -y unzip",
      "sudo npm install -y -g express nodemon"
    ]
  }

  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/repository.zip"
    destination = "~/repository.zip"

  }

  provisioner "file" {
    source      = "./webapp.service"
    destination = "/tmp/webapp.service"
  }

  provisioner "shell" {
    inline = [
      "sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service",
      "sudo unzip ~/repository.zip -d /opt/webapp",
      "sudo groupadd prodGroup",
      "sudo useradd -s /bin/bash -G prodGroup prod",
      "sudo chown -R prod:prodGroup /opt/webapp",
      "cd /opt/webapp",
      "sudo chmod g+x server.js",
      "sudo npm install",
      "sudo systemctl enable webapp",
      "sudo systemctl start webapp",
    ]
  }

  provisioner "shell" {
    inline = [
      "sudo apt-get purge -y git"
    ]
  }
}

variables file

region           = "us-east-1"
source_ami_name  = "debian-12-*"
instance_type    = "t2.micro"
ssh_username     = "admin"
ami_users        = "842863456401"
ami_description  = "Webapp"
root_device_type    = "ebs"
virtualization_type = "hvm"
architecture        = "x86_64"

service code

[Unit]
Description=Web App
After=network.target

[Service]
User=prod
Group=prodGroup
WorkingDirectory=/opt/webapp
ExecStart=/usr/bin/node /opt/webapp/index.js   
Restart=always

[Install]
WantedBy=multi-user.target