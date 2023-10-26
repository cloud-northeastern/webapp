packer {
  required_version = ">= 1.7"
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = "~> 1"
    }
  }
}

variable "db_root_password" {
  type      = string
  sensitive = true
}
variable "region" { default = "us-east-1" }
variable "source_ami_name" { default = "debian-12-*" }
variable "instance_type" { default = "t2.micro" }
variable "ssh_username" { default = "admin" }
variable "ami_users" { default = "842863456401" }
variable "ami_description" { default = "Webapp" }
variable "root_device_type" { default = "ebs" }
variable "virtualization_type" { default = "hvm" }
variable "architecture" { default = "x86_64" }

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

  // provisioner "file" {
  //   source      = "webapp.service"
  //   destination = "/tmp/webapp.service"
  // }

  provisioner "shell" {
    inline = [
      "sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service",
      "sudo unzip ~/repository.zip -d /opt/webapp",
      "sudo groupadd prodGroup",
      "sudo useradd -s /bin/bash -G prodGroup prod",
      "sudo chown -R prod:prodGroup /opt/webapp",
      "cd /opt/webapp",
      "sudo chmod g+x index.js",
      "sudo npm install",
      "sudo npm install -y -g express nodemon",
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


