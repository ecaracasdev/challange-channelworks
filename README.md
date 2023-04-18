% Acme Manager

## Description
The API allows an admin user to manage the assets and licenses of the staff in ACME.

When an admin user logs in, they will be able to view and manage the assets and licenses assigned to each developer in the company.

The API provides endpoints for adding and disabling developers. This means that the admin user can add new developers to the system and set them as inactive if needed.

The API also allows the admin user to manage the asset assignments for each developer. This means that the admin user can add new assets, delete existing assets, and list all assets assigned to a particular developer.

Similarly, the API allows the admin user to manage the license assignments for each developer. This means that the admin user can add new licenses, delete existing licenses, and list all licenses assigned to a particular developer.

If a developer is disabled, the API will automatically revoke all their assignments and clean them up.

Overall, the API provides a convenient way for the admin user to manage the assets and licenses of the staff in ACME, ensuring that everything is properly tracked and accounted for.

## Installation
Before proceeding with the installation, make sure you have the following tools installed on your machine:

*   Docker
*   Docker compose

Follow these steps to run the app locally:

### 1. Clone the repository:
```
git clone https://github.com/ecaracasdev/challange-channelworks.git
```

### 2. Navigate to the project directory:
```
cd challange-channelworks
```

### 3. Create a .env file based on .env.example:
```
cp .env.example .env
```

### 4. Update the variables in the .env file with the appropriate values.

### 5. Start the application using docker-compose:
```
docker-compose up --build
```

This command will build and start the container instances defined in docker-compose.yml file. Once the build process is complete, you should be able to access the application by navigating to http://localhost:[PORT_NUMBER] in your web browser.

Usage
Instructions on how to use the project or applications can be found in the explanation document