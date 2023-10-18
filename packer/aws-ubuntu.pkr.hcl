packer {
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


variable "aws_region" {

  type    = string
  default = "us-east-1"

}


variable "source_ami" {

  type    = string
  default = "ami-06db4d78cb1d3bbf9"

}

variable "ssh_username" {

  type    = string
  default = "admin"

}

variable "subnet_id" {

  type    = string
  default = "subnet-035a2d0dc478b4987"

}

source "amazon-ebs" "debian" {
  ami_name        = "debian-12-ami"
  region          = "${var.aws_region}"
  ami_description = "AMI for CSYE 6225"
  ami_users       = ["842863456401"]

  ami_regions = [
    "us-east-1",
  ]

  aws_polling {

    delay_seconds = 120
    max_attempts  = 50

  }


  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"


  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }

}
build {
  sources = [
    "source.amazon-ebs.debian_base"
  ]

  provisioner "shell" {
    inline = [
    sudo apt update
    sudo apt upgrade
    sudo apt install -y nodejs npm
    sudo apt-get install unzip
    sudo apt install -y postgresql
    sudo systemctl enable postgresql
    sudo systemctl start postgresql
      "echo -e '\\n\\N\\nY\\n${var.db_root_password}\\n${var.db_root_password}\\nN\\nN\\nN\\nY\\n'"
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
