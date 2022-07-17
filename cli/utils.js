import path from 'path';
import fs from 'fs-extra';
import replaceInFile from 'replace-in-file';
import dotenv from 'dotenv';

function isEmpty(path) {
	return fs.readdirSync(path).length === 0;
}

export function startService(serviceName) {
	try {
		process.env.SERVICE_NAME = serviceName;
		require(path.resolve('src/microServices', `${serviceName}Service`));
	} catch (e) {
		console.error(`Failed to start ${serviceName} service. Error: `, e);
	}
}

export async function createService(serviceName) {
	const servicePath = path.resolve('src/microServices', `${serviceName}Service`),
		envPath = path.resolve(`${serviceName}Service.env`);
	if (fs.existsSync(servicePath) && !isEmpty(servicePath)) {
		console.log(`Service ${serviceName} is already exists`);
		return;
	}
	console.log(`creating ${serviceName} service`);
	const occupiedPort = listOccupiedPort(),
		unoccupiedPort = getUnoccupiedPort(occupiedPort);
	try {
		console.log(`creating ${serviceName} env file`);
		fs.writeFileSync(envPath, `PORT=${unoccupiedPort}`);
		console.log(`creating ${serviceName} service core file in ${servicePath}`);
		if (fs.existsSync(servicePath)) {
			await fs.rmdirSync(servicePath);
		}
		await fs.mkdirSync(servicePath);
		await fs.copy(path.resolve('cli/templates/microService'), servicePath);
		await replaceInFile({
			files: path.resolve(servicePath, 'index.js'),
			from: /process.env.PORT \|\| 1337/,
			to: `process.env.PORT || ${unoccupiedPort}`
		});
		console.log(`Successfully created ${serviceName} service`);
	} catch (e) {
		console.log(`Error creating ${serviceName} service`);
		console.log(e);
	}
}

function getUnoccupiedPort(occupiedPort) {
	let unoccupiedPort = 1338;
	occupiedPort.forEach(port => {
		if (unoccupiedPort.toString() === port) {
			unoccupiedPort += 1;
		}
	});
	return unoccupiedPort;
}

function listOccupiedPort() {
	const microServicePath = path.resolve('src/microServices');
	return fs.readdirSync(microServicePath, { withFileTypes: true })
		.filter(dir => dir.isDirectory())
		.map(dir => retrievePortInOldService(dir.name.replace('Service', '')));
}

function retrievePortInOldService(serviceName) {
	const envFile = path.resolve(`${serviceName}Service.env`),
		isExist = fs.existsSync(envFile);
	if (isExist) {
		const { PORT } = dotenv.parse(fs.readFileSync(envFile));
		return PORT;
	}
	return 1337;
}
