packer {
  required_plugins {
    amazon = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
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
  name = "debian-12-ami"
  sources = [
    "source.amazon-ebs.debian"
  ]

  provisioner "shell" {
    script = "./install.sh"
  }


}