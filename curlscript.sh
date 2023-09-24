#!/bin/bash
# curlscript.sh
rm jarfile
echo --- login
curl --cookie-jar jarfile --data "username=Administrator&password=password" http://localhost:3000/user/login
echo --- test
curl --cookie jarfile http://localhost:3000/