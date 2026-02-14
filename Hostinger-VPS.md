1. Project Overview
This guide documents the deployment of Kasm Workspaces on a Hostinger KVM 4 VPS to provide secure, persistent browser sessions accessible via a fixed IP address. This solves the problem of banking applications blocking access due to frequently changing IP addresses.

1.1 Server Specifications
Server
srv1343856.hstgr.cloud
IP Address
187.77.14.77 (Static)
Platform
KVM 4 (Hostinger)
OS
Ubuntu 24.04 LTS
RAM
16 GB
CPU
4-8 vCPU Cores
Expiry
February 7, 2027
Status
Running

1.2 Architecture Overview
The deployment uses a layered security model with the following components:

Layer
Component
Purpose
Layer 1
UFW Firewall + IP Whitelist
Block all unauthorized traffic
Layer 2
SSL/HTTPS (Let’s Encrypt)
Encrypt all data in transit
Layer 3
Kasm Authentication
Username/password + 2FA capable
Layer 4
Session Isolation
Each user gets isolated container

1.3 Why Kasm Workspaces?
	•	Free Community Edition supports up to 5 concurrent sessions (more than enough for 2-3 users)
	•	Enterprise-grade security with built-in user authentication and session isolation
	•	Full desktop browser experience accessible from any device via web browser
	•	Persistent profiles — bookmarks, cookies, and sessions survive between logins
	•	All outbound traffic exits through fixed IP 187.77.14.77 — banks see a consistent IP
	•	Docker-based — runs 24/7 inside containers with automatic restart on failure


2. Pre-Installation Setup
2.1 Connect to Your VPS
Open your terminal (macOS/Linux) or PowerShell (Windows) and SSH into the server:

ssh root@187.77.14.77

# When prompted, enter password:
# Rt28oR-@D.DyJPg7@Wj8

⚠️  IMPORTANT: Change this root password immediately after first login. Run: passwd

2.2 Update the System
First, bring the system fully up to date:

sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget apt-transport-https ca-certificates gnupg lsb-release

2.3 Create a Swap Partition
Kasm recommends 1 GB of swap per concurrent session. For 3 concurrent sessions, create 4 GB of swap:

sudo dd if=/dev/zero bs=1M count=4096 of=/mnt/4GiB.swap
sudo chmod 600 /mnt/4GiB.swap
sudo mkswap /mnt/4GiB.swap
sudo swapon /mnt/4GiB.swap

# Make persistent across reboots:
echo "/mnt/4GiB.swap swap swap defaults 0 0" | sudo tee -a /etc/fstab


3. Firewall Configuration (UFW)
This is your first line of defense. We will configure UFW to only allow connections from your whitelisted IP addresses.

3.1 Install and Configure UFW
sudo apt install -y ufw

# Default policies: deny all incoming, allow all outgoing
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (CRITICAL: do this BEFORE enabling UFW or you'll lock yourself out!)
sudo ufw allow 22/tcp

# Allow HTTPS for Kasm (port 443)
sudo ufw allow 443/tcp

# Enable the firewall
sudo ufw enable

# Verify status
sudo ufw status verbose

3.2 IP Whitelisting (Recommended)
For maximum security, restrict access to only your known IP addresses. Replace YOUR_HOME_IP and YOUR_OFFICE_IP with your actual IPs:

# First, remove the open rules
sudo ufw delete allow 443/tcp
sudo ufw delete allow 22/tcp

# Add IP-specific rules (replace with YOUR actual IPs)
sudo ufw allow from YOUR_HOME_IP to any port 22 proto tcp
sudo ufw allow from YOUR_HOME_IP to any port 443 proto tcp

sudo ufw allow from YOUR_OFFICE_IP to any port 22 proto tcp
sudo ufw allow from YOUR_OFFICE_IP to any port 443 proto tcp

# Reload
sudo ufw reload
sudo ufw status numbered

⚠️  Find your current IP by visiting https://whatismyip.com from each location you want to whitelist. If your ISP gives you a dynamic IP, skip IP whitelisting and rely on the other security layers instead.


4. Install Kasm Workspaces
4.1 Download and Run Installer
Kasm Workspaces Community Edition is free for individual and non-profit use, supporting up to 5 concurrent sessions.

cd /tmp
curl -O https://kasm-static-content.s3.amazonaws.com/kasm_release_1.18.1.tar.gz
tar -xf kasm_release_1.18.1.tar.gz
sudo bash kasm_release/install.sh --swap-size 4096 --accept-eula

⚠️  The installation takes approximately 10-15 minutes. Docker will be installed automatically if not present. Write down the admin and user credentials displayed at the end of installation!

4.2 Installation Output (Save These Credentials!)
At the end of installation, you will see output similar to:

Kasm Workspaces is now installed.
Access the Web Application at https://187.77.14.77

Default Admin credentials:
  Username: admin@kasm.local
  Password: <GENERATED_ADMIN_PASSWORD>

Default User credentials:
  Username: user@kasm.local
  Password: <GENERATED_USER_PASSWORD>

⚠️  CRITICAL: Save these credentials securely in your password manager immediately. You will need them to log in.

4.3 Verify Installation
Check that all Kasm Docker containers are running:

sudo docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'

You should see containers for kasm_proxy, kasm_api, kasm_manager, kasm_agent, kasm_db, and kasm_redis, all showing "Up" status.


5. SSL/HTTPS Configuration
5.1 Option A: Use Kasm’s Self-Signed Certificate (Quick)
Kasm installs with a self-signed SSL certificate by default. This provides encryption but your browser will show a security warning. For banking use, this is acceptable since you control the server.

To bypass the browser warning, simply click "Advanced" and then "Proceed to site" when accessing https://187.77.14.77.

5.2 Option B: Let’s Encrypt Certificate (Recommended)
If you have a domain name pointed to 187.77.14.77, you can get a free, trusted SSL certificate:

# Install certbot
sudo apt install -y certbot

# Stop Kasm temporarily to free port 443
sudo /opt/kasm/bin/stop

# Get certificate (replace yourdomain.com with your actual domain)
sudo certbot certonly --standalone -d yourdomain.com

# Copy certs to Kasm's location
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem \
       /opt/kasm/current/certs/kasm_nginx.crt
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem \
       /opt/kasm/current/certs/kasm_nginx.key

# Restart Kasm
sudo /opt/kasm/bin/start

Set up auto-renewal by creating a cron job:
echo "0 3 1 * * /opt/kasm/bin/stop && certbot renew --quiet && \
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /opt/kasm/current/certs/kasm_nginx.crt && \
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /opt/kasm/current/certs/kasm_nginx.key && \
/opt/kasm/bin/start" | sudo crontab -


6. User Management & Security
6.1 First Login and Admin Setup
	•	Open your browser and navigate to https://187.77.14.77
	•	Accept the self-signed certificate warning (if using Option A)
	•	Log in with admin@kasm.local and the generated admin password
	•	IMMEDIATELY change the admin password: Go to User Profile (top right) → Change Password
	•	Change the default user password as well

6.2 Create Individual User Accounts
Do NOT share the admin account. Create individual accounts for each person who needs access:

	•	Navigate to Admin Panel → Users → Add User
	•	Set a unique username (e.g., user1@techsci.local, user2@techsci.local)
	•	Assign a strong password for each user
	•	Assign them to the "Users" group (not Admins, unless they need admin access)

6.3 Enable Two-Factor Authentication (Optional)
For banking applications, enabling 2FA adds critical security. In the Admin Panel:

	•	Navigate to Admin → Settings → Auth
	•	Enable "Two Factor Authentication" and set to "Required"
	•	Users will be prompted to set up TOTP (Google Authenticator, Authy, etc.) on next login


7. Persistent Browser Profiles
By default, Kasm sessions are disposable — they reset when the session ends. For banking, you need persistent profiles so cookies, bookmarks, and login sessions are preserved.

7.1 Configure Persistent Storage
# Create persistent profile directory
sudo mkdir -p /opt/kasm/profiles
sudo chmod 777 /opt/kasm/profiles

7.2 Configure Workspace Settings
	•	Log in as admin to Kasm
	•	Navigate to Admin → Workspaces
	•	Click the edit (pencil) icon on the Chrome or Firefox workspace
	•	Under "Docker Run Config Override (JSON)", add:

{
  "user": "root"
}

	•	Set "Persistent Profile Path" to: /opt/kasm/profiles/{username}
	•	Set "Persistent Home" to "Enabled"
	•	Click "Save"

⚠️  With persistent profiles enabled, each user's browser data (cookies, bookmarks, saved passwords, login sessions) will survive between sessions. This is essential for banking applications.

8. Resource Allocation
Your VPS has 16 GB RAM and 4-8 vCPU cores. Here is the recommended allocation for 2-3 concurrent users:

Component
CPU Cores
RAM
Notes
Kasm Services
1 core
2 GB
API, Manager, DB, Redis
Browser Session 1
1 core
3 GB
Primary user
Browser Session 2
1 core
3 GB
Second user
Browser Session 3
1 core
3 GB
Third user
OS + Buffer
Shared
5 GB
System overhead + safety

8.1 Adjust Workspace Resources
In Kasm Admin → Workspaces → Edit the Chrome/Firefox workspace:

	•	Set "Cores" to 1
	•	Set "Memory" to 3072 MB (3 GB)
	•	Set "CPU Allocation Method" to "Shares"


9. Maintenance & Monitoring
9.1 Useful Commands

Command
Description
sudo /opt/kasm/bin/start
Start all Kasm services
sudo /opt/kasm/bin/stop
Stop all Kasm services
sudo /opt/kasm/bin/restart
Restart all Kasm services
sudo docker ps
View running containers
sudo docker stats
Real-time resource usage
sudo ufw status numbered
View firewall rules
sudo ufw allow from X.X.X.X to any port 443
Add new IP to whitelist
sudo ufw delete <rule_number>
Remove a firewall rule
sudo journalctl -u docker -f
View Docker service logs
free -h
Check memory usage
df -h
Check disk usage
htop
Interactive process monitor

9.2 Auto-Start on Reboot
Kasm services auto-start by default. Verify this is working:

sudo systemctl enable docker
# Kasm containers use --restart unless-stopped by default

9.3 Automatic Security Updates
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
# Select 'Yes' when prompted


10. Daily Usage Workflow
10.1 How Users Access the Secure Browser
	•	Open any web browser on your device (laptop, phone, tablet)
	•	Navigate to https://187.77.14.77 (or your domain if configured)
	•	Log in with your assigned username and password
	•	Click "Launch Session" on the Chrome or Firefox workspace
	•	A full browser opens inside your browser — use it to access banking sites
	•	All traffic exits through the VPS IP (187.77.14.77) — your bank sees a consistent IP
	•	When done, close the session or simply close the tab (data persists with persistent profiles)

10.2 Security Best Practices
	•	Never share login credentials between users — each person gets their own account
	•	Change your SSH root password from the default immediately
	•	Regularly review firewall rules: sudo ufw status numbered
	•	Monitor active sessions in Kasm Admin → Sessions to ensure no unauthorized use
	•	Keep the VPS updated monthly: sudo apt update && sudo apt upgrade -y


11. Quick-Start Checklist
Use this checklist to track your progress through the deployment:

#
Task
Status
☐
SSH into VPS and change root password

☐
Update system packages (apt update && upgrade)

☐
Create 4 GB swap partition

☐
Install and configure UFW firewall

☐
Add IP whitelist rules to UFW

☐
Download Kasm Workspaces 1.18.1

☐
Run Kasm installer

☐
Save admin and user credentials securely

☐
Log in as admin and change default passwords

☐
Create individual user accounts

☐
Enable Two-Factor Authentication

☐
Configure persistent browser profiles

☐
Adjust workspace resource allocation (1 core, 3 GB RAM)

☐
Configure SSL certificate (self-signed or Let’s Encrypt)

☐
Enable automatic security updates

☐
Test banking access from Kasm browser session

☐
Verify IP consistency (check whatismyip.com from Kasm browser)



12. Troubleshooting

Issue
Solution
Can’t access https://IP
Check UFW: sudo ufw status. Ensure port 443 is open. Try: sudo /opt/kasm/bin/restart
Locked out of SSH
Use Hostinger’s web console (VPS Dashboard → Manage → Console) to fix UFW rules
Session won’t start
Check resources: free -h and docker stats. May need to reduce per-session RAM allocation
Browser feels slow
Reduce other sessions. Check: htop for CPU usage. Consider upgrading VPS plan
Forgot admin password
SSH in and run: sudo /opt/kasm/bin/utils/reset_admin_password
Bank still blocking
Open whatismyip.com inside Kasm to verify IP shows 187.77.14.77. Clear browser cookies in Kasm session
Docker won’t start
Run: sudo systemctl restart docker && sudo /opt/kasm/bin/start
