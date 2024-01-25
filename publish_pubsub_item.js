const { client, xml } = require("@xmpp/client");
const { v4: uuidv4 } = require("uuid");
const { XMPP_SERVER_ADDRESS } = require("./env");

async function initClient(username, password, resource) {
  const xmpp = new client({
    service: XMPP_SERVER_ADDRESS, // xmpp://<XMPP-SERVER-ADDRESS>
    domain: "localhost", // DOMAIN
    username: username, // USERNAME
    password: password, // PASSWORD
    resource: resource || "res", // RESOURCE
  });

  // Error handling
  xmpp.on("error", (err) => {
    console.error("Error", err);
  });

  // Check for incoming stanzas
  xmpp.on("stanza", (stanza) => {
    console.log("Incoming stanza: ", stanza.toString());
  });

  // Check if client is connected
  xmpp.on("online", (address) => {
    console.log("online", address);
  });

  await xmpp.start(); // Connect to the XMPP server
  return xmpp;
}

function publish_pubsub_item(client, username, node) {
  // Create a pubsub node
  const nodeName = `/home/localhost/${username}/${node}`; // Arbitrary node name, Check https://www.process-one.net/blog/publish-subscribe-pattern-and-pubsub-in-ejabberd/
  const jid = `${username}@localhost/res`;
  console.log("jid: ", jid);
  // Create XML for creating a pubsub node
  const xmlCreateNode = xml(
    "iq",
    {
      type: "set",
      to: "pubsub.localhost",
      id: getUuid(), // Arbitrary ID
    },
    xml(
      "pubsub",
      { xmlns: "http://jabber.org/protocol/pubsub" },
      xml("subscribe", { node: nodeName, jid: jid })
    )
  );
  return xmlCreateNode;
}

async function main() {
  const username = "bob"; // USERNAME
  const password = "Sapp"; // PASSWORD
  const client = await initClient(username, password);
  const nodename = "test3";
  const xmlCreateNode = publish_pubsub_item(client, username, nodename);
  console.log(xmlCreateNode.toString());
  await client.send(xmlCreateNode);
}

main();

// Utils
function getUuid() {
  return uuidv4().split("-").join("");
}
