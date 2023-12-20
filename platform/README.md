## Getting Set Up

### Create Your Configuration File

1. **Prepare the Config File**:
   - Create a file named `platform/azure_config.json`.
   - Use `platform/azure_config_example.json` as a reference.
   - Modify the values to suit your application. Note: Azure sometimes requires lowercase naming.

### Set Up Azure

2. **Install Azure CLI**:
   - Ensure that Azure CLI (Command Line Interface) is installed on your system.
3. **Select Azure Subscription**:
   - Choose the Azure subscription you intend to use.
4. **Run Setup Script**:
   - Execute the script with the command: `python .\platform\setup_azure.py`.
   - This script is idempotent; it won't recreate existing resources.

### Deploy to Your Azure Resources

5. **Install Docker**:
   - Download and open Docker if it's not already installed.
6. **Deploy Your Application**:
   - Run the deployment script: `python .\platform\deploy.py`.
   - This script builds a Docker image of your Flask backend and pushes it to your Azure resources.

## How to Run Your Application

From the root directory of your project:

1. **Build the Docker Image**:
   - Use the command: `docker build -t qlab -f ./platform/Dockerfile .`.
2. **Run the Docker Container**:
   - Start your application with: `docker run -p 5000:5000 qlab`.
