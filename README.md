# Simple XMPP Client

## Usage

Create `env.js` from `example.env.js`

```sh
$ node create_pubsub_node.js
# Incoming stanza:  <iq type="result" id="b34t2pi0uw"><bind xmlns="urn:ietf:params:xml:ns:xmpp-bind"><jid>bob@localhost/1130219910213955868721506</jid></bind></iq>
# online JID {
#   _domain: 'localhost',
#   _local: 'bob',
#   _resource: '1130219910213955868721506'
# }
# Incoming stanza:  <iq xml:lang="en" to="bob@localhost/1130219910213955868721506" from="pubsub.localhost" type="result" id="a6f30828a44243acbc56df943af5a5b0"><pubsub xmlns="http://jabber.org/protocol/pubsub"><create node="/home/localhost/bob/test3"/></pubsub></iq>
```

## Description

`create_pubsub_node.js` shows how to create PubSub Node from XMPP Client written in JS

If you succeed to make PubSub Node, you will get this stanza

```xml
<iq xml:lang="en" to="bob@localhost/1130219910213955868721506" 
    from="pubsub.localhost" type="result" 
    id="a6f30828a44243acbc56df943af5a5b0">
	<pubsub xmlns="http://jabber.org/protocol/pubsub">
		<create node="/home/localhost/bob/test3" />
	</pubsub>
</iq>
```

If you create node with the same name you created before, you get this. If you get this message, node creation is succeeded

```xml
<iq xml:lang="en" to="bob@localhost/1779488345615139452721570" 
    from="pubsub.localhost" type="error" 
    id="68ba46c83bfe4f5babb7782d5eb015f1">
	<pubsub xmlns="http://jabber.org/protocol/pubsub">
		<create node="/home/localhost/bob/test3" />
		<configure />
	</pubsub>
	<error type="cancel">
		<conflict xmlns="urn:ietf:params:xml:ns:xmpp-stanzas" />
		<text xml:lang="en" xmlns="urn:ietf:params:xml:ns:xmpp-stanzas">
			Node already exists
		</text>
	</error>
</iq>
```