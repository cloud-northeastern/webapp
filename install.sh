sleep 30

sudo apt update

sudo apt install nodejs

sudo node -v

sudo apt install npm

sudo apt install curl zip unzip -y

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

sudo apt install nodejs

sudo apt install postgresql-client -y

node -v

npm -v

sudo lsb_release -a

sudo useradd -m -p $(openssl passwd -1 password) webappuser

sudo cat /etc/passwd

sudo pwd

echo "below are current repo folders"

sudo ls -ltrh 

sudo cp /tmp/webapp.zip /opt/webapp.zip
sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225
sudo unzip /opt/webapp.zip -d /opt/csye6225/

cd /opt/csye6225
sudo npm install
echo "Server setup completed!!"

sudo systemctl enable amazon-cloudwatch-agent
sudo systemctl start amazon-cloudwatch-agent



sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

sudo systemctl daemon-reload

sudo systemctl enable webapp.service


sudo systemctl start webapp.service

sudo echo $?

sleep 20

sudo systemctl status webapp.service

sudo systemctl restart webapp.service

sudo systemctl restart webapp.service

sudo systemctl restart webapp.service

sudo systemctl status webapp.service

sudo echo $?