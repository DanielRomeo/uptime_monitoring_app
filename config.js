/*
* Create and export configuration variables
*
*/

// container for all environments:

let environments = {};

// staging(default) envoronment
environments.staging = {
	'httpPort': 5000,
	'httpsPort': 5001,
	'envName': 'staging'
}

// production environment
environments.production = {
	'httpPort': 5030,
	'httpPorts': 5031,
	'envName': 'production'
};

// determine which environmenr was passed in the command-line:
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// if current envionment is one of the above, else default to one of the above:
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;