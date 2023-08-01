import { app } from './app';
import { configs } from './configs';

app
	.listen({
		host: '0.0.0.0',
		port: configs.PORT,
	})
	.then((address) => {
		console.log(`Server is running at ${address}`);
	});
