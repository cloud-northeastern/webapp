packer {
  required_version = ">= 1.7"
  required_plugins {
    amazon = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}


variable "db_root_password" {
  type      = string
  sensitive = true
}

locals {
  timestamp = regex_replace(timestamp(), "[- TZ:]", "")
}


source "amazon-ebs" "ubuntu" {
  ami_name        = "ami-${local.timestamp}"
  ami_description = "Assignment 5"
  instance_type   = "t2.micro"
  region          = "us-east-1"
  ami_users       = ["842863456401"]

  source_ami_filter {
    filters = {
      name                = "debian-12-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
      architecture        = "x86_64"
    }
    most_recent = true
    owners      = ["aws-marketplace"]

  }
  ssh_username = "admin"
}

build {
  sources = [
    "source.amazon-ebs.ubuntu"
  ]

  provisioner "shell" {
    inline = [
      "sudo apt update",
      "sudo apt upgrade -y",
      "sudo apt install -y nodejs npm nodemon",
      "sudo apt-get install unzip",
      "sudo apt install -y postgresql",
      "sudo systemctl enable postgresql",
      "sudo systemctl start postgresql",
      "sudo -u postgres psql -c \"ALTER USER postgres WITH PASSWORD '${var.db_root_password}';\"",
      "sudo sed -i 's/#listen_addresses = 'localhost'/listen_addresses = '*'/g' /etc/postgresql/15/main/postgresql.conf",
      "sudo systemctl restart postgresql"
    ]
  }

    provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/repository.zip"
    destination = "~/"
  }

  provisioner "shell" {
    inline = [
      "unzip ~/repository.zip -d ~/webapp",
      "cd ~/webapp && npm install",
    ]
  }

  provisioner "shell" {
    inline = [
      "sudo apt-get purge -y git"
    ]
  }


  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/.env"
    destination = "~/webapp/.env"
  }

  provisioner "shell" {
    inline = [
      "sudo apt-get purge -y git"
    ]
  }

}

