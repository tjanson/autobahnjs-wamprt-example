PIDFILE="SERVERPID.tmp.txt"

#[ -f $PIDFILE ] && sh scripts/kill-server.sh

node ./wamp.rt/examples/basic.js &> server.log &
echo $! > $PIDFILE
echo "Server started."
