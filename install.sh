# sleep 30

# sudo apt-get update

# sudo apt-get install -y unzip curl

# curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# sudo apt-get install -y nodejs

# node -v

# mkdir webapp

# unzip /home/admin/webapp.zip -d /home/admin/webapp

# echo "check webapp.zip"

# cd /home/admin/webapp 

#  npm ci

# npm install --save

# npm fund

# ls -ltrah

# cat ~/webapp/.env 

# cd ~/

# sudo useradd -m -p $(openssl passwd -1 password) webapp

# sudo chown -R webapp:webapp webapp

# sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

# sudo systemctl daemon-reload

# sudo systemctl enable webapp

# sudo systemctl start webapp

# sudo echo $?

# sleep 20
# sudo systemctl status webapp

# sudo echo $?

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
 
#sudo mkdir /home/webappuser/webapp
 

sudo cp /home/admin/webapp.zip /opt/webapp.zip
sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225
sudo unzip /opt/webapp.zip -d /opt/csye6225/

#ls -ltrah /home/webappuser/webapp/

#cd /home/webappuser/webapp

#ls -ltrah

#pwd

#sudo unzip /home/webappuser/webapp/webapp.zip

#sudo ls -ltrah /home/webappuser/webapp

#sudo npm ci

#sudo npm install --save

#sudo npm fund


#ls -ltrah

cd /opt/csye6225
sudo npm install
echo "Server setup completed!!"

sudo systemctl enable amazon-cloudwatch-agent
sudo systemctl start amazon-cloudwatch-agent


#cd /home/admin/

#sudo chmod 770 /home/webappuser/

#sudo chown -R webappuser:webappuser /home/webappuser/webapp

#sudo ls -ltrah /home/webappuser/

sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

sudo systemctl daemon-reload

sudo systemctl enable webapp.service


sudo systemctl start webapp.service

sudo echo $?

sleep 20

sudo systemctl status webapp.service

sudo systemctl restart webapp.service

sudo systemctl status webapp.service

sudo echo $?

sudo mkdir -p /opt/aws/amazon-cloudwatch-agent/etc

sudo cp /tmp/cloudwatch-agent.json /opt/aws/amazon-cloudwatch-agent/etc/
