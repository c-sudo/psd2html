FILE=`ls -t *.psd | head -1`

if [ "$FILE"x = ""x ]; then
echo "没找到PSD文件！";
exit;
fi
open $FILE
cd ~/psd2html/generator/generator-core
sleep 5;
node app -f ../plugins
sleep 5;
PSID=`ps -ax| grep "Adobe Photoshop CC 2015" | awk '{print $1}' | head -1`
kill $PSID
