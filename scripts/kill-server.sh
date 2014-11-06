PIDFILE="SERVERPID.tmp.txt"

[ -f $PIDFILE ] && kill -s QUIT $(cat SERVERPID.tmp.txt) && rm $PIDFILE && echo "Server stopped."
