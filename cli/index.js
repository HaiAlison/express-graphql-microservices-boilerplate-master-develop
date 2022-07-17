import { program } from 'commander';
import { startService, createService } from './utils';

program
	.option('-a, --action <action>', 'command action')
	.option('-s, --service-name <serviceName>', 'service name');

program.parse(process.argv);

if (!program.action) {
	console.log('action is not specified');
} else {
	doAction(program.action);
}

function doAction(action) {
	switch (action) {
	case 'startService':
		if (!program.serviceName) {
			console.log('--service-name is not specified');
		} else {
			startService(program.serviceName)
		}
		break;
	case 'createService':
		if (!program.serviceName) {
			console.log('--service-name is not specified');
		} else {
			createService(program.serviceName)
		}
		break;
	default:
		console.log(`Unknown action: ${action}`);
		break;
	}
}
