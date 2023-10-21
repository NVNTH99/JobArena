# DO NOT COMMIT OR PUSH WITHOUT THE APPROVAL OF ALL GROUP MEMBERS!

This also applies to your local git repository. Modified files will be marked as M folders 
(highlighted yellow) and added files or folders will be marked as A (highlighted green)

# Step 1: Install latest Git, nodejs, npm. Check if it exists by executing in cmd: 
	git -v
	node -v
	npm -v

# Step 2: Clone the react app repository using the https link from github. (code dropdown button)
	
	cd into where you want to save the project folder
	and execute the command:
	
	cd Desktop/
	git clone https://github.com/NVNTH99/JobArena.git

	this will create the project folder JobArena with
	all the latest files from the repo.

	now cd into Job Arena (!!!important!!!) 
	and execute the two commands:

	cd JobArena
	npm install

# Step 3: to run the react app:
	
	npm run dev
	
	or if you want to run in your desired port 	eg. port 4000:
	
	npx vite --port=4000

	