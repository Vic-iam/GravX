const RPC = require("discord-rpc");

const clientId = "1497662560680280235";
RPC.register(clientId);

const rpc = new RPC.Client({ transport: "ipc" });

rpc.on("ready", () => {
  rpc.setActivity({
    details: "Programando GravX",
    state: "Desarrollando la web fitness",
    startTimestamp: new Date(),
    largeImageKey: "gravx_logo",
    largeImageText: "GravX Project",
    buttons: [
      {
        label: "GitHub",
        url: "https://github.com/Vic-iam/gravx"
      }
    ]
  });
});

rpc.login({ clientId }).catch(console.error);