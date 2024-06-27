/*
*   Create and export configuration varibles
*
*/

// Container for all the environments:
let environments: any = {};

// Staging {default} environment:
environments.staging = {
    'port': 5000,
    'envName': 'staging'
};

// Production environment:
environments.production = {
    'port': 5000,
    'envName': 'production'
}

// Determine which environment was passed as a command-line argument:
let currentEnvironment : any = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase(): '';


// Check that the current env is one of the envs above, otherwise, go to staging:
let environmentToExport; 
if(typeof(environments[currentEnvironment]) == 'object'){
    environmentToExport = environments[currentEnvironment] ;
}else{
    environmentToExport = environments.staging;
}

// Export the modules:
module.exports = environmentToExport;
// export default environmentToExport;
