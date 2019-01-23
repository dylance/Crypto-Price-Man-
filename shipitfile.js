module.exports = shipit => {
  // Load shipit-deploy tasks
  require("shipit-deploy")(shipit);

  shipit.initConfig({
    default: {
      deployTo: "/var/www/cryptopriceman.com",
      keepReleases: 5,
      repositoryUrl: "git@gitlab.com:dylan-ellison/crypto-price-tracker.git"
    },
    staging: {
      servers: "root@157.230.188.147"
    }
  });

  shipit.blTask("npm_install", function npm_install() {
    return shipit.remote(`cd ${shipit.releasePath} && npm install`);
  });

  shipit.blTask("install_client", function install_client() {
    return shipit.remote(
      `cd ${shipit.releasePath}/client && npm install && npm run build`
    );
  });

  shipit.blTask("copy_keys", function copy_keys() {
    return shipit.remote(
      `mkdir ${shipit.releasePath}/config && cp /var/www/keys/keys.js ${
        shipit.releasePath
      }/config/keys.js`
    );
  });

  shipit.blTask("stop_server", function stop_server() {
    return shipit.remote(`forever stopall`);
  });

  shipit.blTask("start_server", function start_server() {
    return shipit.remote(
      `forever start /var/www/cryptopriceman.com/current/index.js`
    );
  });

  shipit.on("updated", function start_build() {
    return shipit.start(
      //'create_cached_directories',
      //'copy_cached_directories_to_workspace',
      "npm_install",
      "install_client",
      "copy_keys",
      "stop_server"
      //'copy_build_files_for_cache',
    );
  });

  shipit.on("deployed", function clear_caches() {
    shipit.remote(
      "forever /var/www/cryptopriceman.com/current/index.js"
    );
  });
};
